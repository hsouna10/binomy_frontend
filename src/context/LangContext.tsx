import { createContext } from "react";

export const LangContext = createContext({
  lang: "fr",
  setLang: (lang: "fr" | "tn") => {},
});
