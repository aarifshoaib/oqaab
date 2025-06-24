import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useContextElement } from "@/context/Context";


export default function PaymentResult() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState(null);
    const { setCartProducts } = useContextElement();

    useEffect(() => {
        const success = searchParams.get('success') === 'true';
        const decision = searchParams.get('decision');
        const transactionId = searchParams.get('transactionId');
        const orderReference = searchParams.get('orderReference');
        const amount = searchParams.get('amount');
        const reasonCode = searchParams.get('reasonCode');
        const error = searchParams.get('error');

        setPaymentData({
            success,
            decision,
            transactionId,
            orderReference,
            amount,
            reasonCode,
            error
        });

        console.log(decision, orderReference, success, amount, reasonCode, error);

        if (decision === 'ACCEPT' && orderReference) {
        // Payment successful - clear cart
            setCartProducts([]);
            localStorage.removeItem('cartList'); // Clear cart from local storage
            updateOrderStatus(orderReference, 'completed');
        }
        else if (decision === 'DECLINE' || decision === 'ERROR') {
            // Payment failed - don't clear cart, let user try again
            if (orderReference) {
                updateOrderStatus(orderReference, 'failed');
            }

            alert('Payment failed. Please try again.');
            navigate('/checkout', { replace: true });

        } else {
            // Invalid access or missing data
            navigate('/checkout', { replace: true });
          }
       

        // Auto-redirect after successful payment (optional)
        if (success && orderReference) {
            setTimeout(() => {
                navigate(`/order-confirmation/${orderReference}`);
            }, 5000);
        }
    }, [searchParams, navigate, setCartProducts]);

    const updateOrderStatus = async (orderReference, status) => {
        try {
            // await fetch(`https://safaerp.com/apex/oqaab_fashions/images/Orders/${orderId}/status`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ status })
            // });
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
      };

    if (!paymentData) {
        return <div>Loading...</div>;
    }

    const getStatusMessage = () => {
        if (paymentData.error) {
            return `Payment Error: ${paymentData.error}`;
        }

        switch (paymentData.decision) {
            case 'ACCEPT':
                return 'Your payment has been processed successfully!';
            case 'DECLINE':
                return 'Your payment was declined. Please try again with a different payment method.';
            case 'REVIEW':
                return 'Your payment is under review. We will contact you shortly.';
            case 'ERROR':
                return 'There was an error processing your payment. Please try again.';
            case 'CANCEL':
                return 'Payment was cancelled.';
            default:
                return `Payment status: ${paymentData.decision}`;
        }
    };

    return (
        <section style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div style={{
                            backgroundColor: 'white',
                            padding: '40px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            textAlign: 'center'
                        }}>
                            {/* Status Icon */}
                            <div style={{
                                fontSize: '64px',
                                marginBottom: '20px',
                                color: paymentData.success ? '#4caf50' : '#f44336'
                            }}>
                                {paymentData.success ? '✅' : '❌'}
                            </div>

                            {/* Status Title */}
                            <h1 style={{
                                color: paymentData.success ? '#4caf50' : '#f44336',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}>
                                Payment {paymentData.success ? 'Successful' : 'Failed'}
                            </h1>

                            {/* Status Message */}
                            <p style={{
                                color: '#666',
                                fontSize: '16px',
                                marginBottom: '30px',
                                lineHeight: '1.5'
                            }}>
                                {getStatusMessage()}
                            </p>

                            {/* Payment Details */}
                            {(paymentData.transactionId || paymentData.orderReference || paymentData.amount) && (
                                <div style={{
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    margin: '20px 0',
                                    textAlign: 'left'
                                }}>
                                    {paymentData.transactionId && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '10px',
                                            borderBottom: '1px solid #eee',
                                            paddingBottom: '8px'
                                        }}>
                                            <span style={{ fontWeight: 'bold', color: '#333' }}>Transaction ID:</span>
                                            <span style={{ color: '#666' }}>{paymentData.transactionId}</span>
                                        </div>
                                    )}
                                    {paymentData.orderReference && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '10px',
                                            borderBottom: '1px solid #eee',
                                            paddingBottom: '8px'
                                        }}>
                                            <span style={{ fontWeight: 'bold', color: '#333' }}>Order Reference:</span>
                                            <span style={{ color: '#666' }}>{paymentData.orderReference}</span>
                                        </div>
                                    )}
                                    {paymentData.amount && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '10px',
                                            borderBottom: '1px solid #eee',
                                            paddingBottom: '8px'
                                        }}>
                                            <span style={{ fontWeight: 'bold', color: '#333' }}>Amount:</span>
                                            <span style={{ color: '#666' }}>AED {paymentData.amount}</span>
                                        </div>
                                    )}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <span style={{ fontWeight: 'bold', color: '#333' }}>Status:</span>
                                        <span style={{ color: '#666' }}>{paymentData.decision}</span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div style={{ marginTop: '30px' }}>
                                {paymentData.success ? (
                                    <Link
                                        to={`/order-confirmation/${paymentData.orderReference}`}
                                        className="tf-btn"
                                        style={{
                                            marginRight: '10px',
                                            padding: '12px 30px',
                                            fontSize: '16px'
                                        }}
                                    >
                                        View Order Details
                                    </Link>
                                ) : (
                                    <Link
                                        to="/checkout"
                                        className="tf-btn"
                                        style={{
                                            marginRight: '10px',
                                            padding: '12px 30px',
                                            fontSize: '16px'
                                        }}
                                    >
                                        Try Again
                                    </Link>
                                )}
                                <Link
                                    to="/"
                                    className="tf-btn"
                                    style={{
                                        backgroundColor: '#6c757d',
                                        padding: '12px 30px',
                                        fontSize: '16px'
                                    }}
                                >
                                    Continue Shopping
                                </Link>
                            </div>

                            {/* Auto-redirect notice */}
                            {paymentData.success && paymentData.orderReference && (
                                <p style={{
                                    marginTop: '20px',
                                    fontSize: '14px',
                                    color: '#888',
                                    fontStyle: 'italic'
                                }}>
                                    You will be automatically redirected to order details in 5 seconds...
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}