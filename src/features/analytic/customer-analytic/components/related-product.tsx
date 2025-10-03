import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TbCirclesRelation } from "react-icons/tb";
import { Loading } from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import customerQueries from "@/app/queries/customer.queries";
import { useCustomerStore } from "@/store/customerStore";
import productQueries from "@/app/queries/product.queries";
import React from "react";
import type { PRODUCT_PROPS } from "@/services/dtos";
import ProductCard from "../../components/ui/product-card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Card } from "@/components/ui/card";

const RelatedSection = () => {
  const { customer } = useCustomerStore();

  const productQuery = useQuery(productQueries.getProductListQuery());

  const topKProductQuery = useQuery(
    customerQueries.getRecommendTopKProductQuery(
      {
        user_id: customer?.referanceId ?? "",
        top_k: 10,
      },
      [customer?.referanceId ?? "", customer?.name ?? ""],
      {
        enabled: false,
      }
    )
  );

  const recommendedProducts = React.useMemo(() => {
    if (!productQuery.data || !topKProductQuery.data) return [];

    const recommendMap = new Map(
      topKProductQuery.data.recommendations.map((r) => [r.MaHang, r.Rank])
    );

    return productQuery.data
      .filter((p: PRODUCT_PROPS) => recommendMap.has(p.referanceId))
      .map((p) => ({
        ...p,
        rank: recommendMap.get(p.referanceId) ?? 0,
      }))
      .sort((a, b) => b.rank - a.rank);
  }, [productQuery.data, topKProductQuery.data]);

  return (
    <div>
      <h2 className="py-2 text-left font-bold flex gap-2 items-center">
        Related Product
        <TbCirclesRelation className="text-[var(--badge-foreground-up)]" />
      </h2>
      <section className="px-12 relative overflow-hidden">
        <Loading
          show={productQuery.isLoading || topKProductQuery.isLoading}
          variant="absolute"
        />
        {recommendedProducts.length > 0 && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {recommendedProducts &&
                recommendedProducts.map((item) => (
                  <CarouselItem className="basis-3xs" key={item.id}>
                    <ProductCard
                      badge={item.referanceId}
                      className="h-full"
                      title={item.name}
                      description={item.name}
                      rank={item.rank}
                      image={item.imgUrl || "img/product-template-img.webp"}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </section>

      {recommendedProducts.length === 0 && (
        <Card className="relative min-h-96 overflow-hidden">
          <Loading
            show
            variant="absolute"
            children={
              <div className="flex flex-col gap-4 flex-wrap justify-center items-center relative">
                <Spinner variant="ellipsis" size={50} />
                <div className="text-muted-foreground text-sm">
                  Working on... Searching something to analytic
                </div>
              </div>
            }
          />
        </Card>
      )}
    </div>
  );
};

export default RelatedSection;
