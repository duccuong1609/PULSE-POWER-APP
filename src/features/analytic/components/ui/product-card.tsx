import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { glareHoverConfig } from "@/config/glare-hover-config";
import GlareHover from "@/features/dashboard/components/ui/glare-hover";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router";
import { AiFillProduct } from "react-icons/ai";
import { FaMedal } from "react-icons/fa";

type ItemProps = {
  title: string;
  description: string;
  image: string;
  badge: string;
  className?: string;
  rank?: number;
};

const ProductCard = (item: ItemProps) => {
  
  const { userParam } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className={item.className}>
      <GlareHover {...glareHoverConfig}>
        <Card
          className="h-full"
          onClick={() => {
            navigate(
              `/${userParam}/analytic/product?referanceId=${item.badge}`
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <CardContent className="flex items-center justify-center">
            <img
              width={192}
              height={192}
              className="max-w-192 aspect-square rounded-xl border hover:brightness-115"
              src="/img/product-template-img.webp"
              alt="Trending Product"
              fetchPriority="high"
              loading="eager"
            />
          </CardContent>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {item.title}
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-2 items-center justify-center mt-auto">
            <CardAction>
              <Badge
                variant="outline"
                className={` text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md`}
              >
                <AiFillProduct />
                {item.badge}
              </Badge>
            </CardAction>
            {item.rank && item.rank < 4 && (
              <CardAction>
                <Badge
                  variant="outline"
                  className={`${
                    item.rank == 1
                      ? "text-[#AF9500]"
                      : item.rank == 2
                      ? "text-[#D7D7D7]"
                      : "text-[#AD8A56]"
                  } text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md`}
                >
                  <FaMedal />
                  {item.rank}
                </Badge>
              </CardAction>
            )}
          </CardFooter>
        </Card>
      </GlareHover>
    </div>
  );
};

export default ProductCard;
