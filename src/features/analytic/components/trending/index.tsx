import { IconTrendingUp } from "@tabler/icons-react";
import ProductCard from "../ui/product-card";
import Loop from "@/features/dashboard/components/ui/loop";
import { Loading } from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import productQueries from "@/app/queries/product.queries";
import { useMemo } from "react";

interface ProductItem {
  node: React.ReactNode;
  title: string;
}

const TrendingSection = () => {
  const { data } = useQuery(productQueries.getProductListQuery());

  const productItem: ProductItem[] = useMemo(() => {
    if (!data) return [];
    return (
      data.slice(0, 10).map((item) => ({
        node: (
          <ProductCard
            badge={item.referanceId}
            className="h-full"
            title={item.name}
            description={item.name}
            image={item.imgUrl || "img/product-template-img.webp"}
          />
        ),
        title: item.name,
      })) ?? []
    );
  }, [data]);

  return (
    <>
      <section>
        <h2 className="py-2 text-left font-bold flex gap-2">
          Trending Product
          <IconTrendingUp className="text-[var(--badge-foreground-up)]" />
        </h2>
        <div className="relative">
          <Loading show={false} variant="absolute" />
          <Loop
            logos={productItem}
            speed={60}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="var(--background)"
            ariaLabel="Technology partners"
          />
        </div>
      </section>
    </>
  );
};

export default TrendingSection;
