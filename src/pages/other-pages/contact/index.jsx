import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Contact2 from "@/components/otherPages/Contact2";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Contact || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function ContactPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1621.7866906054642!2d55.295952295070585!3d25.25983141017133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE1JzM3LjQiTiA1NcKwMTcnNDMuNiJF!5e0!3m2!1sen!2sae!4v1747592040456!5m2!1sen!2sae"
        width={600}
        height={450}
        style={{ border: 0, width: "100%" }}
        allowFullScreen=""
        loading="lazy"
      />
      <Contact2 />
      <Footer1 />
    </>
  );
}
