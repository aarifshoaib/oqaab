


import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

function MicroForm({ onShippingInfoUpdate }) {
  const [microform, setMicroform] = useState(null)
  const [loading, setLoading] = useState(false)
  const [microformReady, setMicroformReady] = useState(false)
  const shippingFormRef = useRef(null);

  const decodeJWT = (token) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT token format');

      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      return payload;
    } catch (error) {
      console.error('Error decoding JWT:', error.message);
      return null;
    }
  }

  const getShippingInfoFromForm = () => {
    // Get the form element from the parent component
    const formElement = document.querySelector('.shipping-info-form');
    if (!formElement) {
      alert('Shipping form not found');
      return null;
    }

    const formData = new FormData(formElement);
    const shippingInfo = Object.fromEntries(formData.entries());

    return shippingInfo;
  };

  const validateShippingInfo = (shippingInfo, loginUser) => {
    if (!shippingInfo) return false;

    const requiredFields = ['name', 'lname', 'phone', 'whatsapp', 'emirate', 'postal', 'flat_no', 'building_name', 'area', 'street'];

    if (!loginUser?.isLogin) {
      requiredFields.push('email');
    }

    for (const field of requiredFields) {
      console.log(`Validating field: ${field}`);
      console.log(`Value: ${shippingInfo[field]}`);
      if (!shippingInfo[field] || shippingInfo[field].trim() === '') {
        alert(`Please fill in the ${field.replace('_', ' ').replace('card name', 'name on card')} field`);
        return false;
      }
    }
    return true;
  };

  const payButtonClicked = async () => {
    setLoading(true);

    console.log(microform);
    if (!microform) {
      console.error("Payment form is not yet initialized");
      alert("Payment form is not ready yet. Please wait a moment and try again.");
      setLoading(false);
      return;
    }

    // Get shipping information from the parent form
    const shippingInfo = getShippingInfoFromForm();

    // Get loginUser from the callback
    const { loginUser, cartProducts, totalPrice, discounts } = onShippingInfoUpdate();

    // Add email from loginUser if user is logged in
    if (loginUser?.isLogin) {
      shippingInfo.email = loginUser.email;
    }

    if (!validateShippingInfo(shippingInfo, loginUser)) {
      setLoading(false);
      return;
    }

    console.log('Shipping Information:', shippingInfo);

    // Compiling MM & YY into optional parameters  
    const options = {
      expirationMonth: document.querySelector('#expirymonth-container').value,
      expirationYear: document.querySelector('#expiryyear-container').value
    };
    console.log(options)

    // Validate expiry date
    if (!options.expirationMonth || !options.expirationYear) {
      alert('Please enter valid expiry month and year');
      setLoading(false);
      return;
    }

    //  
    microform.createToken(options, async function (err, token) {
      if (err) {
        console.error(err);
        alert('Payment token creation failed: ' + (err.message || 'Unknown error'));
        setLoading(false);
      }
      else {
        console.log(JSON.stringify(token));
        let cardData = {
          "token": token,
          "shippingInfo": shippingInfo,
          "cartProducts": cartProducts,
          "totalPrice": totalPrice,
          "loginUser": loginUser,
          "discounts": discounts
        };
        console.log('Card Data:', cardData);
        try {
          let cybsResponse = await axios.post(
            "http://103.91.187.48:8081/payment/pay",
            cardData
          );

          console.log(cybsResponse);
          setLoading(false);

          // Handle successful payment
          if (cybsResponse.data && cybsResponse.data.clientReferenceInformation) {
            alert('Payment successful!');
          } else {
            alert('Payment completed but no reference received');
          }

        } catch (error) {
          console.error('Payment error:', error);
          alert('Payment failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
          setLoading(false);
        }
      }
    })
  }

  useEffect(() => {
    const createForm = async () => {
      // Getting the Capture Context
      let token = null
      let libraryUrl = null
      let integrity = null
      try {
        let cybsResponse = await axios.post(
          "http://92.96.253.84:3000/payment/capture"
        )
        console.log(cybsResponse)
        token = cybsResponse.data.captureContext
        let clientLibrary = decodeJWT(token).ctx[0].data
        libraryUrl = clientLibrary.clientLibrary
        integrity = clientLibrary.clientLibraryIntegrity
        console.log("Library URL:", libraryUrl);
        console.log("Integrity:", integrity);
      }
      catch (error) {
        console.log(error.message)
        alert('Failed to initialize payment form: ' + error.message);
        return;
      }
      // Load the JS library

      const head = window.document.getElementsByTagName('head')[0];
      const script = window.document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.onload = function () {
        const myStyles = {
          'input': {
            'font-size': '14px',
            'color': '#555',
            'line-height': '30px',
          },
          ':focus': { 'color': 'blue' },
          ':disabled': { 'cursor': 'not-allowed' },
          'valid': { 'color': '#3c763d' },
          'invalid': { 'color': '#a94442' }
        };
        // setup Microform
        const flex = new window.Flex(token);
        const microformInstance = flex.microform('card', { styles: myStyles });
        // Setup card number field
        console.log(microformInstance);
        const number = microformInstance.createField('number', { placeholder: 'CARD NUMBER' });
        number.load('#number-container');
        // Setup cvv field
        const securityCode = microformInstance.createField('securityCode', { placeholder: 'CVV' });
        securityCode.load('#securityCode-container');
        setMicroform(microformInstance);
        setMicroformReady(true);

      };
      script.onerror = function () {
        alert('Failed to load payment library');
      };
      script.src = libraryUrl;
      if (integrity) {
        script.integrity = integrity;
        script.crossOrigin = "anonymous";
      }
      head.appendChild(script);
    }
    createForm()

  }, [])

  return (
    <div className="info-box">
      <div
        id="number-container"
        style={{
          width: "100%",
          height: 45,
          color: '#000',
          fontSize: '16px',
          border: '2px solid var(--line)',
          boxShadow: 'none',
          padding: '9px 16px',
          backgroundColor: '#fff',
          fontFamily: 'Arial, sans-serif',
          fontWeight: '400',
          outline: '0'
        }}>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-evenly' }} >
        <input
          id="expirymonth-container"
          placeholder='MM'
          type="number"
          onInput={(e) => e.target.value = e.target.value.slice(0, 2)}
          min="1"
          max="12"
          style={{
            width: "100%",
            height: 45,
            color: '#000',
            fontSize: '16px',
            border: '2px solid var(--line)',
            boxShadow: 'none',
            padding: '9px 16px',
            backgroundColor: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '400',
            outline: '0'
          }} />
        <input
          id="expiryyear-container"
          placeholder='YYYY'
          type="number"
          onInput={(e) => e.target.value = e.target.value.slice(0, 4)}
          min={2025}
          max={2100}
          style={{
            width: "100%",
            height: 45,
            color: '#000',
            fontSize: '16px',
            border: '2px solid var(--line)',
            boxShadow: 'none',
            padding: '9px 16px',
            backgroundColor: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '400',
            outline: '0',
            marginLeft: '10px',
            marginRight: '10px'
          }} />
        <div
          id="securityCode-container"
          style={{
            width: "100%",
            height: 45,
            color: '#000',
            fontSize: '16px',
            border: '2px solid var(--line)',
            boxShadow: 'none',
            padding: '9px 16px',
            backgroundColor: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '400',
            outline: '0',
            marginLeft: '10px',
            marginRight: '10px'
          }}
        >
        </div>
      </div>
      <button
        className="tf-btn btn-reset"
        disabled={!microformReady || loading}
        variant="contained"
        onClick={() => { payButtonClicked() }}
      >
        {loading ? 'Processing...' : 'Payment'}
      </button>
    </div>)
}

export default function Checkout() {
  const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
  const { cartProducts, totalPrice, loginUser, setCartProducts } = useContextElement();
  const navigate = useNavigate();
  const discounts = [];

  // Callback function to provide data to MicroForm
  const getCheckoutData = () => {
    return {
      loginUser,
      cartProducts,
      totalPrice,
      discounts
    };
  };

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
        alert(!response.error)
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

                  <div className="wrap">
                    <h5 className="title">Information</h5>
                    <form className="info-box shipping-info-form">

                      {!loginUser?.isLogin ? (
                        <div className="grid-12">
                          <input type="email" name="email" className="mb-3" placeholder="Email*" aria-required={true} required />
                        </div>) : null}
                      <div className="grid-2">
                        <input type="text" name="name" placeholder="First Name*" defaultValue={loginUser?.fname} aria-required={true} required />
                        <input type="text" name="lname" placeholder="Last Name*" defaultValue={loginUser?.lname} aria-required={true} required />
                      </div>
                      <div className="grid-2">
                        <input type="text" name="phone" placeholder="Phone" aria-required={true} defaultValue={loginUser?.phone} required />
                        <input type="text" name="whatsapp" placeholder="WhatsApp" defaultValue={loginUser?.whatsapp} aria-required={true} required />
                      </div>
                      <div className="grid-2">
                        <div className="tf-select">
                          <select className="text-title" name="emirate" data-default="" aria-required={true} required>
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
                        <input type="text" placeholder="Postal Code*" name="postal" aria-required={true} required />
                      </div>
                      <div className="grid-2">
                        <input type="text" placeholder="Flat No*" name="flat_no" aria-required={true} required />
                        <input type="text" placeholder="Building Name*" name="building_name" aria-required={true} required />
                      </div>
                      <div className="grid-2">
                        <input type="text" placeholder="Area*" name="area" aria-required={true} required />
                        <input type="text" name="street" placeholder="Street,..." aria-required={true} required />
                      </div>

                      <textarea name="note" placeholder="Write note..." defaultValue={""} />
                    </form>
                  </div>
                  <div className="wrap">
                    <h5 className="title">Choose payment Option:</h5>
                    <div className="form-payment">
                      <div className="payment-box" id="payment-box">
                        <div className="payment-item payment-choose-card active">
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
                                    width={24}
                                    height={16}
                                    alt="card"
                                    src="/images/payment/img-10.png"
                                  />
                                </div>

                                <input
                                  type="text"
                                  name="card_name"
                                  placeholder="Name On Card*"
                                  className="shipping-info-form-field"
                                  required
                                />
                                <MicroForm onShippingInfoUpdate={getCheckoutData} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
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
      </div >
    </section >
  );

} const styles = {
  input: {
    'font-size': '16px',
    'font-family': 'Arial, sans-serif',
    'color': '#333',
  },
  ':focus': {
    'color': '#000',
  },
  'valid': {
    'color': 'green',
  },
  'invalid': {
    'color': 'red',
  }
};


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