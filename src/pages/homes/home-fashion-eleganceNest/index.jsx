import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/homes/eleganceNest/Banner";
import Categories from "@/components/homes/eleganceNest/Categories";
import Collections from "@/components/homes/eleganceNest/Collections";
import Hero from "@/components/homes/eleganceNest/Hero";
import Products from "@/components/common/Products4";
import Products2 from "@/components/common/Products2";
import Products7 from "@/components/products/Products7";
import React from "react";
import CartTogglerSide from "@/components/common/CartTogglerSide";
import MarqueeSection2 from "@/components/common/MarqueeSection2";

import MetaComponent from "@/components/common/MetaComponent";
import Testimonials3 from "@/components/common/Testimonials3";
const metadata = {
  title:
    "Home Fashion Elegancenest || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionElegentNestPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <Hero />
      <MarqueeSection2 />
      {/* <Categories /> */}
      <Products />
      <Collections />
      <Products2 parentClass="flat-spacing pt-0" /> 
      <Banner />
      <Features />
      <Testimonials3 parentClass="" />
      {/* <ShopGram parentClass="flat-spacing" /> */}
      <Footer1 />
      <CartTogglerSide /> 
    </>
  );
}
