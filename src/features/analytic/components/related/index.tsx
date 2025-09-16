import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { data } from "@/data/product-data";
import ProductCard from "../ui/product-card";
import { TbCirclesRelation } from "react-icons/tb";

const RelatedSection = () => {
  return (
    <>
      <h2 className="py-2 text-left font-bold flex gap-2 items-center">
        Related Product
        <TbCirclesRelation className="text-[var(--badge-foreground-up)]" />
      </h2>
      <section className="px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem className="basis-3xs">
                <ProductCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};

export default RelatedSection;
