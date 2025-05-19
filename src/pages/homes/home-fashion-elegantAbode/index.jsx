import MarqueeSection from "@/components/common/MarqueeSection";
import Products2 from "@/components/common/Products2";
import Testimonials from "@/components/common/Testimonials";
import Header1 from "@/components/headers/Header1";
import Topbar3 from "@/components/headers/Topbar3";
import BannerCountdown from "@/components/homes/fashion-elegantAbode/BannerCountdown";
import Categories from "@/components/homes/fashion-elegantAbode/Categories";
import Hero from "@/components/homes/fashion-elegantAbode/Hero";
import Lookbook from "@/components/homes/fashion-elegantAbode/Lookbook";
import Products from "@/components/homes/fashion-elegantAbode/Products";
import Blogs from "@/components/common/Blogs";
import React from "react";
import Features from "@/components/common/Features";
import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import MarqueeSection2 from "@/components/common/MarqueeSection2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Elegant Abode || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeFashionElegantAbodePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar3 />
      <Header1 />
      <Hero />
      <Categories />
      <Products />
      <BannerCountdown />
      <MarqueeSection2 parentClass={"tf-marquee marquee-white bg-purple-2"} />
      <Lookbook />
      <Products2 title="Top Trending" parentClass="flat-spacing pt-0" />
      <Testimonials parentClass="flat-spacing pt-0" />
      <Blogs parentClass="" readMore />
      <Features parentClass="flat-spacing-5" />
      <Brands />
      <Footer1 dark />
    </>
  );
}
