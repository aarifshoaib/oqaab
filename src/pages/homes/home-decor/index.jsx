import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/homes/decor/Banner";
import Collections from "@/components/homes/decor/Collections";
import Hero from "@/components/homes/decor/Hero";
import ListCollections from "@/components/homes/decor/ListCollections";
import LookBook from "@/components/homes/decor/LookBook";
import Products from "@/components/homes/decor/Products";
import Products2 from "@/components/common/Products6";
import Testimonials from "@/components/homes/decor/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Decor || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeDecorPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 fullWidth />
      <Hero />
      <Collections />
      <ListCollections />
      <Products />
      <LookBook />
      <Products2 />
      <Testimonials />
      <Features parentClass="flat-spacing line-top-container" />
      <Banner />
      <Footer1 />
    </>
  );
}
