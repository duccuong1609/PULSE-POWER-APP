import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import ShinyText from "@/components/ShinyText";

type AnalyticTypeCardProps = {
  navigateUrl?: string;
  title: string;
  description: string;
};

const AnalyticTypeCard = ({
  navigateUrl,
  title,
  description,
}: AnalyticTypeCardProps) => {
  const navigate = useNavigate();
  return (
    <Card className="pt-0 group overflow-hidden">
      <CardContent className="px-0 h-70 overflow-hidden">
        <img
          src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-2.png?height=280&format=auto"
          alt="Banner"
          className="aspect-video h-70 rounded-t-xl object-cover w-full transform overflow-hidden transition-transform duration-500 group-hover:scale-125"
        />
      </CardContent>
      <CardHeader className="text-left">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="gap-3 flex items-end justify-end">
        <Button>Explore More</Button>
        <Button variant={"outline"} onClick={() => navigate(navigateUrl!)}>
          <ShinyText text="Analytic Now" disabled={false} speed={5} />
          <ChevronRightIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalyticTypeCard;
