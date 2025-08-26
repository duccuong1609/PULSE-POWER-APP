import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button onClick={() => i18n.changeLanguage("vi")}>Tiếng Việt</Button>
      <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
    </div>
  );
}