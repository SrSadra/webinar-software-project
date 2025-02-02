import React, { memo, useContext } from "react";
import "./SingleProductPage.css";
import { useParams, useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import Loader from "./../Common/Loader";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const SingleProductPage = () => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { slug } = useParams();

  const {
    data: product,
    error,
    isLoading,
  } = useData(`/webinar/${slug}`, null, ["products", slug]);

  if (isLoading) return <Loader />;
  if (error) return <em className="form_error">{error}</em>;
  if (!product || !product.webinar) return <p>Webinar not found</p>;

  const webinar = product.webinar;
  const episodes = product.episodes || [];
  console.log("epi", episodes);

  const discountedPrice = webinar.discountPercent
    ? webinar.price - (webinar.price * webinar.discountPercent) / 100
    : webinar.price;

  const userHasWebinar = user?.webinars?.some((w) => w.id === webinar.id);

  return (
    <section className="single_product">
      <div className="webinar_content">
        <div className="align_center">
          <img
            src={webinar.image}
            alt={webinar.englishTitle}
            className="single_product_display"
          />
        </div>

        <div className="single_product_details">
          <h1 className="single_product_title">{webinar.englishTitle}</h1>
          <p className="single_product_description">{webinar.description}</p>

          <div className="price_section">
            <p className="single_product_price">${webinar.price}</p>
            {webinar.discountPercent > 0 && (
              <>
                <span className="discount_badge">{webinar.discountPercent}% OFF</span>
                <p className="discounted_price">${discountedPrice.toFixed(2)}</p>
              </>
            )}
          </div>

          {webinar.onlyDoctor && (
            <div className="doctor_only">
              <strong>Only for Doctors</strong>
            </div>
          )}

          {user && (
            <>
              {userHasWebinar ? (
                <button
                  className="go_webinar"
                  onClick={() => navigate(`/dashboard/webinars/${webinar.id}`)}
                >
                  Go to Webinar!
                </button>
              ) : (
                <button
                  className="add_cart"
                  id="add_to_cart"
                  onClick={() => addToCart(product, 1)}
                  disabled={webinar.onlyDoctor && !user.isDoctor}
                >
                  Add to Cart
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Episodes Section Below */}
      {episodes.length > 0 && (
        <div className="episodes_section">
          <h2 className="episodes_title">Episodes</h2>
          <div className="episodes_container">
            {episodes.map((episode) => (
              <div key={episode.id} className="episode_card">
                <h3 className="episode_title">{episode.title}</h3>
                <div className="episode_times">
                  <p className="episode_time">Start: {episode.startTime}</p>
                  <p className="episode_time">End: {episode.endTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(SingleProductPage);
