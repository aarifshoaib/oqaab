import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import BannerCountdown from "@/components/homes/organic/BannerCountdown";
import Collections from "@/components/homes/organic/Collections";
import Hero from "@/components/homes/organic/Hero";
import Products1 from "@/components/homes/organic/Products1";
import Products2 from "@/components/homes/organic/Products2";
import ShopGram from "@/components/homes/organic/ShopGram";
import Testimonials from "@/components/homes/organic/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Organic || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeOrganicPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 fullWidth />

      <Hero />
      <Products1 />
      <Collections />
      <BannerCountdown />
      <Products2 />
      <Testimonials />
      <Features parentClass="flat-spacing pt-0" />
      <ShopGram />
      <Footer1 border={false} />
    </>
  );
}
