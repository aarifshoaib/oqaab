import React from "react";

import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <section>
      <div className="container">
        <div className="flat-img-with-text">
          <div className="banner banner-left wow fadeInLeft">
            <img
              alt="banner"
              src="https://sanaerp.com/oqaab/banners/banner_2.jpg"
              width={709}
              height={709}
            />
          </div>
          <div className="banner-content">
            <div className="content-text wow fadeInUp">
              <h3 className="title text-center fw-5">
                Special Offer! <br />
                This Week Only
              </h3>
              <p className="desc">Reserved for special occasions</p>
            </div>
            <Link
              to={`/all-collections`}
              className="tf-btn btn-fill wow fadeInUp"
            >
              <span className="text">Explore Collection</span>
              <i className="icon icon-arrowUpRight" />
            </Link>
          </div>
          <div className="banner banner-right wow fadeInRight">
            <img
              alt="banner"
              src="https://sanaerp.com/oqaab/banners/08052025104305_banner_1.png"
              width={945}
              height={709}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
