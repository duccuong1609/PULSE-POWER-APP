import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

export default function LanguageSwitcher() {

  const { i18n } = useTranslation();

  return (
    <>
      <div className="flex items-center space-x-2 rounded-lg border p-3 shadow-sm">
        <div className="space-y-0.5">
          <h2 className="font-bold">Language</h2>
          <span className="text-sm text-muted-foreground">
            Switch between Vietnamese and English.
          </span>
        </div>
        <div className="flex gap-2 items-center justify-end flex-1">
          <Button variant={i18n.language === "vi" ? "default" : "outline"} className="border border-transparent transition-all ease-in-out duration-300" onClick={() => {i18n.changeLanguage("vi")}}>Tiếng Việt</Button>
          <Button variant={i18n.language === "en" ? "default" : "outline"} className="border border-transparent transition-all ease-in-out duration-300" onClick={() => i18n.changeLanguage("en")}>English</Button>
        </div>
      </div>
    </>
  );
}
