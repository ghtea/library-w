import {breakpoints, BreakpointsSize} from "./breakpoints";
import {buttons} from "./buttons";
import {ColorKey,colors} from "./colors";
import {forms} from "./forms";
import {sizes} from "./sizes";
import {space} from "./space";
import {text} from "./text";
import {zIndex} from "./z-index";

export {breakpoints, buttons, colors, forms, sizes, space, text, zIndex};
export {BreakpointsSize, ColorKey};

export const theme = {
  breakpoints: breakpoints,
  background: {},
  colors: colors,

  space: space,
  fontSizes: {
    h1: "2.25rem", // 36 px
    h2: "1.875rem", // 30 px
    h3: "1.625rem", // 26 px
    h4: "1.375rem", // 22 px
    h5: "1.25rem", // 20 px
    s1: "1.125rem", // 18 px
    s2: "1rem", // 16 px
    p1: "0.875rem", // 14 px
    p2: "0.75rem", // 12 px
    l1: "0.75rem", // 12 px
  },
  fonts: {
    headline: "Noto Sans KR, sans-serif",
    subtitle: "Noto Sans KR, sans-serif",
    paragraph: "Noto Sans KR, sans-serif",
    label: "Noto Sans KR, sans-serif",
  },
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  lineHeights: {
    headline: 1.5,
    subtitle: 1.5,
    paragraph: 1.5,
    label: 1.5,
  },
  letterSpacings: {
    headline: "normal",
    subtitle: "normal",
    paragraph: "normal",
    label: "normal",
  },
  fontStyle: {
    headline: "normal",
    subtitle: "normal",
    paragraph: "normal",
    label: "normal",
  },
  text: text,
  buttons: buttons,
  forms: forms,
  radii: {
    default: 4,
  },
  variants: {
    // card: {
    //   bg: "white",
    //   border: "card",
    //   borderRadius: "default",
    //   boxShadow: "card",
    //   warning: {
    //     bg: "warning",
    //     border: "card",
    //     borderRadius: "default",
    //     boxShadow: "card",
    //   },
    // },
  },
  shadows: {
    // button: "0 1px 1px 0 #161d250c, inset 0 2px 0 0 #ffffff0c",
    // buttonHover: "0 1px 1px 0 rgba(22,29,37,.06), inset 0 -70px 30px -50px rgba(22,29,37,.05), inset 0 2px 0 0 hsla(0,0%,100%,.04)",
    // buttonFlat: "",
    // buttonFlatHover: "0 1px 1px 0 rgba(22,29,37,.03), inset 0 -70px 30px -50px rgba(22,29,37,.025), inset 0 2px 0 0 hsla(0,0%,100%,.020)",
    // card: "0 1px 3px 0 #0000000a",
    // inputButton: "0 1px 2px 0 rgba(0, 0, 0, 0.08)",
    // box: "0 1px 3px 0 rgba(0, 0, 0, 0.04)",
  },
  borders: {
    //default: `1px solid ${colors["gray-100"]}`,
    // buttonHover: "1px solid rgba(0, 0, 0, 0.3)",
    // buttonFlatHover: "1px solid rgba(0, 0, 0, 0.05)",
    // card: `solid 1px ${colors["cool-gray-300"]}`,
    // table: `solid 1px ${colors["cool-gray-300"]}`,
    // inputButton: "solid 1px #D8DCE6",
    // flexMore: `solid 1px ${colors["cool-gray-300"]}`,
    // redBadge: `solid 1px ${colors["red-300"]}`,
  },
  sizes: {
    
    ...sizes,
    // modal: {
    //   width: {
    //     small: "440px",
    //     medium: "540px",
    //     big: "640px",
    //   },
    //   height: {
    //     xsmall: "256px",
    //     small: "440px",
    //     medium: "600px",
    //     big: "800px",
    //   },
    // },
  },
  borderWidths: {},
  borderStyles: {},
  zIndices: {},
  transitions: {},
  styles: {
    pre : {
      "body": {
        margin: "0 !important",
        padding: "0 !important",
      }
    },
  },
};

export default theme;
