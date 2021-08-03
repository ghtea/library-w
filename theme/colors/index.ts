import palette from "./palette";


export enum ColorKey {

  "background" = "background",
  "text" = "text",

  "primary" = "primary",
  "primary-partner" = "primary-partner",

  "secondary" = "secondary",
  "secondary-partner" = "secondary-partner",
  
  "text-strong" = "text-strong",

  "nav.bg" = "nav-bg",
  "nav.border" = "nav-border",

  // "@#F3F4F6" = "F3F4F6",
}


const colors = {

  [ColorKey.background] : palette["white"],
  [ColorKey.text]: palette["gray-700"],

  [ColorKey.primary]: "#1997F0",
  [ColorKey["primary-partner"]]: palette["white"],
  // [ColorKey.secondary]: "#1997F0",

  [ColorKey["text-strong"]]: palette["gray-900"],


  [ColorKey["nav.bg"]]: palette["gray-50"],
  [ColorKey["nav.border"]]: palette["gray-200"],
  



  // [ColorKey["#F3F4F6"]]:  "#F3F4F6", 


  // text	Body foreground color
  // background	Body background color

  // primary	Primary brand color for links, buttons, etc.
  // secondary	A secondary brand color for alternative styling

  // accent	A contrast color for emphasizing UI
  // highlight	A background color for highlighting text
  // muted	A faint color for backgrounds, borders, and accents that do not require high contrast with the background color
  

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