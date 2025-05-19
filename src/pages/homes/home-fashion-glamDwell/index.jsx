import Features from "@/components/common/Features";
import Products3 from "@/components/common/Products3";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar4 from "@/components/headers/Topbar4";
import Collections from "@/components/homes/fashion-glamDwell/Collections";
import Hero from "@/components/homes/fashion-glamDwell/Hero";
import Lookbook from "@/components/homes/fashion-glamDwell/Lookbook";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Features2 from "@/components/common/Features2";
const metadata = {
  title:
    "Home Fashion Glamdwell || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionGlamdwellPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 />
      <Header1 />
      <Hero />
      <Collections />
      <Products3 parentClass="flat-spacing pt-0" />
      <Lookbook />
      <Testimonials parentClass="" />
      <Features2 parentClass="flat-spacing" />
      <div className="line-bottom-container"></div>
      <ShopGram parentClass="flat-spacing" />
      <Footer1 />
    </>
  );
}
