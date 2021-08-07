export enum BreakpointsSize {
    SM = "sm",
    MD = "md",
    LG = "lg",
    XL = "xl",
}
  
export const breakpoints = [
  // // "0rem", //     0 ≥ screen < 600px  | sm | mobile
  "600px", // "37.5rem", // 600px ≥ screen < 960px  | md | tablet
  "960px", // "60rem", //   960px ≥ screen < 1440px | lg | wide tablet/small desktop
  "1440px", // "90rem", //  1440px ≥ screen          | xl | wide desktop
];