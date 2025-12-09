import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-[280px] overflow-hidden rounded-xl border shadow">
      <div className="aspect-square w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="p-3 pb-0 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/2 mt-1" />
      </CardHeader>
      <CardFooter className="p-3 pt-3 flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-9 shrink-0" />
      </CardFooter>
    </Card>
  );
}