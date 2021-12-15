import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Router from "./routes/Router";
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router />
    </ThemeProvider>
  );
}

export default App;
