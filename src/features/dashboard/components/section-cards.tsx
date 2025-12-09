import CardKPI from "./ui/card-kpi";
import summary from "@/app/pages/(protected)/dashboard/summary-data.json";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2">
      <CardKPI
        cardDescription="Tổng số bản ghi (dòng hàng)"
        cardTitle={summary.total_rows.toLocaleString()}
        cardAction="+"
        cardFooter=""
        cardFooterDescription=""
        cardType="up"
      />
      <CardKPI
        cardDescription="Tổng số giao dịch (hóa đơn)"
        cardTitle={summary.total_invoices.toLocaleString()}
        cardAction="+"
        cardFooter=""
        cardFooterDescription=""
        cardType="up"
      />
      <CardKPI
        cardDescription="Khách hàng duy nhất"
        cardTitle={summary.unique_customers.toLocaleString()}
        cardAction="+"
        cardFooter=""
        cardFooterDescription=""
        cardType="up"
      />
      <CardKPI
        cardDescription="Sản phẩm duy nhất"
        cardTitle={summary.unique_products.toLocaleString()}
        cardAction="+"
        cardFooter=""
        cardFooterDescription=""
        cardType="up"
      />
    </div>
  );
}
