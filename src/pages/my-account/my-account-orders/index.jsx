import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import AccountSidebarMobile from "@/components/my-account/AccountSidebarMobile";
import Orders from "@/components/my-account/Orers";
import { Link } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "My Account Orders || OQAAB - Premium JDM & Racing T-Shirts | Titans, Bikes & Car Tees Online",
  description: "Shop high-quality graphic T-shirts inspired by JDM culture, superbikes, street racing, muscle cars, and titan warriors. Bold designs. Premium fabric. Fast shipping.",
  keywords: "JDM T-shirts, racing T-shirts, bike T-shirts, car graphic tees, titan T-shirts, streetwear, motorsport fashion, tuner car apparel, anime titans shirts, performance car clothing, biker lifestyle tees"
};

export default function MyAccountOrdersPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <>
        {/* page-title */}
        <div
          className="page-title"
          style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
        >
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h3 className="heading text-center">My Account</h3>

              </div>
            </div>
          </div>
        </div>
        {/* /page-title */}
        <div className="btn-sidebar-account">
          <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
            <i className="icon icon-squares-four" />
          </button>
        </div>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="mbAccount" aria-labelledby="offcanvasAccountLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasAccountLabel">My Account</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body p-0">
            <AccountSidebarMobile />
          </div>
        </div>
      </>

      <section className="flat-spacing">
        <div className="container">
          <div className="my-account-wrap">
            <div className="d-none d-lg-block">
              <AccountSidebar />
            </div>
            <Orders />
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
