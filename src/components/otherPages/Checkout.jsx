import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Checkout() {
  const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
  const { cartProducts, totalPrice, loginUser, setCartProducts } = useContextElement();
  const navigate = useNavigate();
  const discounts = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let payload = Object.fromEntries(formData.entries());
    const email = loginUser?.isLogin ? loginUser.email : payload.email;
    payload = {
      info: { ...payload, email },
      cartProducts: cartProducts,
      totalPrice: totalPrice,
      loginUser: loginUser,
      discounts: discounts,
    };
    try {
      const response = await fetch("https://safaerp.com/apex/oqaab_fashions/images/Orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const result = await response.json();
      if (result.status == '2') {
        alert(result.message);
        return;
      }
      if (result.status == '1') {
        alert("Order placed successfully!");
        setCartProducts([]); // Clear the cart after successful order
        // Optionally, redirect to a success page or perform other actions
        navigate("/order-confirmation/" + result.order_id, { replace: true });
        return;
      }
      //console.log(payload);
    } catch (error) {
      console.error("Error:", error);
      alert("Order failed.");
    }
  };
  return (
    <section>
      <div className="container">
        <div className="row">
          {loginUser?.isLogin ? (
            <>
              <div className="col-xl-6">
                <div className="flat-spacing tf-page-checkout">
                  <div className="wrap">
                    <h4 className="title">Checkout</h4>
                    <div className="title-login">
                      {loginUser?.isLogin ? (
                        <p>Hala, {loginUser?.fname.toUpperCase()}</p>
                      ) : (
                        <>
                          <p>Already have an account?</p>{" "}
                          <Link to={`/login`} className="text-button">
                            Login here
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                  <form className="info-box" onSubmit={handleSubmit}>
                    <div className="wrap">
                      <h5 className="title">Information</h5>
                      {!loginUser?.isLogin ? (
                        <div className="grid-12">
                          <input type="email" name="email" className="mb-3" placeholder="Email*" aria-required={true} required />
                        </div>) : null}
                      <div className="grid-2">
                        <input type="text" name="name" className="mb-3" placeholder="First Name*" defaultValue={loginUser?.fname}  aria-required={true} required />
                        <input type="text" name="lname" className="mb-3" placeholder="Last Name*" defaultValue={loginUser?.lname} aria-required={true} required />
                      </div>
                      <div className="grid-2">
                        <input type="text" name="phone" className="mb-3" placeholder="Phone" aria-required={true} defaultValue={loginUser?.phone}  required />
                        <input type="text" name="whatsapp" placeholder="WhatsApp" className="mb-3" aria-required={true} required />
                      </div>
                      <div className="grid-2">
                        <div className="tf-select">
                          <select className="text-title mb-3" name="emirate" data-default="" aria-required={true} required>
                            <option selected="" value="">
                              Choose Emirate
                            </option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                            <option value="Fujairah">Fujairah</option>
                          </select>
                        </div>
                        <input type="text" placeholder="Postal Code*" name="postal" className="mb-3" aria-required={true} required />
                      </div>
                      <div className="grid-12">
                        <input type="text" name="street" placeholder="Street,..." className="mb-3" aria-required={true} required />
                      </div>

                      <textarea name="note" placeholder="Write note..." defaultValue={""} />

                    </div>
                    <div className="wrap">
                      <h5 className="title">Choose payment Option:</h5>
                      <div
                        className="form-payment"

                      >
                        <div className="payment-box" id="payment-box">
                          {/* <div className="payment-item payment-choose-card">
                        <label
                          htmlFor="credit-card-method"
                          className="payment-header"
                          data-bs-toggle="collapse"
                          data-bs-target="#credit-card-payment"
                          aria-controls="credit-card-payment"
                        >
                          <input
                            type="radio"
                            name="paymentmethod"
                            className="tf-check-rounded"
                            id="credit-card-method"
                            defaultChecked
                          />
                          <span className="text-title">Credit Card</span>
                        </label>
                        <div
                          id="credit-card-payment"
                          className="collapse show"
                          data-bs-parent="#payment-box"
                        >
                          <div className="payment-body">
                            <p className="text-secondary">
                              Make your payment directly into our bank account.
                              Your order will not be shipped until the funds have
                              cleared in our account.
                            </p>
                            <div className="input-payment-box">
                              <input type="text" name="card_name" placeholder="Name On Card*" />
                              <div className="ip-card">
                                <input type="text" placeholder="Card Numbers*" />
                                <div className="list-card">
                                  <img
                                    width={48}
                                    height={16}
                                    alt="card"
                                    src="/images/payment/img-7.png"
                                  />
                                  <img
                                    width={21}
                                    height={16}
                                    alt="card"
                                    src="/images/payment/img-8.png"
                                  />
                                  <img
                                    width={22}
                                    height={16}
                                    alt="card"
                                    src="/images/payment/img-9.png"
                                  />
                                  <img
                                    width={24}
                                    height={16}
                                    alt="card"
                                    src="/images/payment/img-10.png"
                                  />
                                </div>
                              </div>
                              <div className="grid-2">
                                <input type="date" />
                                <input type="text" placeholder="CVV*" />
                              </div>
                            </div>
                            <div className="check-save">
                              <input
                                type="checkbox"
                                className="tf-check"
                                id="check-card"
                                defaultChecked
                              />
                              <label htmlFor="check-card">
                                Save Card Details
                              </label>
                            </div>
                          </div>
                        </div>
                      </div> */}
                          <div className="payment-item active">
                            <label
                              htmlFor="delivery-method"
                              className="payment-header collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#delivery-payment"
                              aria-controls="delivery-payment"
                            >
                              <input
                                type="radio"
                                name="paymentmethod"
                                className="tf-check-rounded"
                                id="delivery-method"
                                defaultChecked
                              />
                              <span className="text-title">Cash on delivery</span>
                            </label>
                            <div
                              id="delivery-payment"
                              className="collapse"
                              data-bs-parent="#payment-box"
                            />
                          </div>
                          {/* <div className="payment-item">
                      <label
                        htmlFor="apple-method"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#apple-payment"
                        aria-controls="apple-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="apple-method"
                        />
                        <span className="text-title apple-pay-title">
                          <img
                            alt="apple"
                            src="/images/payment/applePay.png"
                            width={13}
                            height={18}
                          />
                          Apple Pay
                        </span>
                      </label>
                      <div
                        id="apple-payment"
                        className="collapse"
                        data-bs-parent="#payment-box"
                      />
                    </div>
                    <div className="payment-item paypal-item">
                      <label
                        htmlFor="paypal-method"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#paypal-method-payment"
                        aria-controls="paypal-method-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="paypal-method"
                        />
                        <span className="paypal-title">
                          <img
                            alt="apple"
                            src="/images/payment/paypal.png"
                            width={90}
                            height={23}
                          />
                        </span>
                      </label>
                      <div
                        id="paypal-method-payment"
                        className="collapse"
                        data-bs-parent="#payment-box"
                      />
                    </div> */}
                        </div>
                        <button className="tf-btn btn-reset" type="submit">Payment</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            
            </>
          ) : <>
            <div className="col-xl-6">
              <div className="flat-spacing tf-page-checkout">
                <div className="wrap">
                  <h4 className="title">Checkout</h4>
                  <div className="title-login">

                    <p>Already have an account?</p>{" "}
                    <Link to={`/login`} className="text-button">
                      Login here
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </>}
          <div className="col-xl-1">
            <div className="line-separation" />
          </div>
          <div className="col-xl-5">
            <div className="flat-spacing flat-sidebar-checkout">
              <div className="sidebar-checkout-content">
                <h5 className="title">Shopping Cart</h5>
                <div className="list-product">
                  {cartProducts.map((elm, i) => (
                    <div key={i} className="item-product">
                      <Link
                        to={`/product-detail/${elm.id}`}
                        className="img-product"
                      >
                        <img
                          alt="img-product"
                          src={elm.imgSrc}
                          width={600}
                          height={800}
                        />
                      </Link>
                      <div className="content-box">
                        <div className="info">
                          <Link
                            to={`/product-detail/${elm.id}`}
                            className="name-product link text-title"
                          >
                            {elm.title}
                          </Link>
                          <div className="variant text-caption-1 text-secondary">
                            <span className="size">{elm.scolor}</span>/
                            <span className="color">{elm.ssize}</span>
                          </div>
                        </div>
                        <div className="total-price text-button">
                          <span className="count">{elm.quantity}</span>X
                          <span className="price"><span className="uae-icon" title="aed" /> {" "} {elm.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sec-discount">
                  <Swiper
                    dir="ltr"
                    className="swiper tf-sw-categories"
                    slidesPerView={2.25} // data-preview="2.25"
                    breakpoints={{
                      1024: {
                        slidesPerView: 2.25, // data-tablet={3}
                      },
                      768: {
                        slidesPerView: 3, // data-tablet={3}
                      },
                      640: {
                        slidesPerView: 2.5, // data-mobile-sm="2.5"
                      },
                      0: {
                        slidesPerView: 1.2, // data-mobile="1.2"
                      },
                    }}
                    spaceBetween={20}
                  >
                    {discounts.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className={`box-discount ${activeDiscountIndex === index ? "active" : ""
                            }`}
                          onClick={() => setActiveDiscountIndex(index)}
                        >
                          <div className="discount-top">
                            <div className="discount-off">
                              <div className="text-caption-1">Discount</div>
                              <span className="sale-off text-btn-uppercase">
                                {item.discount}
                              </span>
                            </div>
                            <div className="discount-from">
                              <p className="text-caption-1">{item.details}</p>
                            </div>
                          </div>
                          <div className="discount-bot">
                            <span className="text-btn-uppercase">
                              {item.code}
                            </span>
                            <button className="tf-btn">
                              <span className="text">Apply Code</span>
                            </button>
                          </div>
                        </div>{" "}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="ip-discount-code">
                    <input type="text" placeholder="Add voucher discount" />
                    <button className="tf-btn">
                      <span className="text">Apply Code</span>
                    </button>
                  </div>
                  <p>
                    Discount code is only used for orders with a total value of
                    products over <span className="uae-icon" title="aed" /> {" "} 500.00
                  </p>
                </div>
                <div className="sec-total-price">
                  <div className="top">
                    <div className="item d-flex align-items-center justify-content-between text-button">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    {/* <div className="item d-flex align-items-center justify-content-between text-button">
                      <span>Discounts</span>
                      <span>-$80.00</span>
                    </div> */}
                  </div>
                  <div className="bottom">
                    <h5 className="d-flex justify-content-between">
                      <span>Total</span>
                      <span className="total-price-checkout">
                        <span className="uae-icon" title="aed" /> {" "} {totalPrice?.toFixed(2)}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// const discounts = [
//   {
//     discount: "10% OFF",
//     details: "For all orders from 200$",
//     code: "Mo234231",
//   },
//   {
//     discount: "10% OFF",
//     details: "For all orders from 200$",
//     code: "Mo234231",
//   },
//   {
//     discount: "10% OFF",
//     details: "For all orders from 200$",
//     code: "Mo234231",
//   },
// ];