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
import { Loading } from "@/components/loading";

const RelatedSection = () => {
  return (
    <div>
      <h2 className="py-2 text-left font-bold flex gap-2 items-center">
        Related Product
        <TbCirclesRelation className="text-[var(--badge-foreground-up)]" />
      </h2>
      <section className="px-12 relative overflow-hidden">
        <Loading show variant="absolute" />
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem className="basis-3xs" key={item.id}>
                <ProductCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
};

export default RelatedSection;
