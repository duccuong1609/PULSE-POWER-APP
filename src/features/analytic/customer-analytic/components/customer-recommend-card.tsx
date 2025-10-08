import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import customerQueries from "@/app/queries/customer.queries";
import { useCustomerStore } from "@/store/customerStore";
import type { AxiosError } from "axios";
import type { ERROR_CONTAINER_PROPS } from "@/services/dtos";
import { Loading } from "@/components/loading";
import { RiFolderUnknowFill } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegCopy } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ChartRadarLinesOnly } from "../../components/ui/radar-chart";
import { FaRankingStar } from "react-icons/fa6";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const CustomerRecommendCard = () => {
  const { customer } = useCustomerStore();

  const topKProductQuery = useQuery(
    customerQueries.getRecommendTopKProductQuery(
      {
        user_id: customer?.referanceId ?? "",
        top_k: 10,
      },
      [customer?.referanceId ?? "", customer?.name ?? ""],
      {
        enabled: Boolean(customer?.referanceId),
        retry: (failureCount, error) => {
          const axiosError = error as AxiosError<ERROR_CONTAINER_PROPS>;
          const status = axiosError.response?.status;
          if (status === 404) return false;
          return failureCount < 3;
        },
      }
    )
  );

  return (
    <Card className="h-fit overflow-hidden relative">
      <Loading
        show={!topKProductQuery.data && !topKProductQuery.isError}
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
        <div className="grid grid-cols-2 min-h-72 max-md:grid-cols-1 justify-center">
          {topKProductQuery.isError &&
            (() => {
              const err =
                topKProductQuery.error as AxiosError<ERROR_CONTAINER_PROPS>;
              const data = err.response?.data;
              const inner = JSON.parse(data!.message.message);
              return (
                <div className="text-muted-foreground flex flex-col text-sm justify-center items-center w-full min-h-96 h-full gap-2">
                  <RiFolderUnknowFill size={48} />
                  <div>{inner.message}</div>
                </div>
              );
            })()}
          {topKProductQuery.isSuccess && (
            <ChartRadarLinesOnly
              chartData={
                topKProductQuery.data?.recommendations.map((item) => ({
                  label: item.product_id,
                  value: item.score,
                })) ?? []
              }
            />
          )}
          <div className="flex flex-col grow gap-4">
            <CardTitle className="text-xl font-semibold text-left tabular-nums @[250px]/card:text-3xl">
              Top 10 Recommended Products - NCF Analytics
            </CardTitle>
            <Card className="h-full py-0 overflow-hidden">
              {topKProductQuery.isError &&
                (() => {
                  const err =
                    topKProductQuery.error as AxiosError<ERROR_CONTAINER_PROPS>;
                  const data = err.response?.data;
                  const inner = JSON.parse(data!.message.message);
                  return (
                    <div className="text-muted-foreground flex flex-col text-sm justify-center items-center w-full h-full gap-2">
                      <RiFolderUnknowFill size={48} />
                      <div>{inner.message}</div>
                    </div>
                  );
                })()}
              {topKProductQuery.isSuccess && (
                <Table>
                  <TableHeader className="bg-background pointer-events-none">
                    <TableRow>
                      <TableHead className="font-bold py-4 ml-2">
                        Product
                      </TableHead>
                      <TableHead className="font-bold">Score</TableHead>
                      <TableHead className="font-bold text-center">
                        Rank
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topKProductQuery.data?.recommendations.map(
                      (item, index) => (
                        <TableRow
                          key={index}
                          className="odd:bg-muted/70 even:bg-muted"
                        >
                          <TableCell
                            className={`text-left flex gap-2 ${
                              index < 3 ? "font-bold" : ""
                            }`}
                          >
                            {item.product_id}
                            {
                              <Button
                                variant={"link"}
                                className="p-0"
                                size={"sm"}
                                onClick={() =>
                                  navigator.clipboard.writeText(item.product_id)
                                }
                              >
                                <FaRegCopy />
                              </Button>
                            }
                          </TableCell>
                          <TableCell
                            className={`text-left ${
                              index < 3 ? "font-bold" : ""
                            }`}
                          >
                            {item.score}
                          </TableCell>
                          <TableCell
                            className={`flex gap-2 justify-center items-center ${
                              index < 3 ? "font-bold" : ""
                            }`}
                          >
                            {item.rank}
                            {index < 3 && (
                              <FaRankingStar
                                size={16}
                                className="text-amber-400"
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              )}
            </Card>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CustomerRecommendCard;
