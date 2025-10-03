import { useQuery } from "@tanstack/react-query";
import AnalyticSearch from "../../components/ui/analytic-searching";
import customerQueries from "@/app/queries/customer.queries";

const CustomerAnalyticSearching = () => {

  const { data, isLoading } = useQuery(customerQueries.getAllCustomerQuery());

  return <AnalyticSearch type="customer" data={data!} isLoading={isLoading} />;
};

export default CustomerAnalyticSearching;
