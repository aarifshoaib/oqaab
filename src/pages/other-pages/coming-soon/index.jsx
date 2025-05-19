import CommingSoon from "@/components/otherPages/CommingSoon";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Comming Soon || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function CommingSoonPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <CommingSoon />
    </>
  );
}
