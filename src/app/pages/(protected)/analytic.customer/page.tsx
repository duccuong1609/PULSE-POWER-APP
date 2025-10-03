import { SiteHeader } from "@/components/site-header";
import { IoIosAnalytics } from "react-icons/io";
import TrendingSection from "@/features/analytic/components/trending";
import CustomerAnalyticSearching from "@/features/analytic/customer-analytic/components/customer-analytic-searching";
import CustomerAnalyticCard from "@/features/analytic/customer-analytic/components/customer-analytic-card";
import CustomerRecommendCard from "@/features/analytic/customer-analytic/components/customer-recommend-card";
import RelatedSection from "@/features/analytic/customer-analytic/components/related-product";

const AnalyticCustomer = () => {
  return (
    <>
      <title>Customer Analytic | Pulse</title>
      <meta name="description" content="Dashboard metrics" />
      <SiteHeader siteName="Analytic" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-6">
          <CustomerAnalyticSearching />
          <section>
            <h2 className="py-2 text-left font-bold flex gap-2 items-center">
              Customer Analytic
              <IoIosAnalytics className="text-[var(--badge-foreground-up)]" />
            </h2>
            <div className="flex flex-col gap-4">
              <CustomerAnalyticCard />
              <CustomerRecommendCard />
            </div>
          </section>
          <RelatedSection />
          <TrendingSection />
        </div>
      </div>
    </>
  );
};

export default AnalyticCustomer;
