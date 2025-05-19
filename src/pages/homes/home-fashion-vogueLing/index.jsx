import BannerTab from "@/components/common/BannerTab";
import Features from "@/components/common/Features";
import MarqueeSection from "@/components/common/MarqueeSection";
import MarqueeSection2 from "@/components/common/MarqueeSection2";
import Products from "@/components/common/Products";
import ShopGram from "@/components/common/ShopGram2";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Hero from "@/components/homes/fashion-vogueLing/Hero";
import Lookbook from "@/components/homes/fashion-vogueLing/Lookbook";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Vogueling || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionVoguelingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 fullWidth />
      <Hero />
      <MarqueeSection2 parentClass="tf-marquee py_23" />

      <Products parentClass={"flat-spacing"} />
      <BannerTab parentClass="flat-spacing pt-0 pb-0" />
      <Lookbook />
      <div className="line-top-container"></div>
      <Features />
      <Testimonials parentClass="flat-spacing pt-0" />
      <ShopGram />
      <Footer1 />
    </>
  );
}
