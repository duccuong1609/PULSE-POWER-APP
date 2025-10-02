import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconTrendingUp } from "@tabler/icons-react";
import { useState } from "react";
import AnimationButton from "@/components/animation-button";
import GlareHover from "@/features/dashboard/components/ui/glare-hover";
import { glareHoverConfig } from "@/config/glare-hover-config";
import { Loading } from "@/components/loading";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useCustomerStore } from "@/store/customerStore";

const CustomerAnalyticCard = () => {
  const [saved, setSaved] = useState(false);

  const toggleSaved = () => {
    setSaved((prev) => !prev);
  };

  const { customer } = useCustomerStore();

  return (
    <Card className="h-fit relative overflow-hidden">
      <Loading
        show={!customer}
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
      <CardContent>
        <div className="flex gap-4 flex-wrap justify-center relative">
          <GlareHover {...glareHoverConfig}>
            <img
              className="max-w-64 self-start min-w-64 w-full aspect-square rounded-xl border hover:brightness-110 transition-all duration-300 ease-in-out"
              src={customer?.imgUrl || "/img/product-template-img.webp"}
              alt="Trending Product"
              fetchPriority="high"
              loading="eager"
            />
          </GlareHover>
          <div className="flex flex-col gap-4 grow">
            <CardTitle className="text-2xl font-semibold text-left tabular-nums @[250px]/card:text-3xl">
              {customer?.name}
            </CardTitle>
            <CardDescription className="text-left">
              {customer?.description || "Description"}
            </CardDescription>
            <div className="flex gap-2">
              <CardAction>
                <Badge
                  variant="outline"
                  className={` text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md`}
                >
                  <IconTrendingUp />
                  Badge
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
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                <div className="grid sm:w-full lg:w-[49%] items-center gap-3">
                  <Label htmlFor="email">Attribute</Label>
                  <Input
                    disabled
                    type="email"
                    id="email"
                    placeholder="Attribute"
                  />
                </div>
                <div className="grid sm:w-full lg:w-[49%] items-center gap-3">
                  <Label htmlFor="email">Attribute</Label>
                  <Input
                    disabled
                    type="email"
                    id="email"
                    placeholder="Attribute"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="grid sm:w-full lg:w-[49%] items-center gap-3">
                  <Label htmlFor="email">Attribute</Label>
                  <Input
                    disabled
                    type="email"
                    id="email"
                    placeholder="Attribute"
                  />
                </div>
                <div className="grid sm:w-full lg:w-[49%] items-center gap-3">
                  <Label htmlFor="email">Attribute</Label>
                  <Input
                    disabled
                    type="email"
                    id="email"
                    placeholder="Attribute"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <AnimationButton saved={saved} toggleSaved={toggleSaved} />
    </Card>
  );
};

export default CustomerAnalyticCard;
