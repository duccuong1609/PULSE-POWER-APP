import { SiteHeader } from "@/components/site-header";

const Info = () => {
  return (
    <>
      <title>Info | Pulse</title>
      <meta name="description" content="Pulse information" />
      <SiteHeader siteName="Info" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 text-left">
          Info
        </div>
      </div>
    </>
  );
};

export default Info;
