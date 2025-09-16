import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { schema } from "@/config/table-schema"
import { useIsMobile } from "@/hooks/use-mobile"
import { IconTrendingUp } from "@tabler/icons-react"
import type z from "zod"
import ProductAreaChart from "./table-cell-viewer-chart"
import { DateTimePicker } from "@/features/dashboard/components/ui/table-viewer-date-time-picker"

export function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.invoice_id}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.invoice_id}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ProductAreaChart />
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Invoice</Label>
              <Input readOnly className="text-muted-foreground" id="header" defaultValue={item.invoice_id} />
            </div>
            <div className="flex flex-col gap-3">
              <DateTimePicker />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Customer</Label>
                <Select defaultValue={item.customer_name || 'Nguyễn Văn A'}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nguyễn Văn A">
                      Nguyễn Văn A
                    </SelectItem>
                    <SelectItem value="Nguyễn Văn B">
                      Nguyễn Văn B
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Product Name</Label>
                <Select defaultValue={item.product_name || 'Bò Mì 2 1ky'}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bò Mì 2 1ky">Bò Mì 2 1ky</SelectItem>
                    <SelectItem value="Thủ mì 2 500gr">Thủ mì 2 500gr</SelectItem>
                    <SelectItem value="Nem Chua 2 ( Bịch Xanh )">Nem Chua 2 ( Bịch Xanh )</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="target">Quantity</Label>
              <Input id="target" defaultValue={item.quantity} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Address</Label>
              <Input id="target" defaultValue={item.address || 'Nguyễn Văn A'} />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}