import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchapi } from "@/utlis/api";

export default function OrderDetails() {
  let params = useParams();
  const id = params.id;
  const [activeTab, setActiveTab] = useState(1);
  const [myorders, setMyorders] = useState(1);

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState("");
  const [cancelSuccess, setCancelSuccess] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "images/order-tracking/" + id + "/";
        const response = await fetchapi(url);
        const parsedProducts = await response.data.map((item) => {
          const parsed = JSON.parse(item.order_info);
          return parsed;
        });
        setMyorders(parsedProducts[0]);
      } catch (error) {
        console.error("Error fetching Product id:", error);
      }
    }; fetchProducts();
  }, [id, cancelSuccess]);

  // Handle cancel submit
  const handleCancelSubmit = async(e) => {
    e.preventDefault();
    if (!cancelReason.trim()) {
      setCancelError("Cancel reason is required.");
      return;
    }
    setCancelError("");
    // TODO: Add your cancel order API call here
    e.preventDefault();
      const npayload = {
        reason: cancelReason,
        id: id
      };
      console.log("Payload:", npayload);
      try {
        const response = await fetch("https://safaerp.com/apex/oqaab_fashions/images/cancel-order/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(npayload)
        });
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        const result = await response.json();
        if (result.status == '2') {
          console.log(result.message);
          return;
        } else {
          setCancelSuccess(true);
          setShowCancelModal(false);
          setCancelReason("");
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("Submission failed.");
      }
    
  };

  return (
    <div className="my-account-content">
      <div className="account-order-details">
        <div className="wd-form-order">
          <div className="order-head">
            <div className="content" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h6 className="mt-8 fw-5">Order #{id}</h6>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="badge" style={{ alignContent: "center", justifyContent: "center" }}>{myorders?.status}</div>
                {(myorders?.status === "PLACED" || myorders?.status === "PACKED") && (
                  <button
                    className="tf-btn btn-cancel"
                    style={{ marginLeft: 8, background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 4, padding: "4px 12px", cursor: "pointer" }}
                    onClick={() => setShowCancelModal(true)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="tf-grid-layout md-col-2 gap-15">
            <div className="item">
              <div className="text-2 text_black-2">Order Date</div>
              <div className="text-2 mt_4 fw-6">{myorders?.date || null}</div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Payment Mode</div>
              <div className="text-2 mt_4 fw-6">{myorders?.pmode || null}</div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Estimated Delivery Date</div>
              <div className="text-2 mt_4 fw-6">
                {myorders?.edeleivery || null}
              </div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Address</div>
              <div className="text-2 mt_4 fw-6">
                {myorders?.shipping || null}
              </div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Contact Info</div>
              <div className="text-2 mt_4 fw-6">
                <div>Email Id: {myorders?.contact_info?.email}</div>
                <div>Phone No: {myorders?.contact_info?.phone || 'N/A'}</div>
              </div>
            </div>
          </div>
          <div className="widget-tabs style-3 widget-order-tab">
            <ul className="widget-menu-tab">
              <li
                className={`item-title ${activeTab == 1 ? "active" : ""} `}
                onClick={() => setActiveTab(1)}
              >
                <span className="inner">Order History</span>
              </li>
              <li
                className={`item-title ${activeTab == 2 ? "active" : ""} `}
                onClick={() => setActiveTab(2)}
              >
                <span className="inner">Item Details</span>
              </li>
              {/* <li
                className={`item-title ${activeTab == 3 ? "active" : ""} `}
                onClick={() => setActiveTab(3)}
              >
                <span className="inner">Courier</span>
              </li> */}
              {/* <li
                className={`item-title ${activeTab == 4 ? "active" : ""} `}
                onClick={() => setActiveTab(4)}
              >
                <span className="inner">Receiver</span>
              </li> */}
            </ul>
            <div className="widget-content-tab">
              <div
                className={`widget-content-inner ${activeTab == 1 ? "active" : ""
                  } `}
              >
                <div className="widget-timeline">
                  <ul className="timeline">
                    {myorders?.order_log?.map((item, index) => (
                      <li key={index}>
                        <div className={`timeline-badge ${item.status === "CANCELLED" || item.status === "RETURNED"
                            ? "critical"
                            : item.status === "DELIVERED"
                              ? "success"
                              : index < myorders?.order_log?.length - 1
                                ? "success"
                                : "warning"
                          }`}></div>
                        <div className="timeline-box">
                          <a className="timeline-panel" href="#">
                            <div className="text-2 fw-6">Product {item.status}</div>
                            <span>{item.ldate}</span>
                          </a>
                          {item.attr2 && (
                            <p>
                              <strong>Courier Service : </strong> {item.attr2}
                            </p>
                          )}
                          {item.attr1 && (
                            <p>
                              <strong>Tracking Number : </strong>{item.attr1}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}

                  </ul>
                </div>
              </div>
              <div
                className={`widget-content-inner ${activeTab == 2 ? "active" : ""
                  } `}
              >

                {myorders?.item_info?.map((item, index) => (
                  <div className="order-head" key={index}>
                    <figure className="img-product">
                      <img
                        alt="product"
                        src={item.img_src}
                        width={600}
                        height={800}
                      />
                    </figure>
                    <div className="content">
                      <div className="text-2 fw-6">{item.title}</div>
                      <div className="mt_4">
                        <span className="fw-6">Price :</span> {item.unit_price}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Size :</span> {item.ssize}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Color :</span> {item.scolor}
                      </div>
                    </div>

                  </div>
                ))}
                <ul>
                  <li className="d-flex justify-content-between text-2">
                    <span>Total Price</span>
                    <span className="fw-6"><span className="uae-icon" title="aed" /> {" "}{myorders?.tamount?.toFixed(2)}</span>
                  </li>
                  <li className="d-flex justify-content-between text-2 mt_4 pb_8 line-bt">
                    <span>Total Discounts</span>
                    <span className="fw-6"><span className="uae-icon" title="aed" /> {" "}{myorders?.damount?.toFixed(2)}</span>
                  </li>
                  <li className="d-flex justify-content-between text-2 mt_8">
                    <span>Order Total</span>
                    <span className="fw-6"><span className="uae-icon" title="aed" /> {" "}{myorders?.tamount?.toFixed(2)}</span>
                  </li>
                </ul>

              </div>
              {/* <div
                className={`widget-content-inner ${activeTab == 3 ? "active" : ""
                  } `}
              >
                <p>
                  Our courier service is dedicated to providing fast, reliable,
                  and secure delivery solutions tailored to meet your needs.
                  Whether you're sending documents, parcels, or larger
                  shipments, our team ensures that your items are handled with
                  the utmost care and delivered on time. With a commitment to
                  customer satisfaction, real-time tracking, and a wide network
                  of routes, we make it easy for you to send and receive
                  packages both locally and internationally. Choose our service
                  for a seamless and efficient delivery experience.
                </p>
              </div> */}
              {/* <div
                className={`widget-content-inner ${activeTab == 4 ? "active" : ""
                  } `}
              >
                <p className="text-2 text-success">
                  Thank you Your order has been received
                </p>
                <ul className="mt_20">
                  <li>
                    Order Number : <span className="fw-7"># {id}</span>
                  </li>
                  <li>
                    Date :<span className="fw-7"> {myorders?.date}</span>
                  </li>
                  <li>
                    Total : <span className="fw-7">$18.95</span>
                  </li>
                  <li>
                    Payment Methods :
                    <span className="fw-7">Cash on Delivery</span>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
          {/* Cancel Modal */}
          {showCancelModal && (
            <div
              style={{
                position: "fixed",
                top: 0, left: 0, width: "100vw", height: "100vh",
                background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
              }}
            >
              <form
                onSubmit={handleCancelSubmit}
                style={{
                  background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}
              >
                <h4 style={{ marginBottom: 16 }}>Cancel Order</h4>
                <div style={{ marginBottom: 12 }}>
                  <label htmlFor="cancelReason" style={{ display: "block", marginBottom: 4 }}>Reason for cancellation <span style={{ color: "red" }}>*</span></label>
                  <select
                    id="cancelReason"
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                    required
                    style={{ width: "100%", borderRadius: 4, border: "1px solid #ccc", padding: 8 }}
                  >
                    <option value="" disabled>Select a cancellation reason</option>
                    <option value="Size has been Incorrect">Size has been Incorrect</option>
                    <option value="Order has been placed incorrectly">Order has been placed incorrectly</option>
                    <option value="Wrong Item has been selected">Wrong Item has been selected</option>
                  </select>
                  {cancelError && <div style={{ color: "red", marginTop: 4 }}>{cancelError}</div>}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                  <button type="button" onClick={() => { setShowCancelModal(false); setCancelReason(""); setCancelError(""); }} style={{ padding: "6px 16px", borderRadius: 4, border: "none", cursor: "pointer" }}>
                    Close
                  </button>
                  <button type="submit" style={{ background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px" }}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
