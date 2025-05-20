import { useEffect, useState } from "react";

const sectionIds = [
  "terms",
  "limitations",
  "revisions-and-errata",
  "site-terms",
  "risks",
  "intellectual-property",
  "customer-responsibility",
  "limitations-of-liability",
  "governing-law",
  "contact-us"
];
const sections = [
  { id: 1, text: "Use of Our Website", scroll: "terms" },
  { id: 2, text: "Products", scroll: "limitations" },
  {
    id: 3,
    text: "Orders and Payments",
    scroll: "revisions-and-errata",
  },
  {
    id: 4,
    text: "Shipping & Delivery",
    scroll: "site-terms",
  },
  { id: 5, text: "Returns & Refunds", scroll: "risks" },

  {
    id: 6, text: "Intellectual Property", scroll: "intellectual-property"
  },
  { id: 7, text: "Customer Responsibility", scroll: "customer-responsibility" },
  { id: 8, text: "Limitations of Liability", scroll: "limitations-of-liability" },
  { id: 9, text: "Governing Law", scroll: "governing-law" },
  { id: 10, text: "Contact Us", scroll: "contact-us" },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    // Create an IntersectionObserver to track visibility of sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active section when the section is visible in the viewport
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px", // Trigger when section is 50% visible
      }
    );

    // Observe each section
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Cleanup the observer when the component unmounts
      observer.disconnect();
    };
  }, [sectionIds]);

  const handleClick = (id) => {
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="terms-of-use-wrap">
          <div className="left sticky-top">
            {sections.map(({ id, text, scroll, isActive }) => (
              <h6
                key={id}
                onClick={() => handleClick(scroll)}
                className={`btn-scroll-target ${activeSection == scroll ? "active" : ""
                  }`}
              >
                {id}. {text}
              </h6>
            ))}
          </div>
          <div className="right">
            <h4 className="heading">Terms and Conditions</h4>
            <div className="terms-of-use-item item-scroll-target" id="terms">
              <h5 className="terms-of-use-title">1. Use of Our Website</h5>
              <div className="terms-of-use-content">
                <p>
                  You agree to use our website only for lawful purposes. You may not use it:
                </p>
                <ul>
                  <li>•	To make fake or fraudulent purchases</li>
                  <li>•	To interfere with the functionality of the website</li>
                  <li>•	To post or distribute harmful, illegal, or inappropriate content</li>
                  <li>• Will not provide any services or products to any Office of Foreign Assets Control (OFAC) sanctioned countries in accordance with UAE law .</li>
                </ul>


              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="limitations"
            >
              <h5 className="terms-of-use-title">2. Products</h5>
              <div className="terms-of-use-content">
                •	We offer printed T-shirts for both retail and wholesale. <br />
                •	Product images may slightly differ from the actual items due to lighting, photography, or screen differences. <br />
                •	Sizes and fit information are provided as a guide. Please check before placing an order.
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="revisions-and-errata"
            >
              <h5 className="terms-of-use-title">3. Orders and Payments</h5>
              <div className="terms-of-use-content">
                <p>
                  •	All prices are in AED. <br />
                  •	Orders are confirmed only after full payment is received. <br />
                  •	We accept online payments through secure third-party platforms. Cash-on-delivery may be available for specific regions (if applicable). <br />
                  •	<b>Oqaab fashions </b> reserves the right to cancel any suspicious or incomplete order.

                </p>

              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="site-terms"
            >
              <h5 className="terms-of-use-title">
                4. Shipping & Delivery
              </h5>
              <div className="terms-of-use-content">
                <p>
                  •	Delivery time depends on your location and the nature of the order (custom or ready stock). <br />
                  •	We aim to dispatch all orders promptly. However, we are not liable for delays caused by couriers or external factors. <br />
                  •	Delivery charges (if applicable) will be added at checkout.
                </p>
              </div>
            </div>
            <div className="terms-of-use-item item-scroll-target" id="risks">
              <h5 className="terms-of-use-title">5. Returns & Refunds</h5>
              <div className="terms-of-use-content">
                <p>
                  <p>	We accept returns only if: </p>
                  •	The product is defective <br />
                  •	You received the wrong item <br />
                  •	Custom or personalized T-shirts cannot be returned unless there is a mistake from our end. <br />
                  •	To request a return, please contact us within 7 days of receiving your order. <br />
                  •	Refunds will be done on the original mode of payment used .
                </p>

              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="intellectual-property"
            >
              <h5 className="terms-of-use-title">
                6. Intellectual Property
              </h5>
              <div className="terms-of-use-content">
                <p>
                  All T-shirt designs, logos, and content on our site belong to <b> Oqaab Fashions </b>. You may not copy, reuse, or distribute our designs without written permission.
                </p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="customer-responsibility"
            >
              <h5 className="terms-of-use-title">
                7. Customer Responsibility
              </h5>
              <div className="terms-of-use-content">
                <p>
                  By placing an order, you:
                  •	Confirm that all information provided is accurate
                  •	Agree to be responsible for reviewing product descriptions and size charts
                </p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="limitations-of-liability"
            >
              <h5 className="terms-of-use-title">
                8. Limitations of Liability
              </h5>
              <div className="terms-of-use-content">
                <p>
                  <b>Oqaab Fashions </b>is not liable for:
                  •	Losses due to misuse of products
                  •	Delays caused by third-party delivery partners
                  •	Any indirect or incidental damages related to your order

                </p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="governing-law"
            >
              <h5 className="terms-of-use-title">
                9. Governing Law
              </h5>
              <div className="terms-of-use-content">
                <p>
                  These Terms shall be governed by the laws of the United Arab Emirates. Any disputes shall be resolved in UAE courts.
                </p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="contact-us"
            >
              <h5 className="terms-of-use-title">
                10. Contact Us
              </h5>
              <div className="terms-of-use-content">

                <p>
                  For any questions, concerns, or returns, contact us at:

                  <b> Oqaab Fashions </b>
                  <br />   Email:  <a href="mailto:info@oqaabfashions.com" className="link">
                    <span className="link">
                      <span className="link"> info@oqaabfashions.com </span>
                    </span>
                  </a> <br/>
                  Phone: 045521781<br/>
                  Whatsapp: +971 52 123 8643 <br />
                  Location: Shop No 15, Musalla Building, Al Suq Al Kabeer, BurDubai, Dubai, UAE
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
