import { ChartAreaInteractive } from "@/features/dashboard/components/section-chart-area";
import { DataTable } from "@/features/dashboard/components/section-table";
import { SectionCards } from "@/features/dashboard/components/section-cards";

import data from "./sale-data.json";
import { SiteHeader } from "@/components/site-header";

// const useDateRangePicker = () => {
//   const [range, setRange] = useState<DateRange | undefined>(undefined);
//   return (
//     <div className="flex flex-row gap-3">
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             id="dates"
//             className="w-56 justify-between font-normal"
//           >
//             {range?.from && range?.to
//               ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
//               : "Select date"}
//             <ChevronDownIcon />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//           <Calendar
//             mode="range"
//             selected={range}
//             captionLayout="dropdown"
//             onSelect={(range) => {
//               setRange(range);
//             }}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// const useTimeRangeFilter = () => {
//   return (
//     <>
//       {/* Desktop / Large */}
//       <div className="hidden md:flex gap-2 items-center">
//         {useDateRangePicker()}
//         <Separator
//           orientation="vertical"
//           className="data-[orientation=vertical]:h-4"
//         />
//         <Select defaultValue="7days">
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select time range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectLabel>Time Range</SelectLabel>
//               <SelectItem value="7days">7 Days</SelectItem>
//               <SelectItem value="1month">1 Month</SelectItem>
//               <SelectItem value="3month">3 Months</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Mobile */}
//       <div className="flex md:hidden">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline" size="icon">
//               <MenuIcon className="h-5 w-5" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent side="right" align="start" className="w-fit">
//             <div className="flex flex-col gap-4">
//               {useDateRangePicker()}
//               {/* <Label>Or</Label> */}
//               <SelectSeparator />
//               <Select defaultValue="7days">
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select time range" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Time Range</SelectLabel>
//                     <SelectItem value="7days">7 Days</SelectItem>
//                     <SelectItem value="1month">1 Month</SelectItem>
//                     <SelectItem value="3month">3 Months</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </div>
//     </>
//   );
// };

export default function Dashboard() {
  return (
    <>
      <title>Dashboard | Pulse</title>
      <meta name="description" content="Dashboard metrics" />
      <SiteHeader siteName="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
