import { SiteHeader } from "@/components/site-header";
import TrendingSection from "../../../features/analytic/components/trending";
import RelatedSection from "@/features/analytic/components/related";
import { IoIosAnalytics } from "react-icons/io";
import RecommendCard from "@/features/analytic/components/ui/recommend-card";
import ProductAnalyticCard from "@/features/analytic/components/ui/product-analytic-card";
import AnalyticSearch from "@/features/analytic/components/ui/analytic-searching";

const Analytic = () => {
  return (
    <>
      <title>Analytic | Pulse</title>
      <meta name="description" content="Dashboard metrics" />
      <SiteHeader siteName="Analytic" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-6">
          <AnalyticSearch />
          <section>
            <h2 className="py-2 text-left font-bold flex gap-2 items-center">
              Product Analytic
              <IoIosAnalytics className="text-[var(--badge-foreground-up)]" />
            </h2>
            <div className="flex flex-col gap-4">
              <ProductAnalyticCard />
              <RecommendCard />
            </div>
          </section>
          <RelatedSection />
          <TrendingSection />
        </div>
      </div>
    </>
  );
};

export default Analytic;
