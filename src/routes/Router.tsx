import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "../components/AppBar";
import Login from "./Login";
import EditProducts from "./EditProducts";
import HomePage from "./Home";
import Products from "./Products";
import Upload from "./Upload";

const Router = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Container sx={{ mt: 10, textAlign: "center" }} maxWidth="lg">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ponuka" element={<Products />} />
          <Route path="/kontakt" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editProducts" element={<EditProducts />} />
          <Route path="/newProduct" element={<Upload />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
