import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import Logout from "../Authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";

<<<<<<< HEAD
const Routing = ({ addToCart, cart }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/products" element={<ProductsPage></ProductsPage>}></Route>
      <Route
        path="/products/:id"
        element={<SingleProductPage addToCart={addToCart}></SingleProductPage>}
      ></Route>
      <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/cart" element={<CartPage cart={cart}></CartPage>}></Route>
      <Route path="/myorders" element={<MyOrderPage></MyOrderPage>}></Route>
      <Route path="/logout" element={<Logout></Logout>}></Route>
    </Routes>
  );
=======
const Routing = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/product/:id' element={<SingleProductPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path='/cart' element={<CartPage />} />
                <Route path='/myorders' element={<MyOrderPage />} />
                <Route path='/logout' element={<Logout />} />
            </Route>
        </Routes>
    );
>>>>>>> master
};

export default Routing;
