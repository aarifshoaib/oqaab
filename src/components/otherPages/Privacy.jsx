import { useEffect, useState } from "react";

const sectionIds = [
    "information-we-collect",
    "how-we-use-your-information",
    "sharing-your-information",
    "cookies-and-tracking",
    "data-security",
    "your-rights",
    "changes-to-this-policy",
    "contact-us",
];

const sections = [
    { id: 1, text: "Information We Collect", scroll: "information-we-collect" },
    { id: 2, text: "How We Use Your Information", scroll: "how-we-use-your-information" },
    { id: 3, text: "Sharing Your Information", scroll: "sharing-your-information" },
    { id: 4, text: "Cookies and Tracking", scroll: "cookies-and-tracking" },
    { id: 5, text: "Data Security", scroll: "data-security" },
    { id: 6, text: "Your Rights", scroll: "your-rights" },
    { id: 7, text: "Changes to This Policy", scroll: "changes-to-this-policy" },
    { id: 8, text: "Contact Us", scroll: "contact-us" },
];

export default function Privacy() {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-50% 0px",
            }
        );

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
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
                        {sections.map(({ id, text, scroll }) => (
                            <h6
                                key={id}
                                onClick={() => handleClick(scroll)}
                                className={`btn-scroll-target ${activeSection === scroll ? "active" : ""}`}
                            >
                                {id}. {text}
                            </h6>
                        ))}
                    </div>
                    <div className="right">
                        <h4 className="heading">Privacy Policy</h4>
                        <div className="terms-of-use-item item-scroll-target" id="information-we-collect">
                            <h5 className="terms-of-use-title">1. Information We Collect</h5>
                            <div className="terms-of-use-content">
                                <p>We may collect the following types of personal information:</p>
                                <ul>
                                    <li>• Name, email address, phone number</li>
                                    <li>• Shipping and billing address</li>
                                    <li>• Payment information (processed securely via third-party gateways)</li>
                                    <li>• IP address and browser information</li>
                                    <li>• Any other information you voluntarily provide through forms, emails, or messages</li>
                                </ul>
                            </div>
                        </div>
                        <div className="terms-of-use-item item-scroll-target" id="how-we-use-your-information">
                            <h5 className="terms-of-use-title">2. How We Use Your Information</h5>
                            <div className="terms-of-use-content">
                                <p>We use the information to:</p>
                                <ul>
                                    <li>• Process orders and deliver products</li>
                                    <li>• Respond to inquiries and provide customer support</li>
                                    <li>• Improve our website and services</li>
                                    <li>• Send promotional offers (only if you opt-in)</li>
                                    <li>• Ensure security and prevent fraud</li>
                                </ul>
                            </div>
                        </div>
                        <div className="terms-of-use-item item-scroll-target" id="sharing-your-information">
                            <h5 className="terms-of-use-title">3. Sharing Your Information</h5>
                            <div className="terms-of-use-content">
                                <p>We do not sell or rent your personal information. We may share your data with:</p>
                                <ul>
                                    <li>• Trusted third-party service providers (like payment processors or delivery services)</li>
                                    <li>• Legal authorities if required by law or to protect our rights</li>
                                    <li>• Credit/debit card details and personally identifiable information will not be stored, sold, shared or rented to any third parties.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="terms-of-use-item item-scroll-target" id="cookies-and-tracking">
                            <h5 className="terms-of-use-title">4. Cookies and Tracking</h5>
                            <div className="terms-of-use-content">
                                <p>Our website may use cookies to enhance your browsing experience. Cookies help us:</p>
                                <ul>
                                    <li>• Understand website usage</li>
                                    <li>• Store user preferences</li>
                                    <li>• Offer a personalized experience</li>
                                </ul>
                                <p>You can control cookie settings through your browser.</p>
                            </div>
                        </div>
                        <div className="terms-of-use-item item-scroll-target" id="data-security">
                            <h5 className="terms-of-use-title">5. Data Security</h5>
                            <div className="terms-of-use-content">
                                <p>
                                    We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
                                </p>
                            </div>
                        </div>
                        <div className="terms-of-use-item item-scroll-target" id="your-rights">
                            <h5 className="terms-of-use-title">6. Your Rights</h5>
                            <div className="terms-of-use-content">
                                <p>You have the right to:</p>
                                <ul>
                                    <li>• Access or update your personal information</li>
                                    <li>• Request deletion of your data</li>
                                    <li>• Opt-out of marketing communications</li>
                                </ul>
                                <p>To make any of these requests, please contact us at: [insert your business email]</p>
                            </div>
                        </div>
                        <div className="terms-of-use-item item-scroll-target" id="changes-to-this-policy">
                            <h5 className="terms-of-use-title">7. Changes to This Policy</h5>
                            <div className="terms-of-use-content">
                                <p>
                                    We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised date.
                                </p>
                            </div>
                        </div>
                        <div className="terms-of-use-item item-scroll-target" id="contact-us">
                            <h5 className="terms-of-use-title">8. Contact Us</h5>
                            <div className="terms-of-use-content">
                                <p>
                                    If you have any questions or concerns about this policy, contact us at:
                                </p>
                                <p>
                                    <b>Oqaab</b>
                                    <br />
                                    Email: <a href="mailto:info@oqaabfashions.com" className="link">
                                        <span className="link">
                                            <span className="link"> info@oqaabfashions.com </span>
                                        </span>
                                    </a> 
                                    <br />
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