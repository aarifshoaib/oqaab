import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";

import DetailsPreOrder from "@/components/productDetails/details/DetailsPreOrder";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { allProducts } from "@/data/products";
import React from "react";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Product Detail || OQAAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function ProductPreorderPage() {
  let params = useParams();
  const id = params.id;

  const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <Breadcumb product={product} />
      <DetailsPreOrder product={product} />
      <Descriptions1 />
      <RelatedProducts />
      <Footer1 hasPaddingBottom />
    </>
  );
}
