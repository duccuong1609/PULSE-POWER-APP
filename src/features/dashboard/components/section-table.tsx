import * as React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type TabValue = "invoices" | "customers" | "products"

type DatasetConfig = {
  value: TabValue
  label: string
  file: string
  description: string
}

type SheetState = {
  headers: string[]
  rows: Array<Record<string, unknown> & { __rowId: number }>
  totalRows: number
  isPreview?: boolean
}

const DATASETS: DatasetConfig[] = [
  {
    value: "invoices",
    label: "Hóa đơn",
    file: "/csv/ORIGIN_INVOICE_DATA_13K.xlsx",
    description: "Danh sách hóa đơn gốc 13K dòng",
  },
  {
    value: "customers",
    label: "Khách hàng",
    file: "/csv/DMKH.xlsx",
    description: "Danh mục khách hàng",
  },
  {
    value: "products",
    label: "Sản phẩm",
    file: "/csv/DSSP.xlsx",
    description: "Danh mục sản phẩm",
  },
]

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]
const DEFAULT_PAGE_SIZE = 20
const MAX_PREVIEW_ROWS = 50
let xlsxPromise: Promise<typeof import("xlsx")> | null = null
const loadXLSX = () => {
  if (!xlsxPromise) xlsxPromise = import("xlsx")
  return xlsxPromise
}
const requestIdle = (cb: () => void) => {
  const ric = (globalThis as typeof globalThis & { requestIdleCallback?: typeof requestIdleCallback }).requestIdleCallback
  const id = ric ? ric(cb) : (setTimeout(cb, 0) as unknown as number)
  return { id, ric }
}
const cancelIdle = (token: { id: number; ric?: typeof requestIdleCallback }) => {
  if (token.ric && (globalThis as typeof globalThis & { cancelIdleCallback?: typeof cancelIdleCallback }).cancelIdleCallback) {
    ;(globalThis as typeof globalThis & { cancelIdleCallback: typeof cancelIdleCallback }).cancelIdleCallback(token.id)
  } else {
    clearTimeout(token.id)
  }
}
// Mask PII-like fields (Vietnamese + English), keep IDs intact
const SENSITIVE_KEYS = [
  "name",
  "tên",
  "ten",
  "customer",
  "khách",
  "khach",
  "receiver",
  "nhận",
  "nhan",
  "người",
  "nguoi",
  "email",
  "phone",
  "điện",
  "dien",
  "sdt",
  "contact",
  "address",
  "địa",
  "dia",
  "khu vực",
  "phường",
  "xa",
  "xã",
]

const maskSensitive = (key: string, value: unknown) => {
  if (typeof value !== "string") return value
  const lower = key.toLowerCase()
  const isSensitive = SENSITIVE_KEYS.some((k) => lower.includes(k))
  if (!isSensitive) return value
  if (!value) return value
  // keep last 3 chars for traceability
  const visible = value.slice(-3)
  return `${"•".repeat(Math.max(3, value.length - 3))}${visible}`
}

export function DataTable() {
  const [activeTab, setActiveTab] = React.useState<TabValue>("invoices")
  const [data, setData] = React.useState<
    Partial<Record<TabValue, SheetState>>
  >({})
  const [loading, setLoading] = React.useState<Record<TabValue, boolean>>({
    invoices: false,
    customers: false,
    products: false,
  })
  const [error, setError] = React.useState<
    Record<TabValue, string | undefined>
  >({
    invoices: undefined,
    customers: undefined,
    products: undefined,
  })
  const [pagination, setPagination] = React.useState<
    Record<TabValue, { page: number; pageSize: number }>
  >({
    invoices: { page: 0, pageSize: DEFAULT_PAGE_SIZE },
    customers: { page: 0, pageSize: DEFAULT_PAGE_SIZE },
    products: { page: 0, pageSize: DEFAULT_PAGE_SIZE },
  })

  const parseSheet = React.useCallback(
    async (arrayBuffer: ArrayBuffer, limitRows?: number): Promise<SheetState> => {
      const XLSX = await loadXLSX()
      const workbook = XLSX.read(arrayBuffer, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]

      const range = XLSX.utils.decode_range(sheet["!ref"] || "A1")
      const totalRows = range.e.r + 1
      const endRow = limitRows ? Math.min(range.e.r, limitRows) : range.e.r
      const limitedRange = {
        s: { r: 0, c: 0 },
        e: { r: endRow, c: range.e.c },
      }

      const rows = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        range: limitedRange,
      }) as [string[]]

      if (!rows.length) {
        return { headers: [], rows: [], totalRows }
      }

      const [headerRow, ...dataRows] = rows
      const headers = headerRow.map((header, index) =>
        (header ?? "").toString().trim() || `column_${index + 1}`
      )

      const normalizedRows = dataRows.map((row, rowIndex) => {
        const record: Record<string, unknown> & { __rowId: number } = {
          __rowId: rowIndex + 1,
        }
        headers.forEach((key, columnIndex) => {
          const raw = (row as unknown as Record<number, unknown>)[columnIndex] ?? ""
          record[key] = maskSensitive(key, raw)
        })
        return record
      })

      return { headers, rows: normalizedRows, totalRows }
    },
    []
  )

  const loadDataset = React.useCallback(
    async (dataset: DatasetConfig, opts?: { full?: boolean }) => {
      const key = dataset.value
      if (loading[key]) return
      setLoading((prev) => ({ ...prev, [key]: true }))
      setError((prev) => ({ ...prev, [key]: undefined }))

      try {
        const response = await fetch(dataset.file)
        if (!response.ok) {
          throw new Error(`Không tải được file ${dataset.file}`)
        }

        const buffer = await response.arrayBuffer()
        const parsed = await parseSheet(buffer, opts?.full ? undefined : MAX_PREVIEW_ROWS)
        const isPreview = !opts?.full && parsed.totalRows > parsed.rows.length
        const rows = parsed.rows

        setData((prev) => ({
          ...prev,
          [key]: { ...parsed, rows, isPreview },
        }))
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Không thể đọc file dữ liệu"
        setError((prev) => ({ ...prev, [key]: message }))
      } finally {
        setLoading((prev) => ({ ...prev, [key]: false }))
      }
    },
    [loading, parseSheet]
  )

  const handleLoad = React.useCallback(() => {
    const dataset = DATASETS.find((d) => d.value === activeTab)
    if (dataset) void loadDataset(dataset)
  }, [activeTab, loadDataset])

  // Không tự tải để tránh block render; người dùng chủ động bấm nút

  const handlePageChange = (tab: TabValue, delta: number) => {
    setPagination((prev) => {
      const current = prev[tab]
      const dataset = data[tab]
      const totalPages = dataset
        ? Math.max(1, Math.ceil(dataset.rows.length / current.pageSize))
        : 1
      const nextPage = Math.min(
        Math.max(current.page + delta, 0),
        totalPages - 1
      )

      return {
        ...prev,
        [tab]: { ...current, page: nextPage },
      }
    })
  }

  const handlePageSizeChange = (tab: TabValue, size: number) => {
    setPagination((prev) => ({
      ...prev,
      [tab]: { page: 0, pageSize: size },
    }))
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabValue)}
      className="flex w-full flex-col justify-start gap-6"
    >
      <div className="flex flex-col gap-3 px-4 lg:px-6">
        <Label className="text-lg font-semibold">Dữ liệu bảng</Label>
        <TabsList className="flex flex-wrap gap-2">
          {DATASETS.map((dataset) => (
            <TabsTrigger key={dataset.value} value={dataset.value}>
              {dataset.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {DATASETS.map((dataset) => {
        const datasetState = data[dataset.value]
        const isLoading = loading[dataset.value]
        const errorMessage = error[dataset.value]
        const pageState = pagination[dataset.value]
        const headers = datasetState?.headers ?? []
        const rows = datasetState?.rows ?? []
        const hasData = !!headers.length
        const totalPages = Math.max(
          1,
          Math.ceil(rows.length / pageState.pageSize)
        )
        const start = pageState.page * pageState.pageSize
        const paginatedRows = rows.slice(start, start + pageState.pageSize)

        return (
          <TabsContent
            key={dataset.value}
            value={dataset.value}
            className="relative flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">{dataset.label}</p>
                <p className="text-sm text-muted-foreground">
                  {hasData
                    ? datasetState?.isPreview
                      ? `Đã tải (preview ${rows.length}/${datasetState.totalRows} dòng)`
                      : "Đã tải đầy đủ"
                    : isLoading
                    ? "Đang tải..."
                    : "Chưa tải"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleLoad}
                  disabled={isLoading}
                  variant="secondary"
                >
                  {isLoading ? "Đang tải..." : hasData ? "Tải lại" : "Tải dữ liệu"}
                </Button>
                <div className="text-sm text-muted-foreground">
                  {rows.length ? `${rows.length.toLocaleString()} dòng` : "—"}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto px-4 lg:px-6">
              <div className="overflow-hidden rounded-lg border">
                  {isLoading ? (
                    <div className="p-6 text-sm text-muted-foreground">
                      Đang tải dữ liệu...
                    </div>
                  ) : errorMessage ? (
                  <div className="p-6 text-sm text-destructive">
                    {errorMessage}
                  </div>
                ) : !headers.length ? (
                  <div className="p-6 text-sm text-muted-foreground">
                    Không có dữ liệu để hiển thị.
                  </div>
                ) : (
                  <>
                    <Table>
                      <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                          {headers.map((header) => (
                            <TableHead key={header} className="whitespace-nowrap">
                              {header}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedRows.length ? (
                          paginatedRows.map((row) => (
                            <TableRow key={`${dataset.value}-${row.__rowId}`}>
                              {headers.map((header) => (
                                <TableCell
                                  key={`${row.__rowId}-${header}`}
                                  className="whitespace-nowrap text-sm"
                                >
                                  {String((row as Record<string, unknown>)[header] ?? "")}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={headers.length}
                              className="h-24 text-center text-sm text-muted-foreground"
                            >
                              Không có dữ liệu cho trang này.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    <div className="flex flex-col gap-3 border-t bg-muted/40 px-4 py-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-2">
                        {datasetState?.isPreview && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => void loadDataset(dataset, { full: true })}
                          >
                            Tải toàn bộ ({datasetState.totalRows.toLocaleString()} dòng)
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`${dataset.value}-page-size`}>
                          Số dòng / trang
        </Label>
                        <Select
                          value={pageState.pageSize.toString()}
                          onValueChange={(value) =>
                            handlePageSizeChange(dataset.value, Number(value))
                          }
                        >
          <SelectTrigger
                            id={`${dataset.value}-page-size`}
                            className="w-[110px]"
          >
                            <SelectValue placeholder={pageState.pageSize} />
          </SelectTrigger>
          <SelectContent>
                            {PAGE_SIZE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option.toString()}>
                                {option}
                              </SelectItem>
                            ))}
          </SelectContent>
        </Select>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8"
                          onClick={() => handlePageChange(dataset.value, -1)}
                          disabled={pageState.page === 0}
                        >
                          ‹
                        </Button>
                        <span className="min-w-[120px] text-center text-sm font-medium text-foreground">
                          Trang {pageState.page + 1} / {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8"
                          onClick={() => handlePageChange(dataset.value, 1)}
                          disabled={pageState.page + 1 >= totalPages}
                        >
                          ›
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
      </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}