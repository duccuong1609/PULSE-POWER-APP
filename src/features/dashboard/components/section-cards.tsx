import CardKPI from "./ui/card-kpi";
import customerQueries from "@/app/queries/customer.queries";
import productQueries from "@/app/queries/product.queries";
import { useQuery } from "@tanstack/react-query";

export function SectionCards() {
  
  const { data: customer } = useQuery(customerQueries.getAllCustomerQuery());
  const { data: product } = useQuery(productQueries.getProductListQuery());

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <CardKPI
        cardDescription="Total Revenue"
        cardTitle="$1,250.00"
        cardAction="+12.5%"
        cardFooter="Trending up this month"
        cardFooterDescription="Visitors for the last 6 months"
        cardType="up"
      />
      <CardKPI
        cardDescription="New Customers"
        cardTitle="1,234.00"
        cardAction="-20%"
        cardFooter="Down 20% this period "
        cardFooterDescription="Acquisition needs attention"
        cardType="down"
      />
      <CardKPI
        cardDescription="Active Customers"
        cardTitle={"" + customer?.length || "0"}
        cardAction="+12.5%"
        cardFooter="Trending up this month"
        cardFooterDescription="Visitors for the last 6 months"
        cardType="up"
      />
      <CardKPI
        cardDescription="Active Product"
        cardTitle={"" + product?.length || "0"}
        cardAction="+12.5%"
        cardFooter="Trending up this month"
        cardFooterDescription="Visitors for the last 6 months"
        cardType="up"
      />
    </div>
  );
}
