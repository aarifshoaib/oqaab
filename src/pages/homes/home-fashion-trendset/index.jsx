import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Banner from "@/components/homes/fashion-trendset/Banner";
import Blogs from "@/components/homes/fashion-trendset/Blogs";
import Collectons from "@/components/homes/fashion-trendset/Collectons";
import Hero from "@/components/homes/fashion-trendset/Hero";
import Products from "@/components/homes/fashion-trendset/Products";
import Products2 from "@/components/homes/fashion-trendset/Products2";
import Testimonials from "@/components/homes/fashion-trendset/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Trendset || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionTrendsetPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <Topbar2 />
      <Hero />
      <Products />
      <Banner />
      <Products2 parentClass="flat-spacing" />
      <Collectons />
      <Testimonials />
      <Blogs />
      <Features />
      <ShopGram />
      <Footer1 />
    </>
  );
}
