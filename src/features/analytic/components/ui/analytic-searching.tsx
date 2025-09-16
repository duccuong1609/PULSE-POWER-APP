import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaFireAlt } from "react-icons/fa";
import { TbCirclesRelation } from "react-icons/tb";

const data = [
  { name: "Trending Product", image: "/img/product-template-img.webp" },
  { name: "Trending Product", image: "/img/product-template-img.webp" },
  { name: "Trending Product", image: "/img/product-template-img.webp" },
];

const AnalyticSearch = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Input type="search" placeholder="Hotdog, etc..." />
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs mb-2 flex gap-1 items-center">
              Suggestions
              <FaFireAlt className="text-[var(--badge-foreground-down)]" />
            </span>
            {data.map((item) => (
              <Button
                variant={"outline"}
                key={item.name}
                className="flex justify-start gap-2 cursor-pointer"
              >
                <img
                  className="h-[100%] aspect-square rounded-xl border hover:brightness-110 transition-all duration-300 ease-in-out"
                  src={item.image}
                  alt="Trending Product"
                  fetchPriority="high"
                  loading="eager"
                />
                <span>{item.name}</span>
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs mb-2 flex gap-1 items-center">Related
              <TbCirclesRelation className="text-[var(--badge-foreground-up)]" />
            </span>
            {data.map((item) => (
              <Button
                variant={"outline"}
                key={item.name}
                className="flex justify-start gap-2 cursor-pointer"
              >
                <img
                  className="h-[100%] aspect-square rounded-xl border hover:brightness-110 transition-all duration-300 ease-in-out"
                  src={item.image}
                  alt="Trending Product"
                  fetchPriority="high"
                  loading="eager"
                />
                <span>{item.name}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <span className="text-muted-foreground text-sm text-left">
        Browsing your product for analytic
      </span>
    </>
  );
};

export default AnalyticSearch;
