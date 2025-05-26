import React from "react";
import CartLength from "./CartLength";

export default function CartTogglerSide() {
  return (
    <>
      <a
        href="#shoppingCart"
        data-bs-toggle="modal"
        className="btn-fixed-cart d-none d-lg-flex"
      >
        <svg
          className="icon"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5078 10.8734V6.36686C16.5078 5.17166 16.033 4.02541 15.1879 3.18028C14.3428 2.33514 13.1965 1.86035 12.0013 1.86035C10.8061 1.86035 9.65985 2.33514 8.81472 3.18028C7.96958 4.02541 7.49479 5.17166 7.49479 6.36686V10.8734M4.11491 8.62012H19.8877L21.0143 22.1396H2.98828L4.11491 8.62012Z"
            stroke="#FFFFFF"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="count-box">
          <CartLength />
        </span>
      </a>
      <a href="https://wa.me/+971521238643" className="btn-fixed-whatsapp d-none d-lg-flex social-whatsapp" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17.6 6.32A8.78 8.78 0 0 0 11.9 4C7.23 4 3.4 7.83 3.4 12.5c0 1.55.45 3.07 1.3 4.36L3.34 21l4.25-1.1a8.75 8.75 0 0 0 4.31 1.1h.004c4.67 0 8.5-3.83 8.5-8.5 0-2.26-.88-4.38-2.46-5.98l-.004-.004z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <path
            d="M17.07 15.57c-.22.62-1.3 1.17-1.77 1.2-.48.02-.93.22-3.11-.77-2.6-1.19-4.22-4.1-4.35-4.29-.12-.18-1-1.32-1-2.51 0-1.2.61-1.8.85-2.04.24-.25.51-.31.68-.31.17 0 .35.01.5.02.16.01.37.02.56.44.2.42.67 1.47.73 1.58.06.11.1.23.02.38-.08.15-.12.23-.23.36-.12.12-.24.27-.35.37-.12.1-.24.21-.1.42.14.21.6.88 1.3 1.45 1 .8 1.8 1.05 2.07 1.17.27.12.42.1.57-.5.15-.15.64-.69.81-.93.17-.24.34-.2.57-.12.23.08 1.47.73 1.73.86.25.13.43.2.49.3.06.12.06.64-.16 1.26z"
            fill="#FFFFFF"
          />
        </svg>
      </a>

    </>
  );
}
