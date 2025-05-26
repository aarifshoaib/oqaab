import React, { useState } from "react";
import { useContextElement } from "@/context/Context";
import { useNavigate } from "react-router-dom";
export default function Information() {
  const { loginUser, handleLogin, handleLogout } = useContextElement();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [isEditing, setIsEditing] = useState(false);
  const nav = useNavigate();
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
  const toggleNewPassword = () => {
    setNewPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };
  const toggleOldPassword = () => {
    setOldPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    if (payload.newPassword !== payload.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const payloadWithEmail = {
      email: loginUser?.email,
      newPassword: payload.newPassword,
      oldPassword: payload.oldPassword
    };
    try {
      const response = await fetch("https://safaerp.com/apex/oqaab_fashions/images/change-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payloadWithEmail)
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const result = await response.json();
      if (result.status == '2') {
        alert(result.message);
        return;
      } else {
        handleLogout();
        nav("/login", { replace: true });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Password update failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      const form = e.target;
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      console.log(payload);

      try {
        const response = await fetch("https://safaerp.com/apex/oqaab_fashions/images/customer-update/", {
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
        } else {
          setIsEditing(false);
          handleLogin({ ...payload, isLogin: true });

        }
      } catch (error) {
        console.error("Error:", error);
        console.log("Submission failed.");
      }
    }
  }

  return (
    <div className="my-account-content">
      <div className="account-details">
        <form
          onSubmit={(e) => handleSubmit(e)}
          method="post"
          className="form-account-details form-has-password"
        >
          <div className="account-info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 className="title">Information</h5>
              <div className="button d-flex justify-content-end mb_20">
                <button
                  type="submit"
                  className="tf-btn btn-fill btn-style-1 radius-4"
                  onClick={() => setIsEditing((prev) => !prev)}
                  style={{ minWidth: 80 }}
                >
                  <span className="text text-button">{isEditing ? "Save" : "Edit"}</span>

                </button>
              </div>

            </div>
            <div className="cols mb_20">
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="First Name*"
                  name="fname"
                  tabIndex={2}
                  defaultValue={loginUser?.fname}
                  aria-required="true"
                  required
                  readOnly={!isEditing}
                />
              </fieldset>
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="Last Name*"
                  name="lname"
                  tabIndex={3}
                  defaultValue={loginUser?.lname}
                  aria-required="true"
                  required
                  readOnly={!isEditing}
                />
              </fieldset>
            </div>
            <div className="cols mb_20">
              <fieldset className="">
                <input
                  className=""
                  type="email"
                  placeholder="Username or email address*"
                  name="email"
                  tabIndex={4}
                  defaultValue={loginUser?.email}
                  aria-required="true"
                  required
                  readOnly
                />
              </fieldset>
            </div>
            <div className="cols mb_20">

              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="Phone*"
                  name="phone"
                  tabIndex={5}
                  defaultValue={loginUser?.phone}
                  aria-required="true"
                  required
                  readOnly={!isEditing}
                />
              </fieldset>
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="Whatsapp"
                  name="whatsapp"
                  tabIndex={6}
                  defaultValue={loginUser?.whatsapp}
                  aria-required="false"
                  readOnly={!isEditing}
                />
              </fieldset>
            </div>

          </div>
        </form>
        <form className="form-account-details form-has-password"
          onSubmit={(e) => handlePasswordSubmit(e)}
          method="post">
          <div className="account-password">
            <h5 className="title">Change Password</h5>

            <fieldset className="position-relative password-item mb_20">
              <input
                className="input-password"
                type={oldPasswordType}
                placeholder="Old Password*"
                name="oldPassword"
                tabIndex={2}
                defaultValue=""
                aria-required="true"
                required
              />
              <span
                className={`toggle-password ${!(oldPasswordType === "text") ? "unshow" : ""
                  }`}
                onClick={toggleOldPassword}
              >
                <i
                  className={`icon-eye-${!(newPasswordType === "text") ? "hide" : "show"
                    }-line`}
                />
              </span>
            </fieldset>

            <fieldset className="position-relative password-item mb_20">
              <input
                className="input-password"
                type={newPasswordType}
                placeholder="New Password*"
                name="newPassword"
                tabIndex={2}
                defaultValue=""
                aria-required="true"
                required
              />
              <span
                className={`toggle-password ${!(newPasswordType === "text") ? "unshow" : ""
                  }`}
                onClick={toggleNewPassword}
              >
                <i
                  className={`icon-eye-${!(newPasswordType === "text") ? "hide" : "show"
                    }-line`}
                />
              </span>
            </fieldset>
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
          </div>
          <div className="button">
            <button className="tf-btn btn-fill" type="submit">
              <span className="text text-button">Update Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
