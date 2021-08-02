import palette, {PaletteKey} from "./palette";


enum MapKey {

  "background" = "background",
  "text" = "text",
  
  // "@#F3F4F6" = "F3F4F6",
}

export const ColorKey = { ...PaletteKey, ...MapKey };
export type ColorKey = typeof ColorKey;


const colors = {

  ...palette,

  [ColorKey.background] : palette["white"],
  [ColorKey.text]: palette["gray-900"],

  // [ColorKey["#F3F4F6"]]:  "#F3F4F6", 

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