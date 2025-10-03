import { SiteHeader } from "@/components/site-header";
import RelatedSection from "@/features/analytic/components/related";
import { IoIosAnalytics } from "react-icons/io";
import RecommendCard from "@/features/analytic/product-analytic/components/product-recommend-card";
import ProductAnalyticCard from "@/features/analytic/product-analytic/components/product-analytic-card";
import TrendingSection from "@/features/analytic/components/trending";
import ProductAnalyticSearching from "@/features/analytic/product-analytic/components/product-analytic-searching";

const AnalyticProduct = () => {
  return (
    <>
      <title>Product Analytic | Pulse</title>
      <meta name="description" content="Dashboard metrics" />
      <SiteHeader siteName="Analytic" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-6">
          <ProductAnalyticSearching />
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

export default AnalyticProduct;
