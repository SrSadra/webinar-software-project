import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "./contexts/CartContext";
import cartReducer from "./reducers/cartReducer";
import useData from "./hooks/useData";
import useAddToCart from "./hooks/cart/useAddToCart";
import useRemoveFromCart from "./hooks/cart/useRemoveFromCart";
import useUpdateCart from "./hooks/cart/useUpdateCart";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const { data: cartData, refetch } = useData("/cart", null, ["cart"]);

  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartMutation = useUpdateCart();

  useEffect(() => {
    if (cartData) {
      dispatchCart({ type: "GET_CART", payload: { products: cartData } });
    }
  }, [cartData]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
      dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } });

      addToCartMutation.mutate(
        { id: product._id, quantity: quantity },
        {
          onError: (error) => {
            toast.error("Something went wrong!");
            dispatchCart({ type: "REVERT_CART", payload: { cart } });
          },
        }
      );
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (id) => {
      dispatchCart({ type: "REMOVE_FROM_CART", payload: { id } });

      removeFromCartMutation.mutate(
        { id },
        {
          onError: () => {
            toast.error("Something went wrong!");
            dispatchCart({ type: "REVERT_CART", payload: { cart } });
          },
        }
      );
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, id) => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );

      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
      }

      dispatchCart({ type: "GET_CART", payload: { products: updatedCart } });

      updateCartMutation.mutate(
        { id, type },
        {
          onError: () => {
            toast.error("Something went wrong!");
            dispatchCart({ type: "REVERT_CART", payload: { cart } });
          },
        }
      );
    },
    [cart]
  );

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          updateCart,
        }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
