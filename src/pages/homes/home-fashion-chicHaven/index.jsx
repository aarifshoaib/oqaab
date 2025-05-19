import Brands from "@/components/common/Brands";
import Features from "@/components/common/Features";
import Products2 from "@/components/common/Products2";
import Products4 from "@/components/common/Products4";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import Collections from "@/components/homes/fashion-chicHaven/Collections";
import Hero from "@/components/homes/fashion-chicHaven/Hero";
import MarqueeSection from "@/components/common/MarqueeSection";
import SingleProduct from "@/components/homes/fashion-chicHaven/SingleProduct";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Chichaven || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionChicHavenPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header4 />
      <Hero />
      <Collections />
      <Products4 parentClass="flat-spacing" />
      <MarqueeSection />
      <SingleProduct />
      <Products2 title="Top Trending" parentClass="flat-spacing" />
      <Features parentClass="flat-spacing pt-0 line-bottom-container" />
      <Testimonials />
      <ShopGram parentClass="flat-spacing pt-0" />

      <Brands parentClass="flat-spacing-5 line-top mt--5" />
      <Footer1 dark />
    </>
  );
}
