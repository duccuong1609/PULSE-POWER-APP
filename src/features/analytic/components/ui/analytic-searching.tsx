import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CUSTOMER_PROPS, PRODUCT_PROPS } from "@/services/dtos";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { TbCirclesRelation } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import Fuse from "fuse.js";
import { FaFaceFrownOpen } from "react-icons/fa6";
import { useTypedStore } from "@/helper/use-typed-stored";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/store/userStore";

type AnalyticSearchProps =
  | {
      type: "product";
      data?: PRODUCT_PROPS[];
      isLoading?: boolean;
    }
  | {
      type: "customer";
      data?: CUSTOMER_PROPS[];
      isLoading?: boolean;
    };

const AnalyticSearch = ({
  type,
  data = [],
  isLoading = false,
}: AnalyticSearchProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const { setValue } = useTypedStore(type);

  const fuse = useMemo(() => {
    return new Fuse(data, {
      keys: ["referanceId", "name"],
      threshold: 0.4,
    });
  }, [data]);

  const results = useMemo(() => {
    if (!debouncedQuery) return data;
    return fuse.search(debouncedQuery).map((r) => r.item);
  }, [debouncedQuery, fuse, data]);

  const handleChoose = (item: PRODUCT_PROPS | CUSTOMER_PROPS) => {
    setOpen(false);
    setValue(item);
    setQuery(item.name);
  };

  const [searchParams] = useSearchParams();
  const { userParam } = useUserStore();

  useEffect(() => {
    const referanceId = searchParams.get("referanceId");
    if (referanceId) {
      setQuery(referanceId);

      const item = data.find(
        (d: PRODUCT_PROPS | CUSTOMER_PROPS) => d.referanceId === referanceId
      );

      if (item) {
        handleChoose(item);
      }
    }
  }, [searchParams, data]);

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={() => navigate(`/${userParam}/analytic`)}
          variant={"outline"}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <div className="flex-1 flex">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Hotdog, etc..."
                onFocus={(e) => {
                  setOpen(true);
                  const length = e.target.value.length;
                  e.target.setSelectionRange(length, length);
                }}
                onBlur={() => setOpen(false)}
              />
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] mt-2 h-96 overflow-y-auto flex flex-col gap-4 custom-scrollbar relative transform transition-all duration-300 ease-in-out">
              <Loading show={data.length === 0 || isLoading} />
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-sm mb-2 flex gap-1 items-center">
                  Related
                  <TbCirclesRelation className="text-[var(--badge-foreground-up)]" />
                </span>
                {results.length > 0 ? (
                  results.slice(0, 100).map((item) => (
                    <Button
                      variant={"outline"}
                      key={item.id}
                      onClick={() => handleChoose(item)}
                      className="flex justify-start gap-2 cursor-pointer"
                    >
                      <Avatar className="w-5 h-5">
                        <AvatarImage
                          src={item.imgUrl || "https://github.com/shadcn.png"}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span>
                        {item.name}
                        <span className="text-muted-foreground">
                          {" "}
                          - {item.referanceId}
                        </span>
                      </span>
                    </Button>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm items-center justify-center italic flex gap-2">
                    No results found
                    <FaFaceFrownOpen />
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-sm mb-2 flex gap-1 items-center">
                  Suggestions
                  <FaFireAlt className="text-[var(--badge-foreground-down)]" />
                </span>
                {data.slice(0, 3).map((item) => (
                  <Button
                    variant={"outline"}
                    key={item.id}
                    onClick={() => handleChoose(item)}
                    className="flex justify-start gap-2 cursor-pointer"
                  >
                    <img
                      className="h-[100%] aspect-square rounded-xl border hover:brightness-110 transition-all duration-300 ease-in-out"
                      src={item.imgUrl || "/img/product-template-img.webp"}
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
        </div>
      </div>
      <span className="text-muted-foreground text-sm text-left">
        Browsing your customer for analytic
      </span>
    </>
  );
};

export default AnalyticSearch;
