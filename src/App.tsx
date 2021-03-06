import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Router from "./routes/Router";
import theme from "./utils/theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./hooks/cartContext";

import "./app.css";

const App = () => {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </ThemeProvider>
    </CartProvider>
  );
};

export default App;
