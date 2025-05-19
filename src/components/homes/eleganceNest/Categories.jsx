import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collectionData2 } from "@/data/collections";
import { use } from "react";
import { fetchapi } from "@/utlis/api";
export default function Categories() {


  const [collections, setCollections] = useState([]);


  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetchapi('images/collections/');
        const parsedProducts = response.data.map((item) => {
          const parsed = JSON.parse(item.product_json);
          return parsed;
        });
        setCollections(parsedProducts);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {

      }
    };
    fetchCollections();
  }, []);

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp">
          <h3 className="heading">Explore Collections</h3>
          <Link to={`/shop-collection`} className="btn-line">
            View All Collection
          </Link>
        </div>
      </div>
      <div
        className="container-full slider-layout-right wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <Swiper
          dir="ltr"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 2.2, spaceBetween: 15 },
            568: { slidesPerView: 3.2, spaceBetween: 20 },
            968: { slidesPerView: 4.2, spaceBetween: 20 },
            1224: { slidesPerView: 6.2, spaceBetween: 20 },
          }}
          pagination={{
            clickable: true,
            clickable: true,
          }}
        >
          {collections.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="collection-position-2 hover-img">
                <a className="img-style">
                  <img
                    className="lazyload"
                    data-src={slide.images[0].image}
                    alt={slide.style}
                    src={slide.images[0].image}
                    width={363}
                    height={483}
                  />
                </a>
                <div className="content">
                  <Link to={`/shop-collection`} className="cls-btn">
                    <h6 className="text">{slide.name}</h6>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
