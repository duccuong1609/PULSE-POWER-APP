import { useQuery } from "@tanstack/react-query";
import AnalyticSearch from "../../components/ui/analytic-searching";
import productQueries from "@/app/queries/product.queries";

const ProductAnalyticSearching = () => {

  const { data , isLoading } = useQuery(productQueries.getProductListQuery());

  return <AnalyticSearch type="product" data={data!} isLoading={isLoading} />;

};

export default ProductAnalyticSearching;