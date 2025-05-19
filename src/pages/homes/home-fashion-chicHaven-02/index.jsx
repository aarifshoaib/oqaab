import Features from "@/components/common/Features";
import MarqueeSection from "@/components/common/MarqueeSection";
import Products2 from "@/components/common/Products2";
import ShopGram from "@/components/common/ShopGram2";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import Topbar5 from "@/components/headers/Topbar5";
import Banner from "@/components/homes/fashion-chicHaven-02/Banner";
import Categories from "@/components/homes/fashion-chicHaven-02/Categories";
import Hero from "@/components/homes/fashion-chicHaven-02/Hero";
import Products from "@/components/homes/fashion-chicHaven-02/Products";
import SingleProduct from "@/components/homes/fashion-chicHaven-02/SingleProduct";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Chichaven 02 || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionChicHavenPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar5 />
      <Header5 />
      <Hero />
      <Products />
      <MarqueeSection />
      <Categories />
      <Products2 title="week’s highlights" parentClass="flat-spacing" />
      <SingleProduct />
      <Testimonials />
      <Banner />
      <Features parentClass="flat-spacing" />
      <ShopGram />
      <Footer1 />
    </>
  );
}
