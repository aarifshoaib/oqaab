import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import "@/../public/css/custom.css";

export default function AccountSidebarMobile() {
  const { loginUser, handleLogout } = useContextElement();
  const { pathname } = useLocation();
  return (
    <div className="wrap-sidebar-account offcanvas-account">
      <div className="sidebar-account">
        <div className="account-avatar">
          <div className="image">
            <img
              alt=""
              src="/images/avatar/user-account.jpg"
              width={80}
              height={80}
            />
          </div>
          <h6 className="mb_4" style={{ fontSize: 16, textAlign: 'center' }}>{loginUser?.fname} {loginUser?.lname}</h6>
          <div className="body-text-1" style={{ fontSize: 16, textAlign: 'center' }}>{loginUser?.email}</div>
        </div>
        <ul className="my-account-nav">
          <li>
            <Link
              to={`/my-account`}
              className={`my-account-nav-item ${pathname == "/my-account" ? "active" : ""}`}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Account Details
            </Link>
          </li>
          <li>
            <Link
              to={`/my-account-orders`}
              className={`my-account-nav-item ${pathname == "/my-account-orders" ? "active" : ""}`}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5078 10.8734V6.36686C16.5078 5.17166 16.033 4.02541 15.1879 3.18028C14.3428 2.33514 13.1965 1.86035 12.0013 1.86035C10.8061 1.86035 9.65985 2.33514 8.81472 3.18028C7.96958 4.02541 7.49479 5.17166 7.49479 6.36686V10.8734M4.11491 8.62012H19.8877L21.0143 22.1396H2.98828L4.11491 8.62012Z" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              My Orders
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`my-account-nav-item ${pathname == "/login" ? "active" : ""}`}
              onClick={handleLogout}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 17L21 12L16 7" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12H9" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
