import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5200/api/v1/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data.data);
        setUsers(data.data);
      })
      .catch((error) => console.log("Error fetching data: ", error))
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, [token]);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5200/api/v1/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      console.log("Delete response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      // Remove the deleted user from the current list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.message || "Unable to delete user");
    } finally {
      setLoading(false);
    }
  };
  function camelToNormalCase(text) {
    if (!text) return "N/A";

    return text
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }
  return (
    <>
      {loading && <Loader />}
      <div className="card">
        <div className="card-header">
          <h4 class="card-title">Users'List</h4>

          <form class="d-flex align-items-center flex-wrap flex-sm-nowrap">
            <div class="mb-3 mt-2 mx-sm-2">
              <label class="sr-only">Search</label>
              <input type="Search" class="form-control" placeholder="Search" />
            </div>
            &nbsp;
            <button type="submit" class="btn btn-primary mb-2">
              Search
            </button>
            &nbsp;&nbsp;
            <a href="/add-user" className="btn btn-primary mb-2">
              Add New User
            </a>
          </form>
        </div>
        <div className="card-body">
          <div class="table-responsive">
            <table class="table table-responsive-md">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>
                    <strong>#</strong>
                  </th>
                  <th>
                    <strong>Name</strong>
                  </th>
                  <th>
                    <strong>Email</strong>
                  </th>
                  <th>
                    <strong>User Type</strong>
                  </th>
                  <th>
                    <strong>Status</strong>
                  </th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr>
                    <td>
                      <strong>{index + 1}</strong>
                    </td>
                    <td>
                      {item.firstName}&nbsp;
                      {item.lastName}
                      <br />
                      {camelToNormalCase(item.roles)}
                    </td>
                    <td>{item.email}</td>
                    <td>{camelToNormalCase(item.roles)}</td>
                    <td>
                      <span class="badge light badge-success">
                        {camelToNormalCase(item.status)}
                      </span>
                    </td>

                    <td>
                      <div class="dropdown">
                        <button
                          type="button"
                          class="btn btn-success light sharp"
                          data-bs-toggle="dropdown"
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </button>
                        <div className="dropdown-menu">
                          <Link
                            to={`/user-details/${item._id}`}
                            className="dropdown-item"
                          >
                            View Details
                          </Link>

                          <Link
                            to={`/edit-user/${item._id}`}
                            className="dropdown-item"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersList;
