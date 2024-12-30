import React from "react";

import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import LinkWithIcon from "./LinkWithIcon";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading" link="/" title="webiline">
          Webiline
        </h1>
        <form className="align_center navbar_form">
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Webinars ..."
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket}></LinkWithIcon>
        <LinkWithIcon
          title="Products"
          link="/products"
          emoji={star}
        ></LinkWithIcon>
        <LinkWithIcon
          title="LogIn"
          link="/login"
          emoji={idButton}
        ></LinkWithIcon>
        <LinkWithIcon title="SignUp" link="/signup" emoji={memo}></LinkWithIcon>
        <LinkWithIcon
          title="My Orders"
          link="/myorders"
          emoji={order}
        ></LinkWithIcon>
        <LinkWithIcon title="Logout" link="/logout" emoji={lock}></LinkWithIcon>
        <NavLink to="/cart" className="align_center">
          Cart <p className="align_center cart_counts">0</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
