import { slides2 } from "@/data/heroSlides";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { fetchapi } from "@/utlis/api";

export default function Hero() {

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSlides = async () => {
      const { data, error } = await fetchapi("images/banners/");
      if (data) {
        setSlides(data);
      }
      setLoading(false);
    };

    loadSlides();
  }, []);

  return (
    <section className="tf-slideshow slider-style2 slider-effect-fade">
      <Swiper
        dir="ltr"
        spaceBetween={0}
        loop={false}
        autoplay={true}
        breakpoints={{
          1024: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          320: { slidesPerView: 1 },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd30",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider" style={{ height: "803px" }}>
              <img
                alt={slide.alt}
                src={slide.imgsrc}
                width={1920}
                height={803}
              />
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div className="fade-item fade-item-1 heading title-display text-white">
                        {slide.heading.split("<br/>").map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="fade-item fade-item-2 body-text-1 text-white">
                        {slide.text}
                      </p>
                    </div>
                    <div className="fade-item fade-item-3 box-btn-slider">
                      <Link
                        to={`/all-collections`}
                        className="tf-btn btn-fill btn-white"
                      >
                        <span className="text">{slide.btntext}</span>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle justify-content-center spd30" />
        </div>
      </div>
    </section>
  );
}
