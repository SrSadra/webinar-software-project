import React from "react";

import "./ProductsSidebar.css";
import config from "../../config.json";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import useData from "../../hooks/useData";

const ProductsSidebar = () => {
  const { data: categories, error } = useData(
    "/category/sidebar-categories",
    null,
    ["categories"],
    24 * 60 * 60 * 1000
  );

  console.log("categories",categories);

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>

      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category.id}
              id={category.id}
              title={category.title}
              link={`/products?category=${category.title}`}
              // emoji={`${config.backendURL}/category/${category.image}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
