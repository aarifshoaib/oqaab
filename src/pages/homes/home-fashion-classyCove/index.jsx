import Features from "@/components/common/Features";
import Products3 from "@/components/common/Products3";
import ShopGram from "@/components/common/ShopGram2";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Topbar3 from "@/components/headers/Topbar3";
import Blogs from "@/components/homes/fashion-classyCove/Blogs";
import Categories from "@/components/homes/fashion-classyCove/Categories";
import Collections from "@/components/homes/fashion-classyCove/Collections";
import Hero from "@/components/homes/fashion-classyCove/Hero";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Classycove || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionClassyCovePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar3 />
      <Header3 />
      <Hero />
      <Collections />
      <Products3 parentClass="flat-spacing" />
      <Categories />
      <Testimonials />
      <Blogs />
      <Features parentClass="flat-spacing line-top-container" />
      <ShopGram />
      <Footer1 dark />
    </>
  );
}
