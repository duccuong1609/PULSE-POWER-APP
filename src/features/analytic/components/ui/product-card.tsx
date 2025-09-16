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
import { IconTrendingUp } from "@tabler/icons-react";

type ItemProps = {
  title: string;
  description: string;
  image: string;
  badge: string;
};

const ProductCard = (item: ItemProps) => {
  return (
    <GlareHover {...glareHoverConfig}>
      <Card>
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
        <CardFooter className="flex gap-2 items-center justify-center">
          <CardAction>
            <Badge
              variant="outline"
              className={` text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md`}
            >
              <IconTrendingUp />
              {item.badge}
            </Badge>
          </CardAction>
          <CardAction>
            <Badge
              variant="outline"
              className={` text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md`}
            >
              <IconTrendingUp />
              Action
            </Badge>
          </CardAction>
        </CardFooter>
      </Card>
    </GlareHover>
  );
};

export default ProductCard;
