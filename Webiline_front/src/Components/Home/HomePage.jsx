import React from "react";

import mainPic from "../../assets/webinarMain.png";
import participate from "../../assets/participateMain.png";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Webiline Learning Online"
        subtitle="Experience the new methods in learning with the help of technology and online courses"
        link="/product/646e255f928653e4d401da34"
        image={mainPic}
      />

      <FeaturedProducts />

      <HeroSection
        title="Participate Now!"
        subtitle="Explore in Webiline to find your favourite course"
        link="/product/646e255f928653e4d401da3c"
        image={participate}
      />
    </div>
  );
};

export default HomePage;
