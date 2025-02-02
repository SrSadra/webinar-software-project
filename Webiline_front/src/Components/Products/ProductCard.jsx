import React, { memo, useContext, useState } from "react";
import "./ProductCard.css";
import config from "../../config.json";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import useUpdateProduct from "../../hooks/useUpdateProduct"; // ✅ Import mutation hook

const ProductCard = ({ product }) => {
  // const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const updateProduct = useUpdateProduct(); // ✅ Initialize update function
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: product.englishTitle,
    price: product.price,
    stock: product.stock,
  });

  const handleUpdate = () => {
    updateProduct.mutate(
      { id: product.id, updatedData: updatedProduct },
      {
        onSuccess: () => {
          setIsEditing(false); // ✅ Close edit mode after updating
        },
      }
    );
  };

  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product?.slug}`}>
          <img
            src={`${product.image}`}
            alt="product image"
          />
        </NavLink>
      </div>

      <div className="product_details">
        {isEditing ? (
          <div className="edit_form">
            <input
              type="text"
              value={updatedProduct.title}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, title: e.target.value })
              }
            />
            <input
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: Number(e.target.value),
                })
              }
            />
            <input
              type="number"
              value={updatedProduct.stock}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  stock: Number(e.target.value),
                })
              }
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <p className="product_title">{product?.englishTitle}</p>
            <h3 className="product_price">${product?.price}</h3>

            <footer className="align_center product_info_footer">
              <div className="align_center">
                <p className="align_center product_description">
                    {product?.description}
                </p>
                <p className="product_review_count">
                  {/* {product?.reviews.counts} tmp */  }
                </p>
              </div>

              {product?.stock > 0 && user && (
                <button
                  className="add_to_cart"
                  onClick={() => addToCart(product, 1)}
                >
                  <img src={basket} alt="basket button" />
                </button>
              )}
            </footer>

            {/* ✅ Show "Edit" button only for managers */}
            {user?.role !== "user" || user?.role !== "doctor" && (
              <button
                className="edit_button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default memo(ProductCard);
