// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brandBlue: {
      100: "#40768C",
      500: "#264653",
      900: "#13242A",
    },
    brandGreen: {
      100: "#4ED0C1",
      500: "#2a9d8f",
      900: "#1E7167",
    },
    brandYellow: {
      100: "#F4E3B8",
      500: "#e9c46a",
      900: "#DFAC2A",
    },
    brandOrange: {
      100: "#FAD3B3",
      500: "#f4a261",
      900: "#EF7A1A",
    },
    brandRed: {
      100: "#F3B5A5",
      500: "#e76f51",
      900: "#C53D1B",
    },
  },
});
