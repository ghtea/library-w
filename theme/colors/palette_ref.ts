// https://tailwindcss.com/docs/customizing-colors

export enum PaletteKey {

  "white"= "white",
  "black"= "black",

  "gray-50"= "gray-50",
  "gray-100"= "gray-100",
  "gray-200"= "gray-200",
  "gray-300"= "gray-300",
  "gray-400"= "gray-400",
  "gray-500"= "gray-500",
  "gray-600"= "gray-600",
  "gray-700"= "gray-700",
  "gray-800"= "gray-800",
  "gray-900"= "gray-900",

};

const palette = {

  [PaletteKey.white]: "#ffffff" as const,
  [PaletteKey.black]: "#000000" as const,

  [PaletteKey["gray-50"]]: "#FAFAFA" as const,
  [PaletteKey["gray-100"]]: "#F4F4F5" as const,
  [PaletteKey["gray-200"]]: "#E4E4E7" as const,
  [PaletteKey["gray-300"]]: "#D4D4D8" as const,
  [PaletteKey["gray-400"]]: "#A1A1AA" as const,
  [PaletteKey["gray-500"]]: "#71717A" as const,
  [PaletteKey["gray-600"]]: "#52525B" as const,
  [PaletteKey["gray-700"]]: "#3F3F46" as const,
  [PaletteKey["gray-800"]]: "#27272A" as const,
  [PaletteKey["gray-900"]]: "#18181B" as const,

};

export default palette;