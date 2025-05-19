import Features2 from "@/components/common/Features2";
import MarqueeSection2 from "@/components/common/MarqueeSection2";
import Footer1 from "@/components/footers/Footer1";
import Header8 from "@/components/headers/Header8";
import Topbar2 from "@/components/headers/Topbar2";
import BannerTab from "@/components/common/BannerTab2";
import Blogs from "@/components/homes/beauty/Blogs";
import Categories from "@/components/common/Categories";
import Collections from "@/components/homes/beauty/Collections";
import Hero from "@/components/homes/beauty/Hero";
import Products from "@/components/common/Products5";
import ShopGram from "@/components/common/ShopGram4";
import Testimonials from "@/components/common/Testimonials3";
import Tiktok from "@/components/common/Tiktok";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Beauty || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function HomeBeautyPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar2 parentClass="tf-topbar topbar-white bg-purple-2" />
      <Header8 />
      <Hero />
      <Collections />
      <Categories />
      <MarqueeSection2 />
      <Products />
      <BannerTab />
      <Tiktok />
      <Testimonials />
      <Blogs />
      <Features2 parentClass="flat-spacing pt-0" />
      <ShopGram />
      <Footer1 dark />
    </>
  );
}
