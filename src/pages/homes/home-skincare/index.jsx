import Categories from "@/components/common/Categories";
import Features from "@/components/common/Features";
import MarqueeSection2 from "@/components/common/MarqueeSection2";
import Products5 from "@/components/common/Products5";
import Tiktok from "@/components/common/Tiktok";
import Footer1 from "@/components/footers/Footer1";
import Header9 from "@/components/headers/Header9";
import Topbar4 from "@/components/headers/Topbar4";
import Hero from "@/components/homes/skincare/Hero";
import Lookbook from "@/components/homes/skincare/Lookbook";
import ShopGram from "@/components/homes/skincare/ShopGram";
import SingleProduct from "@/components/homes/skincare/SingleProduct";
import SkinBeforeAfter from "@/components/homes/skincare/SkinBeforeAfter";
import Testimonials from "@/components/common/Testimonials2";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Skillcare || OQAAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeSkincarePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 />
      <Header9 />
      <Hero />

      <Tiktok parentClass="flat-spacing" />
      <Categories />
      <MarqueeSection2 />
      <Products5 />
      <Lookbook />
      <Testimonials />
      <SkinBeforeAfter />
      <SingleProduct />
      <Features />
      <ShopGram parentClass="flat-spacing pt-0" />
      <Footer1 />
    </>
  );
}
