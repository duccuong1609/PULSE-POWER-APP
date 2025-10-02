import LanguageSwitcher from "@/components/language-switcher";
import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";

const Setting = () => {
  return (
    <>
      <title>Setting | Pulse</title>
      <meta name="description" content="Pulse Setting" />
      <SiteHeader siteName="Setting" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 sx:p-4 p-6 text-left">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
};

export default Setting;
