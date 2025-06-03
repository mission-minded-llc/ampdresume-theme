import { ThemeName } from "@/types";

export { ThemeDefault } from "./default/ThemeDefault";
export { ThemeDefaultPDF } from "./default/ThemeDefaultPDF";
export { ThemeDavids } from "./davids/ThemeDavids";

/**
 * The available themes for the web and PDF. These can be imported and iterated over
 * to determine which themes are available.
 */
export const availableThemes: { web: ThemeName[]; pdf: ThemeName[] } = {
  web: ["default", "davids"],
  pdf: ["default"],
};
