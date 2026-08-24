import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { CookiesProvider, useCookies } from "react-cookie";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();
  const usertokenlocal = localStorage.getItem("token");

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (/^\d+$/.test(password)) {
      return "Password can't be entirely numeric";
    }
    if (!/(?=.*[a-zA-Z])/.test(password)) {
      return "Password must contain at least one letter";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmed password do not match!");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const payload = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };

    setLoading(true);

    try {
      const response = await fetch(
        `https://winner-3hjl.onrender.com/api/v1/users/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${usertokenlocal}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      console.log(data);
      toast.success("Password Changed Successfully");

      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.message || "An Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CookiesProvider>
        {loading && <Loader />}
        <ToastContainer />
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Change Password</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label className="form-label">Old Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-12">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-12">
                      <ul>
                        <li>
                          Your password can't be too similar to your other
                          personal information.
                        </li>
                        <li>
                          Your password must contain at least 8 characters.
                        </li>
                        <li>
                          Your password can't be a commonly used password.
                        </li>
                        <li>Your password can't be entirely numeric.</li>
                      </ul>
                    </div>
                    <div className="mb-3 col-md-12">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Changing..." : "Save"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </CookiesProvider>
    </>
  );
};

export default ChangePassword;
