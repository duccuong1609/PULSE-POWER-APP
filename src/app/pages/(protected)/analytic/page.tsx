import { SiteHeader } from "@/components/site-header";
import AnalyticTypeCard from "@/features/analytic/components/ui/analytic-type-card";
import { Outlet } from "react-router";

const Analytic = () => {
  const data = [
    {
      title: "Product Analytic",
      description: "Analytic for product flow and performance",
      navigateUrl: `product`,
    },
    {
      title: "Customer Analytic",
      description: "Analytic for customer flow and performance",
      navigateUrl: `customer`,
    },
  ];

  return (
    <>
      <title>Analytic | Pulse</title>
      <meta name="description" content="Dashboard metrics" />
      <SiteHeader siteName="Analytic" />
      <div className="grid grid-cols-2 max-lg:grid-cols-1 p-6 gap-6">
        {data.map((item, index) => (
          <AnalyticTypeCard
            key={index}
            navigateUrl={item.navigateUrl}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default Analytic;
