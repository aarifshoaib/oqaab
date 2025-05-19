import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import BannerTab from "@/components/common/BannerTab";
import Collections from "@/components/homes/fashion-main/Collections";
import Collections2 from "@/components/homes/fashion-main/Collections2";
import Hero from "@/components/homes/fashion-main/Hero";
import Products from "@/components/common/Products";
import ShopGram from "@/components/common/ShopGram2";
import Testimonials from "@/components/homes/fashion-main/Testimonials";
import React from "react";
import Features2 from "@/components/common/Features2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Main || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionMainPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <Hero />
      <Collections />
      <BannerTab />
      <Products />
      <Collections2 />
      <Features2 />
      <Testimonials />
      <ShopGram />
      <Footer1 />
    </>
  );
}
