import { createTheme } from "@mui/material";

const palette = {
  primary: { main: "#23282d", light: "#ffffff" },
  secondary: { main: "#ffc742" },
  mode: "light",
} as const;

const theme = createTheme({
  palette,
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: palette.primary.light,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.primary.light,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "inherit",
          textDecoration: "inherit",
          cursor: "pointer",
          ":hover": {
            color: "white",
            backgroundColor: palette.primary.main,
            "& .MuiListItemIcon-root": {
              color: "white",
            },
          },
        },
      },
    },
  },
});

export default theme;
