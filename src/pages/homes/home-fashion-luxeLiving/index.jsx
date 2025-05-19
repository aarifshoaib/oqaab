import Features from "@/components/common/Features";
import Products2 from "@/components/common/Products2";
import Products4 from "@/components/common/Products4";

import ShopGram3 from "@/components/common/ShopGram3";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import BannerCollections from "@/components/homes/fashion-luxeLiving/BannerCollections";
import Categories from "@/components/homes/fashion-luxeLiving/Categories";
import Hero from "@/components/homes/fashion-luxeLiving/Hero";
import LookBook from "@/components/homes/fashion-luxeLiving/LookBook";
import Testimonials from "@/components/homes/fashion-luxeLiving/Testimonials";
import MarqueeSection from "@/components/common/MarqueeSection2";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Luxeliving || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFasionLuxelivingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 fullWidth />
      <Hero />
      <Products4 parentClass="flat-spacing" />
      <MarqueeSection />
      <Categories />
      <LookBook />
      <Products2 title="Top Trending" parentClass="flat-spacing" />
      <Testimonials />
      <BannerCollections />
      <Features parentClass="flat-spacing" />
      <ShopGram3 />
      <Footer1 border={false} />
    </>
  );
}
