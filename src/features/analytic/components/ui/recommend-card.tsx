import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ChartRadarLinesOnly } from "./radar-chart";
import { Loading } from "@/components/loading";

const RecommendCard = () => {
  return (
    <Card className="h-fit overflow-hidden relative">
      <Loading show variant="absolute" />
      <CardContent>
        <div className="flex flex-wrap justify-center">
          <ChartRadarLinesOnly />
          <div className="flex flex-col grow gap-4">
            <CardTitle className="text-xl font-semibold text-left tabular-nums @[250px]/card:text-3xl">
              Analytic Recommend
            </CardTitle>
            <Card className="h-full">
              <CardContent>
                <CardDescription className="text-left">
                  Recommend...
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default RecommendCard;
