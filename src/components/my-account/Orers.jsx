import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { fetchapi } from "@/utlis/api";

export default function Orders() {
  const { loginUser } = useContextElement();
  const [myorders, setMyorders] = useState([]);

  useEffect(() => {
    if (loginUser) {
      const fetchOrders = async () => {
        try {
          const response = await fetchapi(`images/order-details/${loginUser.email}`);
          setMyorders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      fetchOrders();
    }
  }, [loginUser]);

  return (
    <div className="my-account-content">
      <div className="account-orders">

        <div className="wrap-account-order">
          <table>
            <thead>
              <tr>
                <th className="fw-6">Order</th>
                <th className="fw-6">Date</th>
                <th className="fw-6">Status</th>
                <th className="fw-6">Total</th>
                <th className="fw-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myorders && myorders.length > 0 ? (
                myorders.map((order) => (
                  <tr className="tf-order-item" key={order.order_id}>
                    <td>#{order.order_id}</td>
                    <td>{order.order_date}</td>
                    <td>{order.status}</td>
                    <td><span className="uae-icon" title="aed" /> {" "}{order.total_amount}</td>
                    <td>
                      <Link
                        to={`/my-account-orders-details/${order.order_id}`}
                        className="tf-btn btn-fill btn-primary btn-md radius-4"
                      >
                        <span className="text">View</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
