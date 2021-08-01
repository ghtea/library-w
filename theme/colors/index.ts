import commonColors from "./commonColors";

export enum ColorKey {
  "BACKGROUND" = "background",
  "TEXT" = "text",
  "@#6B7280" = "@#6B7280"
}

const colors = {
  [ColorKey.BACKGROUND] : "#ffffff",
  [ColorKey.TEXT]: "#18181B",

  [ColorKey["@#6B7280"]]: "#6B7280",
  // "primary": commonColors["blue-500"],
  // "secondary": commonColors["green-500"],
  // "disabled": commonColors["gray-100"],

  // "text-primary": commonColors["gray-900"],
  // "text-secondary": commonColors["gray-500"],
  // "text-tertiary": commonColors["gray-500"],
  // "text-disabled": commonColors["gray-200"],
  // "text-hint": commonColors["blue-gray-500"],
  // "text-subtle": commonColors["cool-gray-500"],

  // "background": commonColors["gray-50"],

  // "success": commonColors["green-500"],
  // "warning": commonColors["amber-500"],
  // "error": commonColors["red-500"],
  // "info": commonColors["violet-500"],
  
  // "alternative": commonColors["gray-500"],

  // modes: {
  //   dark: {
      
  //   }
  // }

};


export default colors;