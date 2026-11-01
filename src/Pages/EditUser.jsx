import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bvn: "",
    roles: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  // ==========================================
  // FETCH USER
  // ==========================================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://winnerbe.onrender.com/api/v1/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        console.log("User being edited:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user");
        }

        const user = data.data;
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          bvn: user.bvn || "",
          roles: user.roles || "",
          status: user.status || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(error.message || "Unable to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT UPDATE
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.roles) {
      toast.error("Please select a user role");
      return;
    }

    if (!formData.status) {
      toast.error("Please select a status");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `https://winnerbe.onrender.com/api/v1/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      console.log("Update response:", data);

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to update user");
      }

      toast.success("User updated successfully");

      setTimeout(() => {
        navigate("/users-list");
      }, 1000);
    } catch (error) {
      console.error("Error updating user:", error);

      toast.error(error.message || "Unable to update user");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <ToastContainer />

      {loading && <Loader />}

      {!loading && (
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Edit User</h4>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* FIRST NAME */}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">First Name</label>

                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                    </div>

                    {/* LAST NAME */}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Last Name</label>

                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                      />
                    </div>

                    {/* EMAIL */}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Email</label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>
                    {/* PHONE */}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Phone Number</label>

                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                    </div>

                    {/* BVN */}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">BVN</label>

                      <input
                        type="text"
                        name="bvn"
                        className="form-control"
                        value={formData.bvn}
                        onChange={handleChange}
                        placeholder="BVN"
                      />
                    </div>

                    {/* ROLE */}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">User Type</label>

                      <select
                        name="roles"
                        className="form-control"
                        value={formData.roles}
                        onChange={handleChange}
                      >
                        <option value="">Select Role</option>

                        <option value="superAdmin">Super Admin</option>

                        <option value="manager">Manager</option>

                        <option value="accountOfficer">Account Officer</option>

                        <option value="dpo">DPO</option>

                        <option value="assistantManager">
                          Assistant Manager
                        </option>
                      </select>
                    </div>

                    {/* STATUS */}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Status</label>

                      <select
                        name="status"
                        className="form-control"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>

                        <option value="active">Active</option>

                        <option value="inactive">Inactive</option>

                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                      disabled={saving}
                    >
                      {saving ? "Updating..." : "Update User"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/users-list")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUser;
