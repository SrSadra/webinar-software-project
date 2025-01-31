<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useCallback, useEffect, useReducer, useState } from "react";
>>>>>>> master
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext";
import "./App.css";
<<<<<<< HEAD
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, getCartAPI } from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
=======
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
>>>>>>> master

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
<<<<<<< HEAD
  const [cart, setCart] = useState([]);
=======
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
>>>>>>> master

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

<<<<<<< HEAD
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );

    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added Succesfully!");
        // toast.error("Product Added Succesfully!");
        // toast.warning("Product Added Succesfully!");
        // toast.info("Product Added Succesfully!");
        // toast("Product Added Succesfully!");
      })
      .catch((err) => {
        toast.error("Failed to add product");
        setCart(cart);
      });
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Oops! Something went wrong!");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length}></Navbar>
      <main>
        <ToastContainer position="top-left"></ToastContainer>
        <Routing addToCart={addToCart} cart={cart}></Routing>
      </main>
    </div>
=======
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
>>>>>>> master
  );
};

export default App;
