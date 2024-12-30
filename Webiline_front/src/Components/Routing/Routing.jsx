import React from "react";

import { Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/products" element={<ProductsPage></ProductsPage>}></Route>
      <Route
        path="/products/1"
        element={<SingleProductPage></SingleProductPage>}
      ></Route>
      <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/cart" element={<CartPage></CartPage>}></Route>
      <Route path="/myorders" element={<MyOrderPage></MyOrderPage>}></Route>
    </Routes>
  );
};

export default Routing;
