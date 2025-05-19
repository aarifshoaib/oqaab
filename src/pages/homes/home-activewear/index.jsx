import Features from "@/components/common/Features";
import MarqueeSection2 from "@/components/common/MarqueeSection2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar3 from "@/components/headers/Topbar3";
import BannerTab from "@/components/homes/activewear/BannerTab";
import Collections from "@/components/homes/activewear/Collections";
import Hero from "@/components/homes/activewear/Hero";
import Lookbook from "@/components/homes/activewear/Lookbook";
import Products from "@/components/homes/activewear/Products";
import Products2 from "@/components/homes/activewear/Products2";
import ShopGram from "@/components/homes/activewear/ShopGram";
import Testimonials from "@/components/homes/activewear/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Active Wear || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeActivemearPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar3 />
      <Header1 fullWidth />
      <Hero />
      <MarqueeSection2 parentClass="tf-marquee border-0" />
      <Collections />
      <Products />
      <Lookbook />
      <BannerTab />
      <Products2 />
      <Testimonials />
      <Features parentClass="flat-spacing line-top-container" />
      <ShopGram />
      <Footer1 border={false} />
    </>
  );
}
