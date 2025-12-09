import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

type MiniAreaChartProps = {
  data: { k: number; value: number }[]
  color: string
  label?: string
  min?: number
  max?: number
  height?: number
}

const ProductAreaChart = ({
  data,
  color,
  label = "NDCG@5",
  min = 0.5,
  max = 0.7,
  height = 220,
}: MiniAreaChartProps) => {
  return (
    <ChartContainer
      config={{ value: { label, color } }}
      className="w-full"
      style={{ height }}
    >
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 0,
          right: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="k"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `K=${value}`}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[min, max]}
          tickFormatter={(v) => v.toFixed(2)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dot"
              labelFormatter={(value) => `K=${value}`}
              formatter={(val) => [(val as number).toFixed(4), label]}
            />
          }
        />
        <Area
          dataKey="value"
          type="natural"
          fill={color}
          fillOpacity={0.2}
          stroke={color}
          strokeWidth={2.5}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default ProductAreaChart