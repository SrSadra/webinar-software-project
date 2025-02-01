import React, { memo, useContext, useMemo } from "react";

import UserContext from "../../contexts/UserContext";
import "./CartPage.css";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const CartPage = () => {
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart } = useContext(CartContext);
  const queryClient = useQueryClient();

  const subTotal = useMemo(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  }, [cart]);

  const checkout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      userId: user._id,
      products: cart.map(({ product, quantity }) => ({
        productId: product._id,
        quantity,
      })),
      total: subTotal + 5, // Including shipping charge
    };

    checkoutAPI(orderData)
      .then(() => {
        queryClient.invalidateQueries(["cart"]);
        toast.success("Order placed successfully!");
      })
      .catch((error) => {
        console.error("Checkout Error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`https://cartwish-backend-29v7.onrender.com/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Participants", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                {/* <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product.id}
                />
                  productId={product._id}
                /> */}
                <p>1 Participant</p>
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default memo(CartPage);
