import type { RowData, Table } from "@tanstack/react-table"

export type SectionTabProps<TData extends RowData> = {
  data: TData[]
  setData: React.Dispatch<React.SetStateAction<TData[]>>
  table: Table<TData>
}