import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    if (payload.password_hash !== payload.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
   // console.log(payload);
    try {
      const response = await fetch("https://safaerp.com/apex/oqaab_fashions/images/customers/", {
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
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed.");
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4>Register</h4>
            </div>
            <form
              onSubmit={handleSubmit}
              className="form-login form-has-password info-box"
            >
              <div className="wrap">

                <input
                  className=""
                  type="text"
                  placeholder="First Name*"
                  name="fname"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
                <input
                  className=""
                  type="text"
                  placeholder="Last Name*"
                  name="lname"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
                <input
                  className=""
                  type="email"
                  placeholder="Email address*"
                  name="email"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
                <input className=""
                type="text"
                placeholder="Phone Number*"
                name="phone"
                tabIndex={2}
                defaultValue=""
                aria-required="true"
                required
                />
                <input className="" 
                type="text" 
                placeholder="Whatsapp Number"
                name="whatsapp"
                tabIndex={2}
                defaultValue=""
                aria-required="false"
                />
                <div className="position-relative password-item">
                  <input
                    className="input-password"
                    type={passwordType}
                    placeholder="Password*"
                    name="password_hash"
                    tabIndex={2}
                    defaultValue=""
                    aria-required="true"
                    required
                  />
                  <span
                    className={`toggle-password ${!(passwordType === "text") ? "unshow" : ""
                      }`}
                    onClick={togglePassword}
                  >
                    <i
                      className={`icon-eye-${!(passwordType === "text") ? "hide" : "show"
                        }-line`}
                    />
                  </span>
                </div>
                <fieldset className="position-relative password-item">
                  <input
                    className="input-password"
                    type={confirmPasswordType}
                    placeholder="Confirm Password*"
                    name="confirmPassword"
                    tabIndex={2}
                    defaultValue=""
                    aria-required="true"
                    required
                  />
                  <span
                    className={`toggle-password ${!(confirmPasswordType === "text") ? "unshow" : ""
                      }`}
                    onClick={toggleConfirmPassword}
                  >
                    <i
                      className={`icon-eye-${!(confirmPasswordType === "text") ? "hide" : "show"
                        }-line`}
                    />
                  </span>
                </fieldset>
                <div className="d-flex align-items-center">
                  <div className="tf-cart-checkbox">
                    <div className="tf-checkbox-wrapp">
                      <input
                        defaultChecked
                        className=""
                        type="checkbox"
                        id="login-form_agree"
                        name="agree_checkbox"
                        required={true}
                        aria-required="true"
                      />
                      <div>
                        <i className="icon-check" />
                      </div>
                    </div>
                    <label
                      className="text-secondary-2"
                      htmlFor="login-form_agree"
                    >
                      I agree to the&nbsp;
                    </label>
                  </div>
                  <Link to={`/term-of-use`} title="Terms of Service">
                    Terms of User
                  </Link>
                </div>
              </div>
              <div className="button-submit">
                <button className="tf-btn btn-fill" type="submit">
                  <span className="text text-button">Register</span>
                </button>
              </div>
            </form>
          </div>
          <div className="right">
            <h4 className="mb_8">Already have an account?</h4>
            <p className="text-secondary">
              Welcome back. Sign in to access your personalized experience,
              saved preferences, and more. We're thrilled to have you with us
              again!
            </p>
            <Link to={`/login`} className="tf-btn btn-fill">
              <span className="text text-button">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
