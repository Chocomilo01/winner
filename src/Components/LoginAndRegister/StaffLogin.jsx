import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const StaffLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [, setCookie] = useCookies(["userToken", "userId"]);

  const onPress = async () => {
    setLoading(true);

    try {
      console.log({
        email,
        password,
        roles: role,
      });
      const response = await fetch(
        "https://winner-3hjl.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            roles: role,
          }),
        },
      );

      const data = await response.json();
      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
        toast.success("Login Successful");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem(
          "username",
          `${data.data.user.firstName} ${data.data.user.lastName}`,
        );
        localStorage.setItem("userId", data.data.user._id);

        setCookie("userToken", data.data.token, {
          path: "/",
          maxAge: 604800,
        });

        setCookie("userId", data.data.user._id, {
          path: "/",
          maxAge: 604800,
        });

        window.location.href = "/";
      } else {
        toast.error(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <ToastContainer position="top-right" />

      <div
        className="d-flex justify-content-center align-items-center px-3"
        style={{
          minHeight: "100vh",
          background: "hsla(0, 0%, 3%, 0.94)",
        }}
      >
        <div
          className="card border-0 shadow-lg"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="text-center text-white py-4"
            style={{
              background: "rgb(64, 248, 125)",
            }}
          >
            <img
              src="/images/logo/logo.png"
              alt="logo"
              className="rounded-circle shadow"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
                border: "4px solid #fff",
                background: "#fff",
              }}
            />

            <h3 className="fw-bold mt-3 mb-1">Staff Login</h3>

            <p className="mb-0">winner savings Cooperative Society</p>
          </div>

          {/* Body */}
          <div className="card-body p-4 p-md-5">
            <div className="mb-3">
              <label className="fw-semibold mb-2">Email Address</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            <div className="mb-3">
              <label className="fw-semibold mb-2">Password</label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: "12px 0 0 12px",
                    padding: "12px",
                  }}
                />

                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="fw-semibold mb-2">Role</label>

              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="superAdmin">Super Admin</option>
                <option value="manager">Manager</option>
                <option value="accountManager">Account Manager</option>
                <option value="accountOfficer">Account Officer</option>
                <option value="dpo">DPO</option>
              </select>
            </div>

            <button
              className="btn w-100 fw-bold py-3"
              style={{
                background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
              }}
              onClick={onPress}
            >
              Login
            </button>

            <button
              className="btn btn-link w-100 mt-3 text-decoration-none"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffLogin;
