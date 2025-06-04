import Brands from "@/components/common/Brands";
import Features2 from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Link } from "react-router-dom";
import Topbar6 from "@/components/headers/Topbar6";
import About from "@/components/otherPages/About";
import Team from "@/components/otherPages/Team";
import Testimonials3 from "@/components/common/Testimonials3";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "About Us || OQAAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description : "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords : "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function AboutUsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">About Our Store</h3>
              {/* <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" to={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
               
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>About Our Store</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
      <About />
      <Features2 parentClass="flat-spacing line-bottom-container" />
      {/* <Team /> */}
      {/* <Brands parentClass="flat-spacing-5 bg-surface" /> */}
      <Testimonials3 parentClass="" />
      <Footer1 />
    </>
  );
}
