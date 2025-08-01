import { Users } from "lucide-react";
import { useContext } from "react";
import { LangContext } from "@/context/LangContext";

const translations = {
  fr: {
    copyright: "© 2025 Binomi. Tous droits réservés.",
  },
  tn: {
    copyright: "© 2025 Binomi. جميع الحقوق محفوظة.",
  },
};

const Footer = () => {
  const { lang } = useContext(LangContext);
  const t = translations[lang];
  return (
    <footer className="w-full border-t bg-background py-6 mt-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            Binomi
          </span>
        </div>
        <div className="text-sm text-muted-foreground">{t.copyright}</div>
      </div>
    </footer>
  );
};

export default Footer;