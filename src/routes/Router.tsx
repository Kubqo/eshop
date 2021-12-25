import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "../components/AppBar";
import Login from "./Login";
import EditProducts from "./EditProducts";
import HomePage from "./Home";
import Products from "./Products";
import Upload from "./Upload";
import Contact from "./Contact";

const Router = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ponuka" element={<Products />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editProducts" element={<EditProducts />} />
        <Route path="/newProduct" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
