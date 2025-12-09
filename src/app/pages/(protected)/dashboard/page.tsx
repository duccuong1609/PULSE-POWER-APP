import { DataTable } from "@/features/dashboard/components/section-table";
import { SectionCards } from "@/features/dashboard/components/section-cards";
import summary from "./summary-data.json";
import modelMetrics from "./model-metrics.json";
import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, AreaChart, Area } from "recharts";
import ProductAreaChart from "@/features/dashboard/components/ui/table-cell-viewer-chart";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/features/cart/components/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import TrendingSection from "@/features/analytic/components/trending";
import { useNavigate } from "react-router";
import { useUserStore } from "@/store/userStore";

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
  const { addToCart, setIsOpen } = useCartStore();
  const navigate = useNavigate();
  const { userParam } = useUserStore();
  // Đọc dữ liệu metric từ JSON (Precision, Recall, F1, HitRate, MAP, NDCG)
  const modelKeys = ["EASE", "KNN", "SLIM", "ALS", "Hybrid"] as const;
  type ModelKey = (typeof modelKeys)[number];
  type ChartKey = Lowercase<ModelKey>;
  type MetricKey = "ndcg" | "map" | "precision" | "recall" | "f1" | "hitrate";
  type MetricRow = Record<ChartKey, number> & { k: number };

  const kValues = modelMetrics[modelKeys[0]].map((item) => item.k);

  const [metricKey, setMetricKey] = useState<MetricKey>("ndcg");

  const metricLabel: Record<MetricKey, string> = {
    ndcg: "NDCG",
    map: "MAP",
    precision: "Precision",
    recall: "Recall",
    f1: "F1",
    hitrate: "HitRate",
  };

  const metricSeries: Record<MetricKey, Record<ChartKey, number[]>> = {
    ndcg: {} as Record<ChartKey, number[]>,
    map: {} as Record<ChartKey, number[]>,
    precision: {} as Record<ChartKey, number[]>,
    recall: {} as Record<ChartKey, number[]>,
    f1: {} as Record<ChartKey, number[]>,
    hitrate: {} as Record<ChartKey, number[]>,
  };

  modelKeys.forEach((key) => {
    const ck = key.toLowerCase() as ChartKey;
    metricSeries.ndcg[ck] = modelMetrics[key].map((i) => i.ndcg);
    metricSeries.map[ck] = modelMetrics[key].map((i) => i.map);
    metricSeries.precision[ck] = modelMetrics[key].map((i) => i.precision);
    metricSeries.recall[ck] = modelMetrics[key].map((i) => i.recall);
    metricSeries.f1[ck] = modelMetrics[key].map((i) => i.f1);
    metricSeries.hitrate[ck] = modelMetrics[key].map((i) => i.hitrate);
  });

  const comparisonData: MetricRow[] = kValues.map((k, idx) => {
    const row = { k } as MetricRow
    modelKeys.forEach((key) => {
      const series = modelMetrics[key]
      row[key.toLowerCase() as ChartKey] = series?.[idx]?.[metricKey] ?? 0
    })
    return row
  })

  const ndcgCharts: { key: ChartKey; title: string }[] = modelKeys.map((key) => ({
    key: key.toLowerCase() as ChartKey,
    title: `${key} - ${metricLabel[metricKey]} theo K`,
  }));

  const chartConfig: Record<ChartKey, { label: string; color: string }> = {
    ease: { label: "EASE", color: "var(--chart-1)" },
    knn: { label: "KNN", color: "var(--chart-2)" },
    slim: { label: "SLIM", color: "var(--chart-3)" },
    als: { label: "ALS", color: "var(--chart-4)" },
    hybrid: { label: "Hybrid", color: "var(--chart-5)" },
  };

  const topProducts = summary.top_5_products.map((p, idx) => ({
    ...p,
    image: "/img/product-template-img.webp",
    rank: idx + 1,
    product: {
      id: idx + 1,
      referanceId: `TOP-${idx + 1}`,
      name: p.name,
      price: `${(p.qty ?? 0).toLocaleString()} đã bán`,
      imgUrl: "/img/product-template-img.webp",
    },
  }));

  const invoiceStats = [
    { label: "Tổng số bản ghi", value: summary.total_rows.toLocaleString() },
    { label: "Tổng số giao dịch (hóa đơn)", value: summary.total_invoices.toLocaleString() },
    { label: "Khách hàng duy nhất", value: summary.unique_customers.toLocaleString() },
    { label: "Sản phẩm duy nhất", value: summary.unique_products.toLocaleString() },
    { label: "Tổng SL sản phẩm đã bán", value: summary.total_quantity_sold.toLocaleString() },
    { label: "Phạm vi thời gian (ngày)", value: summary.time_span_days.toLocaleString() },
    { label: "Ngày giao dịch đầu tiên", value: summary.first_date },
    { label: "Ngày giao dịch cuối cùng", value: summary.last_date },
    { label: "Tần suất mua TB (TX/Customer)", value: summary.avg_tx_per_customer },
    { label: "Độ lệch chuẩn tần suất", value: summary.std_tx_per_customer },
    { label: "Median số giao dịch", value: summary.median_tx },
    { label: "SL sản phẩm TB/khách", value: summary.avg_items_per_customer },
    { label: "Khách mua nhiều nhất", value: `${summary.top_customer_id} (${summary.top_customer_tx} giao dịch)` },
    { label: "SP bán chạy nhất", value: `${summary.top_product} – ${summary.top_product_qty.toLocaleString()}` },
    { label: "Loại hàng bán chạy nhất", value: summary.top_category },
    {
      label: "Top 5 sản phẩm bán chạy",
      value: summary.top_5_products.map((p) => p.name).join(", "),
    },
    { label: "Tỷ lệ sản phẩm lạnh (chỉ 1 lần)", value: summary.cold_product_rate.toFixed(2) },
    { label: "Số mặt hàng TB/hóa đơn", value: summary.avg_items_per_invoice },
    { label: "Median mặt hàng/hóa đơn", value: summary.median_items_per_invoice },
    { label: "SL trung bình mỗi dòng hàng", value: summary.avg_qty_per_line },
  ];

  const handleAddTopProduct = (product: (typeof topProducts)[number]["product"]) => {
    addToCart(product);
    toast.success("Đã thêm vào giỏ", {
      description: product.name,
      action: {
        label: "Xem giỏ",
        onClick: () => setIsOpen(true),
      },
    });
    const base = userParam ? `/${userParam}` : "";
    navigate(`${base}/cart`);
  };

  return (
    <>
      <title>Dashboard | Pulse</title>
      <meta name="description" content="Dashboard metrics" />
      <SiteHeader siteName="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />

          <div className="flex flex-col gap-4 px-4 lg:px-6">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(metricLabel) as MetricKey[]).map((key) => (
                <Button
                  key={key}
                  variant={metricKey === key ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full px-3 py-1 text-sm ${
                    metricKey === key
                      ? "shadow-[0_8px_24px_-12px_var(--chart-1)]"
                      : ""
                  }`}
                  onClick={() => setMetricKey(key)}
                >
                  {metricLabel[key]}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 items-stretch">
              <Card className="md:col-span-1 h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Biểu đồ {metricLabel[metricKey]} (so sánh 5 mô hình)</CardTitle>
                  <CardDescription>EASE, KNN, SLIM, ALS, Hybrid theo K</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3">
                  <ChartContainer config={chartConfig} className="h-[340px] w-full glow-card">
                    <AreaChart
                      data={comparisonData}
                      margin={{ left: 8, right: 8, top: 10, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient id="ease-fill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-ease)" stopOpacity={0.28} />
                          <stop offset="95%" stopColor="var(--color-ease)" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="knn-fill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-knn)" stopOpacity={0.28} />
                          <stop offset="95%" stopColor="var(--color-knn)" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="slim-fill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-slim)" stopOpacity={0.28} />
                          <stop offset="95%" stopColor="var(--color-slim)" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="als-fill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-als)" stopOpacity={0.28} />
                          <stop offset="95%" stopColor="var(--color-als)" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="hybrid-fill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-hybrid)" stopOpacity={0.32} />
                          <stop offset="95%" stopColor="var(--color-hybrid)" stopOpacity={0.08} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="k" tickLine={false} axisLine={false} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        domain={[0.35, 1]}
                        tickFormatter={(v) => v.toFixed(2)}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(value) => `K=${value}`}
                            formatter={(val, name) => [
                              (val as number).toFixed(4),
                              chartConfig[name as keyof typeof chartConfig]?.label ?? name,
                            ]}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="ease"
                        stroke="var(--color-ease)"
                        strokeWidth={2.5}
                        fill="url(#ease-fill)"
                        activeDot={{ r: 5 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="knn"
                        stroke="var(--color-knn)"
                        strokeWidth={2.5}
                        fill="url(#knn-fill)"
                        activeDot={{ r: 5 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="slim"
                        stroke="var(--color-slim)"
                        strokeWidth={2.5}
                        fill="url(#slim-fill)"
                        activeDot={{ r: 5 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="als"
                        stroke="var(--color-als)"
                        strokeWidth={2.5}
                        fill="url(#als-fill)"
                        activeDot={{ r: 5 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="hybrid"
                        stroke="var(--color-hybrid)"
                        strokeWidth={3}
                        fill="url(#hybrid-fill)"
                        activeDot={{ r: 6 }}
                      />
                      <ChartLegend
                        verticalAlign="bottom"
                        content={<ChartLegendContent className="pt-4" />}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Hybrid - {metricLabel[metricKey]} theo K</CardTitle>
                  <CardDescription>Biểu đồ riêng cho Hybrid</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ProductAreaChart
                    data={kValues.map((k, idx) => ({
                      k,
                      value: metricSeries[metricKey].hybrid[idx],
                    }))}
                    color={chartConfig.hybrid.color}
                    label="Hybrid"
                    min={0.35}
                    max={1}
                    height={340}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {ndcgCharts
                .filter((chart) => chart.key !== "hybrid")
                .map((chart) => {
                  const data = kValues.map((k, idx) => ({
                    k,
                    value: metricSeries[metricKey][chart.key][idx],
                  }));
                  return (
                    <Card key={chart.key}>
                      <CardHeader>
                        <CardTitle className="text-base">{chart.title}</CardTitle>
                        <CardDescription>{metricLabel[metricKey]}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ProductAreaChart
                          data={data}
                          color={chartConfig[chart.key].color}
                          label={chart.title}
                          min={0.5}
                          max={0.7}
                          height={240}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
            </div>

            <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-background to-secondary/10">
              <CardHeader>
                <CardTitle>Top 5 sản phẩm bán chạy</CardTitle>
                <CardDescription>Hiển thị trực quan cùng hình ảnh</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Carousel className="w-full" opts={{ align: "start" }}>
                  <CarouselContent className="pl-4">
                    {topProducts.map((product) => (
                      <CarouselItem key={product.name} className="basis-[260px]">
                        <div className="flex h-full flex-col gap-2 rounded-2xl border bg-card/80 p-3 shadow-sm">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="font-semibold text-primary">#{product.rank}</span>
                            <Badge variant="outline">{product.qty?.toLocaleString()} bán</Badge>
                          </div>
                          <ProductCard
                            product={product.product}
                            size="md"
                            onAddToCart={() => handleAddTopProduct(product.product)}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4 bg-background/90 shadow" />
                  <CarouselNext className="-right-4 bg-background/90 shadow" />
                </Carousel>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Khung thời gian</CardTitle>
                  <CardDescription>Khoảng ngày giao dịch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Từ ngày</span>
                    <span className="font-medium">{summary.first_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Đến ngày</span>
                    <span className="font-medium">{summary.last_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Số ngày</span>
                    <span className="font-medium">{summary.time_span_days.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tần suất mua TB</span>
                    <span className="font-medium">{summary.avg_tx_per_customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Độ lệch chuẩn</span>
                    <span className="font-medium">{summary.std_tx_per_customer}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Giao dịch & giỏ</CardTitle>
                  <CardDescription>Phân phối mặt hàng theo hóa đơn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mặt hàng TB / hóa đơn</span>
                    <span className="font-medium">{summary.avg_items_per_invoice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Median mặt hàng / hóa đơn</span>
                    <span className="font-medium">{summary.median_items_per_invoice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SL trung bình mỗi dòng hàng</span>
                    <span className="font-medium">{summary.avg_qty_per_line}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Khách mua nhiều nhất</span>
                    <span className="font-medium">
                      {summary.top_customer_id} ({summary.top_customer_tx} giao dịch)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tỷ lệ sản phẩm lạnh</span>
                    <span className="font-medium">{summary.cold_product_rate.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm nổi bật</CardTitle>
                  <CardDescription>Top bán chạy & thể loại dẫn đầu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SP bán chạy nhất</span>
                    <span className="font-medium">
                      {summary.top_product} ({summary.top_product_qty.toLocaleString()} bán)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loại hàng bán chạy</span>
                    <span className="font-medium">{summary.top_category}</span>
                  </div>
                  <div className="text-muted-foreground text-xs">Top 5: {summary.top_5_products.map((p) => p.name).join(", ")}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DataTable />
        </div>
      </div>
    </>
  );
}
