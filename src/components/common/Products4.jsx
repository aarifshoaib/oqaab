import ProductCard1 from "@/components/productCards/ProductCard1";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchapi } from "@/utlis/api";
import { useContextElement } from "@/context/Context";

export default function Products4({ parentClass = "", title = "Today's Top Picks", id="" }) {
  const [products, setProducts] = useState([]);
  const [oProducts, setoProducts] = useState([]);
  const { cartProducts } = useContextElement();
 

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        console.log("cartItems", cartProducts);
        const response = await fetchapi("images/top-picks/");
        let parsedProducts = response.data.map((item) => {
          const parsed = JSON.parse(item.product_json);
          return parsed;
        });
        if (cartProducts.length > 0) {
          const cartTitles = cartProducts.map((item) => item.title);
          parsedProducts = parsedProducts?.filter(
            (item) => !cartTitles.includes(item.title)
          );
        }
        if (id) {
          console.log("id", id);
          console.log("parsedProducts before", parsedProducts);
          parsedProducts = parsedProducts.filter((item) => item.id != id);
          console.log("parsedProducts after", parsedProducts);
        }
        setoProducts(parsedProducts);
      } catch (error) {
        console.error("Error fetching Top Picks:", error);
      } finally {
      }
    };
    fetchTopPicks();
  }, [cartProducts, id]);


  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">{title}</h3>
          <p className="subheading text-secondary">
            Fresh styles just in! Elevate your look.
          </p>
        </div>
        <Swiper
          className="swiper tf-sw-latest"
          dir="ltr"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 15 },

            768: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd5",
          }}
        >
          {oProducts.length > 0 && oProducts.slice(0, 4).map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard1 product={product} id={""} />
            </SwiperSlide>
          ))}

          <div className="sw-pagination-latest spd5 sw-dots type-circle justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
