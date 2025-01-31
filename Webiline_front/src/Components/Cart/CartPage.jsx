<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import React, { memo, useContext, useMemo } from "react";
>>>>>>> master

import UserContext from "../../contexts/UserContext";
import "./CartPage.css";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

<<<<<<< HEAD
const CartPage = ({ cart }) => {
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantitiy;
    });
  }, [cart]);

=======
const CartPage = () => {
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  const subTotal = useMemo(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Order placed successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
  };

>>>>>>> master
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`http://localhost:10000/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
<<<<<<< HEAD
          {cart.map(({ product, quantitiy }) => (
=======
          {cart.map(({ product, quantity }) => (
>>>>>>> master
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
<<<<<<< HEAD
                  quantity={quantitiy}
                  stock={product.stock}
                ></QuantityInput>
              </td>
              <td>${quantitiy * product.price}</td>
=======
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
>>>>>>> master
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
<<<<<<< HEAD
=======
                  onClick={() => removeFromCart(product._id)}
>>>>>>> master
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
