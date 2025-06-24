import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

function PaymentForm({ onShippingInfoUpdate }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardType: '001', // Default to Visa
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardName: ''
  });

  const getShippingInfoFromForm = () => {
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
      if (!shippingInfo[field] || shippingInfo[field].trim() === '') {
        alert(`Please fill in the ${field.replace('_', ' ')} field`);
        return false;
      }
    }
    return true;
  };

  const validatePaymentInfo = () => {
    if (!formData.cardName.trim()) {
      alert('Please enter the name on card');
      return false;
    }
    if (!formData.cardNumber.trim() || formData.cardNumber.length < 13) {
      alert('Please enter a valid card number');
      return false;
    }
    if (!formData.expiryMonth || !formData.expiryYear) {
      alert('Please enter valid expiry month and year');
      return false;
    }
    if (!formData.cvv.trim() || formData.cvv.length < 3) {
      alert('Please enter a valid CVV');
      return false;
    }
    return true;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Store order in database first
  const storeOrderInDatabase = async (shippingInfo, loginUser, cartProducts, totalPrice, discount) => {
    const email = loginUser?.isLogin ? loginUser.email : shippingInfo.email;
    const orderPayload = {
      info: { ...shippingInfo, email },
      cartProducts: cartProducts,
      totalPrice: totalPrice,
      loginUser: loginUser,
      discounts: discount,
      status: 'pending_payment', // Mark as pending payment
      createdAt: new Date().toISOString()
    };

    try {
      // Replace this URL with your working backend endpoint
      const response = await axios.post("https://safaerp.com/apex/oqaab_fashions/images/Orders/", orderPayload);

      if (response.data.success) {
        return {
          success: true,
          orderId: response.data.orderId,
          orderNumber: response.data.orderNumber
        };
      } else {
        throw new Error(response.data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Database storage error:', error);
      throw new Error('Failed to store order: ' + (error.response?.data?.message || error.message));
    }
  };

  const payButtonClicked = async () => {
    setLoading(true);

    try {
      // Get shipping information from the parent form
      const shippingInfo = getShippingInfoFromForm();

      // Get checkout data from the callback
      const { loginUser, cartProducts, totalPrice, discount } = onShippingInfoUpdate();

      // Add email from loginUser if user is logged in
      if (loginUser?.isLogin) {
        shippingInfo.email = loginUser.email;
      }

      // Validate shipping and payment information
      if (!validateShippingInfo(shippingInfo, loginUser)) {
        setLoading(false);
        return;
      }

      if (!validatePaymentInfo()) {
        setLoading(false);
        return;
      }

      console.log('Shipping Information:', shippingInfo);
      console.log('Payment Information:', formData);

      // STEP 1: Store order in database first
      console.log('Storing order in database...');
      const orderResult = await storeOrderInDatabase(shippingInfo, loginUser, cartProducts, totalPrice, discount);

      if (!orderResult.success) {
        throw new Error('Failed to create order in database');
      }

      console.log('Order stored successfully:', orderResult);

      // Generate a unique reference number using the order ID
      const referenceNumber = orderResult.orderNumber || `ORDER-${orderResult.orderId}`;

      // STEP 2: Initialize payment with Cybersource
      console.log('Initializing payment...');
      const paymentInitResponse = await axios.post("http://localhost:3000/payments/initiate", {
        orderId: orderResult.orderId, // Include order ID for tracking
        amount: totalPrice.toFixed(2),
        currency: "AED",
        referenceNumber: referenceNumber,
        billToForename: shippingInfo.name,
        billToSurname: shippingInfo.lname,
        billToEmail: shippingInfo.email,
        billToAddressLine1: `${shippingInfo.flat_no}, ${shippingInfo.building_name}`,
        billToAddressCity: shippingInfo.area,
        billToAddressState: shippingInfo.emirate,
        billToAddressCountry: "AE",
        billToAddressPostalCode: shippingInfo.postal,
        billToPhone: shippingInfo.phone,
        locale: "en",
        paymentMethod: "card"
      }, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json'
        }
      });

      console.log('Payment form data:', paymentInitResponse.data);

      if (!paymentInitResponse.data.success) {
        throw new Error('Failed to initialize payment');
      }

      // STEP 3: Create and submit form to Cybersource
      const { formData: signedFormData, endpointUrl } = paymentInitResponse.data;

      // Create a form dynamically
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = endpointUrl;
      form.style.display = 'none';

      // Add all signed fields as hidden inputs
      Object.keys(signedFormData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = signedFormData[key];
        form.appendChild(input);
      });

      // Add card details (unsigned fields)
      const cardFields = [
        { name: 'card_type', value: formData.cardType },
        { name: 'card_number', value: formData.cardNumber.replace(/\s/g, '') }, // Remove spaces
        { name: 'card_expiry_date', value: `${formData.expiryMonth.padStart(2, '0')}-${formData.expiryYear}` },
        { name: 'card_cvn', value: formData.cvv }
      ];

      cardFields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
      });

      // Append form to body and submit
      document.body.appendChild(form);

      console.log('Submitting payment form to:', endpointUrl);
      console.log('Form data:', [...new FormData(form).entries()]);

      // Submit the form to Cybersource
      form.submit();

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      {/* Card Name */}
      <div className="form-group" style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Name On Card*"
          value={formData.cardName}
          onChange={(e) => handleInputChange('cardName', e.target.value)}
          required
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
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Card Type */}
      <div className="form-group" style={{ marginBottom: '15px' }}>
        <select
          value={formData.cardType}
          onChange={(e) => handleInputChange('cardType', e.target.value)}
          required
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
            borderRadius: '4px'
          }}
        >
          <option value="001">Visa</option>
          <option value="002">Mastercard</option>
          <option value="003">American Express</option>
          <option value="004">Discover</option>
        </select>
      </div>

      {/* Card Number */}
      <div className="form-group" style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Card Number*"
          value={formData.cardNumber}
          onChange={(e) => {
            const formatted = formatCardNumber(e.target.value);
            if (formatted.replace(/\s/g, '').length <= 19) { // Max 19 digits
              handleInputChange('cardNumber', formatted);
            }
          }}
          required
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
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Expiry Date and CVV */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <select
          value={formData.expiryMonth}
          onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
          required
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
            borderRadius: '4px'
          }}
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {String(i + 1).padStart(2, '0')}
            </option>
          ))}
        </select>

        <select
          value={formData.expiryYear}
          onChange={(e) => handleInputChange('expiryYear', e.target.value)}
          required
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
            borderRadius: '4px'
          }}
        >
          <option value="">Year</option>
          {Array.from({ length: 20 }, (_, i) => {
            const year = new Date().getFullYear() + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          placeholder="CVV*"
          value={formData.cvv}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Only digits
            if (value.length <= 4) { // Max 4 digits for Amex
              handleInputChange('cvv', value);
            }
          }}
          required
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
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Security Notice */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        backgroundColor: '#e8f5e8',
        borderRadius: '5px',
        border: '1px solid #4caf50',
        marginBottom: '20px'
      }}>
        <span style={{ color: '#4caf50', fontSize: '18px' }}>🔒</span>
        <span style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '14px' }}>
          Your payment is secured by Cybersource
        </span>
      </div>

      {/* Payment Button */}
      <button
        className="tf-btn btn-reset"
        disabled={loading}
        onClick={payButtonClicked}
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: loading ? '#ccc' : '#007cba',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        {loading ? 'Processing Payment...' : `Pay AED ${onShippingInfoUpdate().totalPrice?.toFixed(2)}`}
      </button>

{/*       
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          fontSize: '12px'
        }}>
          <strong>Debug Info:</strong><br />
          Card Type: {formData.cardType}<br />
          Card Number: {formData.cardNumber}<br />
          Expiry: {formData.expiryMonth}/{formData.expiryYear}<br />
          CVV: {formData.cvv}<br />
          Loading: {loading ? 'Yes' : 'No'}
        </div>
      )} */}
    </div>
  );
}

export default function Checkout() {
  const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
  const { cartProducts, totalPrice, loginUser, setCartProducts, discount } = useContextElement();
  console.log('Cart Products:', cartProducts);
  const navigate = useNavigate();
  

  // Callback function to provide data to PaymentForm
  const getCheckoutData = () => {
    return {
      loginUser,
      cartProducts,
      totalPrice,
      discount
    };
  };

  // This function can be removed as we're now handling order creation in PaymentForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    // This function is no longer needed as we handle everything in PaymentForm
    console.log('Form submit handled by PaymentForm component');
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
                    <h5 className="title">Payment Information</h5>
                    <div className="form-payment">
                      <div className="payment-box" id="payment-box">
                        <div className="payment-item payment-choose-card active">
                          <label className="payment-header">
                            <input
                              type="radio"
                              name="paymentmethod"
                              className="tf-check-rounded"
                              defaultChecked
                            />
                            <span className="text-title">Credit Card</span>
                          </label>
                          <div className="payment-body">
                            <p className="text-secondary">
                              Enter your card details below. Your payment is processed securely by Cybersource.
                            </p>
                            <div className="input-payment-box">
                              <div className="list-card" style={{ marginBottom: '15px' }}>
                                <img
                                  width={48}
                                  height={16}
                                  alt="visa"
                                  src="/images/payment/img-7.png"
                                />
                                <img
                                  width={21}
                                  height={16}
                                  alt="mastercard"
                                  src="/images/payment/img-8.png"
                                />
                                <img
                                  width={24}
                                  height={16}
                                  alt="amex"
                                  src="/images/payment/img-10.png"
                                />
                              </div>
                              <PaymentForm onShippingInfoUpdate={getCheckoutData} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
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
                  <div className="top">
                    <div className="item d-flex align-items-center justify-content-between text-button">
                      <span>Discount</span>
                      <span><span className="uae-icon" title="aed" /> {" "} {discount ? discount.toFixed(2) : 0}</span>

                    </div>
                  </div>
                  </div>
                {/* <div className="sec-discount">
                  <Swiper
                    dir="ltr"
                    className="swiper tf-sw-categories"
                    slidesPerView={2.25}
                    breakpoints={{
                      1024: {
                        slidesPerView: 2.25,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                      640: {
                        slidesPerView: 2.5,
                      },
                      0: {
                        slidesPerView: 1.2,
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
                </div> */}
                <div className="sec-total-price">
                  <div className="top">
                    <div className="item d-flex align-items-center justify-content-between text-button">
                      <span>Shipping</span>
                      <span>Free</span>
                      
                    </div>
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