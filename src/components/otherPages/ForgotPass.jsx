import React from "react";
import { Link } from "react-router-dom";
import { fetchapi } from "@/utlis/api";
import { useNavigate } from "react-router-dom";
export default function ForgotPass() {
  const navigate = useNavigate();
  const sendMail = async (email) => {
    return await fetchapi('images/forgot-password/'+email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const email = payload.email;
      const response = await sendMail(email);
      console.log(response);
      navigate("/login", { replace: true });
  }catch (error) {
      console.error("Error:", error);
      alert("Password update failed.");
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4 className="mb_8">Reset your password</h4>
              <p>We will send you an email about your password</p>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="form-login">
              <div className="wrap">
                <fieldset className="">
                  <input
                    className=""
                    type="email"
                    placeholder="Username or email address*"
                    name="email"
                    tabIndex={2}
                    defaultValue=""
                    aria-required="true"
                    required
                  />
                </fieldset>
              </div>
              <div className="button-submit">
                <button className="tf-btn btn-fill" type="submit">
                  <span className="text text-button">Submit</span>
                </button>
              </div>
            </form>
          </div>
          <div className="right">
            <h4 className="mb_8">New Customer</h4>
            <p className="text-secondary">
              Be part of our growing family of new customers! Join us today and
              unlock a world of exclusive benefits, offers, and personalized
              experiences.
            </p>
            <Link to={`/register`} className="tf-btn btn-fill">
              <span className="text text-button">Register</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
