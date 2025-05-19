import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { fetchapi } from "@/utlis/api";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Products from "@/components/common/Products4";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Product Detail || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function ProductDetailPage() {
  let params = useParams();
  const id = params.id;
  const [product, setProduct] = React.useState({});
  //const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "images/product/" + id + "/";
        const response = await fetchapi(url);
        const parsedProducts = await response.data.map((item) => {
          const parsed = JSON.parse(item.product_json);
          return parsed;
        });
        setProduct(parsedProducts[0]);
      } catch (error) {
        console.error("Error fetching Product id:", error);
      }
    }; fetchProducts();
  }, [id]);

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <Breadcumb product={product} />
      <Details1 product={product} />  
      <Descriptions1 product={product}/>
      {/* <RelatedProducts /> */}
      <Products parentClass="flat-spacing" title="Related Products" id={id} />
      <Footer1 hasPaddingBottom />
    </>
  );
}
