import React from "react";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Page Not Found || OOQAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function PageNotFoundPage() {
  return (
    <section className="flat-spacing page-404">
      <div className="container">
        <div className="page-404-inner">
          <div className="image">
            <img
              className="lazyload"
              data-src="/images/section/404.png"
              alt="image"
              src="/images/section/404.png"
              width={679}
              height={701}
            />
          </div>
          <div className="content">
            <div className="heading">Oops!</div>
            <div>
              <h2 className="title mb_4">Something is Missing.</h2>
              <div className="text body-text-1 text-secondary">
                The page you are looking for cannot be found. take a break
                before trying again
              </div>
            </div>
            <Link to={`/`} className="tf-btn btn-fill">
              <span className="text text-button">Back To Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
