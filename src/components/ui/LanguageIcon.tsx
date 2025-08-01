import { Globe } from "lucide-react";

export const LanguageIcon = ({ lang }: { lang: 'fr' | 'tn' }) => {
  if (lang === 'fr') return <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" alt="FR" className="w-5 h-5 rounded-full" />;
  if (lang === 'tn') return <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg" alt="TN" className="w-5 h-5 rounded-full" />;
  return <Globe className="w-5 h-5" />;
};
