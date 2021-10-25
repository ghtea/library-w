import palette from "./palette";


export enum ColorKey {

  "bg" = "background",
  "text" = "text",

  "primary" = "primary",
  "primary-partner" = "primary-partner",

  // "secondary" = "secondary",
  // "secondary-partner" = "secondary-partner",
  
  "bg.weak" = "bg-weak",
  "text.strong" = "text-strong",
  "text.weak" = "text-weak",
  "text.alternative" = "text-alternative",

  //
  "image.placeholder.bg" = "image-placeholder-bg",

  //
  "badge.rating.the-best.bg" = "badge-the-best-bg",
  "badge.rating.top-10.bg" = "badge-top-10-bg",
  "badge.rating.top-50.bg" = "badge-top-50-bg",
  "badge.rating.top-100.bg" = "badge-top-100-bg",
  "badge.rating.top-200.bg" = "badge-top-200-bg",
  "badge.rating.top-500.bg" = "badge-top-500-bg",
  "badge.rating.text" = "badge-rating-text",

  //
  "card.bg" = "card-bg",
  
  //
  "modal.bg" = "modal-bg",
  "modal.border" = "modal-border",
  "modal.header.bg" = "modal-header-bg",
  "modal.shadow.bg" = "modal-shadow-bg",

  //
  "chip.default.bg" = "chip-bg-default",
  "chip.default.border" = "chip-bg-border",

  "nav-bar.bg" = "nav-bar-bg",
  "nav-bar.border" = "nav-bar-border",
  "tool-bar.bg" = "tool-bar-bg",
  "tool-bar.border" = "tool-bar-border",

  "search-section.border" = "search-section-border",
  "search-section.icon" = "search-section-icon",
  "search-section.bg" = "search-section-bg",
  "search-section.focus.border" = "search-section-focus-border",
  "search-section.focus.icon" = "search-section-focus-icon",
  // "@#F3F4F6" = "F3F4F6",
}

type Colors = Record<ColorKey, typeof palette[keyof (typeof palette)] | "transparent">;

export const colors: Colors = {

  [ColorKey.bg] : palette["white"],
  [ColorKey.text]: palette["gray-700"],

  [ColorKey.primary]: palette["blue-500"],
  [ColorKey["primary-partner"]]: palette["white"],
  // [ColorKey.secondary]: "#1997F0",

  [ColorKey["bg.weak"]]: palette["gray-100"],
  [ColorKey["text.strong"]]: palette["gray-900"],
  [ColorKey["text.weak"]]: palette["gray-500"],
  [ColorKey["text.alternative"]]: palette["white"],

  //
  [ColorKey["image.placeholder.bg"]]: palette["gray-100"],

  //
  [ColorKey["badge.rating.the-best.bg"]]: palette["rose-700"],
  [ColorKey["badge.rating.top-10.bg"]]: palette["fuchsia-700"],
  [ColorKey["badge.rating.top-50.bg"]]: palette["violet-700"],
  [ColorKey["badge.rating.top-100.bg"]]: palette["blue-700"],
  [ColorKey["badge.rating.top-200.bg"]]: palette["green-700"],
  [ColorKey["badge.rating.top-500.bg"]]: palette["gray-700"],

  [ColorKey["badge.rating.text"]]: palette["gray-50"],

  [ColorKey["card.bg"]] : "transparent",

  [ColorKey["modal.bg"]] : palette["white"],
  [ColorKey["modal.border"]] : palette["gray-200"],
  [ColorKey["modal.header.bg"]] : palette["gray-50"],
  [ColorKey["modal.shadow.bg"]] : palette["gray-500-50%"],

  [ColorKey["chip.default.bg"]]: palette["white"],
  [ColorKey["chip.default.border"]]: palette["gray-200"],

  [ColorKey["nav-bar.bg"]]: palette["gray-50"],
  [ColorKey["nav-bar.border"]]: palette["gray-200"],
  [ColorKey["tool-bar.bg"]]: palette["gray-50-95%"],
  [ColorKey["tool-bar.border"]]: palette["gray-200"],

  [ColorKey["search-section.border"]]: palette["gray-300"],
  [ColorKey["search-section.icon"]]: palette["gray-400"],
  [ColorKey["search-section.bg"]]: palette["white-95%"],
  [ColorKey["search-section.focus.border"]]: palette["blue-500"],
  [ColorKey["search-section.focus.icon"]]: palette["blue-600"],

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