import {
  IconDotsVertical,
} from "@tabler/icons-react"
import {
  type ColumnDef
} from "@tanstack/react-table"
import { toast } from "sonner"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { schema } from "@/config/table-schema"
import { TableCellViewer } from "@/features/dashboard/components/ui/table-cell-viewer"
import { DragHandle } from "./drag-handle-button"
import '../../styles/style.css'

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: ({ row }) => {
      return <div className="text-left">
        <TableCellViewer item={row.original} />
      </div>
    },
    enableHiding: false,
  },
  {
    accessorKey: "invoice_date",
    header: "Invoice Date",
    cell: ({ row }) => (
      <div className="w-32 text-left">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.invoice_date}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="w-32 min-w-fit text-left">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.customer_name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "product_name",
    header: "Product name",
    cell: ({ row }) => (
      <div className="w-32 min-w-fit text-left">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.product_name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="w-full text-right">Quantity</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.quantity}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Quantity
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.quantity}
          type="number"
          id={`${row.original.id}-target`}
        />
      </form>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="min-w-32 max-w-64 text-left overflow-x-scroll no-scrollbar">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.address}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]