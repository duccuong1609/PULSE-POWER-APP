import { SiteHeader } from "@/components/site-header";
import ProductCart from "@/features/cart/components/ProductCart";
import ProductGrid from "@/features/cart/ProductGrid";
import summary from "@/app/pages/(protected)/dashboard/summary-data.json";
import { ProductCard } from "@/features/cart/components/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { IconFlame } from "@tabler/icons-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Cart = () => {
  const { addToCart, setIsOpen } = useCartStore();

  const topProducts = summary.top_5_products.map((p, idx) => ({
    ...p,
    rank: idx + 1,
    product: {
      id: idx + 1000,
      referanceId: `TOP-${idx + 1}`,
      name: p.name,
      price: `${(p.qty ?? 0).toLocaleString()} đã bán`,
      imgUrl: "/img/product-template-img.webp",
    },
  }));

  const handleAddTop = (product: (typeof topProducts)[number]["product"]) => {
    addToCart(product);
    toast.success("Added to cart", {
      description: product.name,
      action: {
        label: "View cart",
        onClick: () => setIsOpen(true),
      },
    });
  };

  return (
    <>
      <title>Shop | Pulse</title>
      <meta name="description" content="Shop" />
      <SiteHeader siteName="Shop" filters={<ProductCart />} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-3">
          <div className="px-4 lg:px-6 mt-4">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <IconFlame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold">Top 5 best-selling products</span>
            </div>
            <Carousel className="w-full">
              <CarouselContent className="pl-2">
                {topProducts.map((item) => (
                  <CarouselItem key={item.rank} className="basis-[180px] sm:basis-[200px]">
                    <div className="flex h-full flex-col gap-1.5 rounded-md border p-2 shadow-sm">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="font-semibold text-primary">#{item.rank}</span>
                        <span>{item.qty?.toLocaleString()} đã bán</span>
                      </div>
                      <ProductCard
                        product={item.product}
                        size="sm"
                        onAddToCart={() => handleAddTop(item.product)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-3 bg-background/90 shadow" />
              <CarouselNext className="-right-3 bg-background/90 shadow" />
            </Carousel>
          </div>

          <ProductGrid />
        </div>
      </div>
    </>
  );
};

export default Cart;