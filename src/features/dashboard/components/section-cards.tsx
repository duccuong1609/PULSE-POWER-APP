import CardKPI from "./ui/card-kpi"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <CardKPI
        cardDescription="Total Revenue"
        cardTitle="$1,250.00" cardAction="+12.5%"
        cardFooter="Trending up this month"
        cardFooterDescription="Visitors for the last 6 months"
        cardType="up" />
      <CardKPI
        cardDescription="New Customers"
        cardTitle="1,234.00" cardAction="-20%"
        cardFooter="Down 20% this period "
        cardFooterDescription="Acquisition needs attention"
        cardType="down" />
      <CardKPI
        cardDescription="Active Customers"
        cardTitle="$1,250.00" cardAction="+12.5%"
        cardFooter="Trending up this month"
        cardFooterDescription="Visitors for the last 6 months"
        cardType="up" />
      <CardKPI
        cardDescription="Growth Rate"
        cardTitle="$1,250.00" cardAction="+12.5%"
        cardFooter="Trending up this month"
        cardFooterDescription="Visitors for the last 6 months"
        cardType="up" />
    </div >
  )
}