import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import Collections from "@/components/homes/fashion-modernRetreat/Collections";
import Hero from "@/components/homes/fashion-modernRetreat/Hero";
import Lookbook from "@/components/homes/fashion-modernRetreat/Lookbook";
import Products from "@/components/homes/fashion-modernRetreat/Products";
import Products2 from "@/components/homes/fashion-modernRetreat/Products2";
import MarqueeSection from "@/components/common/MarqueeSection2";
import React from "react";
import Features from "../../../components/common/Features2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Modern Retreate || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionModernRetreatPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header7 />
      <Hero />
      <Products />
      <Lookbook />
      <Products2 />
      <Testimonials parentClass="flat-spacing pt-0" />
      <Collections />
      <Features />
      <MarqueeSection />
      <Footer1 dark />
    </>
  );
}
