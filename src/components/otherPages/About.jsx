import React, { useState } from "react";

export default function About() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="flat-spacing about-us-main pb_0">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="about-us-features wow fadeInLeft">
              <img
                className="lazyload"
                data-src="https://sanaerp.com/oqaab/about/about-1.jpeg"
                alt="image-team"
                src="https://sanaerp.com/oqaab/about/about-1.jpeg"
            
                style={{ width: "100%", height: "500px" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-us-content">
              <h3 className="title wow fadeInUp">
                OQAAB – Offering rare, classic, traditional and beautiful items worldwide 
              </h3>
              <div className="widget-tabs style-3">
                <ul className="widget-menu-tab wow fadeInUp">
                  <li
                    className={`item-title ${activeTab == 1 ? "active" : ""} `}
                    onClick={() => setActiveTab(1)}
                  >
                    <span className="inner text-button">Introduction</span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 2 ? "active" : ""} `}
                    onClick={() => setActiveTab(2)}
                  >
                    <span className="inner text-button">Why Choose Us</span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 3 ? "active" : ""} `}
                    onClick={() => setActiveTab(3)}
                  >
                    <span className="inner text-button">
                      Company Description
                    </span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 4 ? "active" : ""} `}
                    onClick={() => setActiveTab(4)}
                  >
                    <span className="inner text-button">Product and Services</span>
                  </li>
                </ul>
                <div className="widget-content-tab wow fadeInUp">
                  <div
                    className={`widget-content-inner ${
                      activeTab == 1 ? "active" : ""
                    } `}
                  >
                    <p>
                      Welcome to Oqaab Fashions, Making a statement with style. Specializing in
                      high-quality printed T-shirts, we cater to both wholesale and retail
                      markets, offering unique and trend-driven designs. Our brand stands for
                      creativity, quality, and individuality, ensuring that every piece reflects
                      personality and passion. Whether you’re looking for bold expressions,
                      custom prints, or timeless styles, Oqaab Fashion is committed to
                      delivering premium apparel that speaks volumes. With a focus on
                      craftsmanship and customer satisfaction, we aim to redefine fashion by
                      blending innovation with comfort.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 2 ? "active" : ""
                    } `}
                  >
                    <p>
                      <b>High-Quality Prints & Fabrics</b> <br/>
                      We use premium materials and advanced printing techniques
                      to ensure long-lasting designs and superior comfort.<br />
                      <b>Competitive Pricing & Wholesale Options</b><br />
                      Get the best value for your money with affordable pricing and
                      attractive wholesale deals.<br />
                      <b> Reliable & Customer-Focused Service</b><br />
                      We prioritize customer satisfaction with prompt service,
                      attention to detail, and a commitment to excellence.<br />
                      <b>Customization & Unique Designs</b><br />
                      Whether for personal style or bulk orders, we offer custom
                      prints and trendsetting designs that stand out.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 3 ? "active" : ""
                    } `}
                  >
                    <p>
                      <b>Oqaab Fashions</b> is a bold and creative fashion brand based in
                      Dubai, specializing in high-quality printed T-shirts for both retail
                      and wholesale markets. We blend street style with statement-
                      making designs, offering apparel that speaks to individuality,
                      confidence, and culture.
                      At Oqaab Fashion, we believe fashion is more than clothing — it’s
                      a voice. That’s why we use cutting-edge tools, including AI-
                      powered design, to craft unique prints that resonate with today’s
                      generation. Our T-shirts are made with premium materials,
                      combining comfort, durability, and trend-forward aesthetics.
                      Whether you're a fashion-forward individual or a business
                      looking for custom merchandise, Oqaab Fashion delivers quality,
                      creativity, and impact — one T-shirt at a time.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 4 ? "active" : ""
                    } `}
                  >
                    <p>
                      <b>1. Printed T-Shirts – Retail</b> <br />
                      We offer a wide range of stylish, high-quality printed T-shirts
                      for men and women. Each design is crafted with creativity,
                      cultural relevance, and attention to detail, perfect for everyday
                      wear or making a statement.<br />
                      <b>2. Bulk & Wholesale Orders</b><br />
                      Oqaab Fashion caters to bulk buyers, resellers, and
                      businesses with competitive pricing and custom solutions.
                      Ideal for events, promotions, or retail stock, our wholesale
                      service guarantees consistent quality and fast delivery.
                      <b>3. Custom Design & Printing</b><br />
                      Bring your vision to life! We provide custom T-shirt printing
                      services for brands, events, teams, or personal use. From
                      design consultation to final print, we ensure every piece
                      reflects your style and purpose.<br />
                      <b>4. AI-Enhanced Design Services</b><br />
                      Using cutting-edge AI tools, we create unique and trend-driven
                      designs that stand out in the market. Our tech-driven
                      approach helps clients achieve bold, fresh looks that connect
                      with modern audiences.<br />
                      <b>5. Offline Sales & Pop-Up Displays</b><br />
                      We actively engage with customers through offline selling
                      points and pop-up stalls, bringing the Oqaab Fashion
                      experience directly to the streets, events, and local markets.
                    </p>
                  </div>
                </div>
              </div>
              {/* <a href="#" className="tf-btn btn-fill wow fadeInUp">
                <span className="text text-button">Read More</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
