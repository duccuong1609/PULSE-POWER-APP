import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconChevronDown, IconLayoutColumns, IconPlus } from '@tabler/icons-react'
import type { RowData, Table } from '@tanstack/react-table'

type SectionTableCustomizeButtonProps<TData extends RowData> = {
    table: Table<TData>
}

const SectionTableCustomizeButton = <T extends RowData>({table}: SectionTableCustomizeButtonProps<T>) => {
    return (
        <>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <IconLayoutColumns />
                            <span className="hidden lg:inline">Customize Columns</span>
                            <span className="lg:hidden">Columns</span>
                            <IconChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) =>
                                    typeof column.accessorFn !== "undefined" &&
                                    column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" className='sr-only'>
                    <IconPlus />
                    <span className="hidden sr-only lg:inline">Add Section</span>
                </Button>
            </div>
        </>
    )
}

export default SectionTableCustomizeButton