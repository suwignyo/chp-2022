import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import "@fontsource/the-nautigal";

const fonts = { body: "Raleway", heading: "Merriweather" };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    cream: "#E9DCCD",
    burgundy: "#613A43",
    petal: "#E3BAB3",
  },
  fonts,
  breakpoints,
});

export default theme;
