import commonColors from "./colors/commonColors";

export const background = {
  ...commonColors,
};

export const breakpoints = [
  // // "0rem", //     0 ≥ screen < 600px  | sm | mobile
  "600px", // "37.5rem", // 600px ≥ screen < 960px  | md | tablet
  "960px", // "60rem", //   960px ≥ screen < 1440px | lg | wide tablet/small desktop
  "1440px", // "90rem", //  1440px ≥ screen          | xl | wide desktop
];

export const space = [
  0, // 0
  8, // 1
  16, // 2
  24, // 3
  32, // 4
  40, // 5
  48, // 6
  56, // 7
  64, // 8
  72, // 9
  80, // 10
  88, // 11
  96, // 12
  104, // 13
  112, // 14
  120, // 15
  128, // 16
  136, // 17
  144, // 18
  152, // 19
  160, // 20
  168, // 21
  176, // 22
  184, // 23
  192, // 24
  200, // 25
  208, // 26
  216, // 27
  224, // 28
  232, // 29
  240, // 30
  248, // 31
  256, // 32
];


// zIndex
/*
NavBar
*/

export const zIndex = {
  navBar: 300,
}