import React from "react";
import { Link , useParams} from "react-router-dom";
export default function OrderTrac() {
  let params = useParams();
  const id = params.id;
  return (
    <section className="flat-spacing">
      <div className="container">
        
          <div className="text-center mb_40">
            <h4 className="mb_8">Thank You !!!</h4>
            <p className="text-secondary mb-3">
              Your order has been received and is now being processed.
            </p>
            <p className="text-primary mb-3">
              Your Order Reference Number # <strong>{id}</strong>.
            </p>
            <p className="text-secondary mb-3">
              You will receive an email confirmation shortly.
            </p>
            <p className="text-secondary mb-3">
              If you have any questions, please contact us.
            </p>
            <Link to={`/all-collections`} className="tf-btn btn-fill mb-3">
              <span className="text">Explore</span>
            </Link>
          </div>
        
      </div>
    </section>
  );
}
