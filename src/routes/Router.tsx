import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "../components/AppBar";
import HomePage from "./Home";
import LoginPage from "./Login";
import Products from "./Products";

const Router = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Container sx={{ mt: 10, textAlign: "center" }} maxWidth="lg">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ponuka" element={<Products />} />
          <Route path="/kontakt" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
