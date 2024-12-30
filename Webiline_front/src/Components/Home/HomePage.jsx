import React from "react";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import HeroSection from "./HeroSection";
import FeaturedProduct from "./FeaturedProduct";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy this bullshit"
        subtitle="Pay and put your money in the trash can because of this random bullshit"
        link="/"
        image={iphone}
      ></HeroSection>
      <FeaturedProduct></FeaturedProduct>
      <HeroSection
        title="Build any bullshit you want"
        subtitle="You can just do whatever other phones does, nothing special here"
        link="/"
        image={mac}
      ></HeroSection>
    </div>
  );
};

export default HomePage;
