import Features from "@/components/common/Features";
import Testimonials3 from "@/components/common/Testimonials3";
import Footer1 from "@/components/footers/Footer1";
import Header10 from "@/components/headers/Header10";
import Topbar3 from "@/components/headers/Topbar3";
import Blogs from "@/components/homes/jewelry-01/Blogs";
import Categories from "@/components/homes/jewelry-01/Categories";
import Collections from "@/components/homes/jewelry-01/Collections";
import Hero from "@/components/homes/jewelry-01/Hero";
import Products4 from "@/components/homes/jewelry-01/Products";
import Products2 from "@/components/homes/jewelry-01/Products2";
import Shopgram from "@/components/homes/jewelry-01/Shopgram";
import Tiktok from "@/components/homes/jewelry-01/Tiktok";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Jewelry 01 || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeJeweleryPage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar3 />
      <Header10 />
      <Hero />
      <Tiktok parentClass="flat-spacing" />
      <Categories />
      <Products4 parentClass="flat-spacing pt-0" />
      <Collections />
      <Products2 parentClass="flat-spacing pt-0" />
      <Testimonials3 />
      <Blogs />
      <Features parentClass="flat-spacing pt-0" />
      <Shopgram />
      <Footer1 />
    </>
  );
}
