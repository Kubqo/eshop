import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#F7F9FB", light: "#687864" },
    secondary: { main: "#5085A5", dark: "#31708E", light: "#8FC1E3" },
    mode: "light",
  },
  typography: {
    fontFamily: `Mulish Regular`,
    h1: {
      fontFamily: `Mulish SemiBold`,
      fontSize: 48,
    },
    h2: {
      fontFamily: `Mulish Bold`,
      fontSize: 39,
    },
    h3: {
      fontFamily: `Mulish Bold`,
      fontSize: 31,
    },
    h4: {
      fontFamily: `Mulish Bold`,
      fontSize: 25,
    },
    h5: {
      fontFamily: `Mulish SemiBold`,
      fontSize: 20,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
  },
});

export default theme;
