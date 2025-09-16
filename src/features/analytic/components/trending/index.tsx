import { IconTrendingUp } from "@tabler/icons-react";
import ProductCard from "../ui/product-card";
import Loop from "@/features/dashboard/components/ui/loop";
import { data } from "@/data/product-data";



interface TechLogo {
  node: React.ReactNode;
  title: string;
  href: string;
}

const techLogos: TechLogo[] = data.map((item) => ({
  node: <ProductCard {...item} />,
  title: item.title,
  href: item.href,
}));

const TrendingSection = () => {
  return (
    <>
      <section>
        <h2 className="py-2 text-left font-bold flex gap-2">
          Trending Product{" "}
          <IconTrendingUp className="text-[var(--badge-foreground-up)]" />
        </h2>
        <Loop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
          ariaLabel="Technology partners"
        />
      </section>
    </>
  );
};

export default TrendingSection;
