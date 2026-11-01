import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
const Users = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://winnerbe.onrender.com/api/v1/users", {
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
        setCustomers(data.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, []);
  return (
    <div className="row">
      <div class="col-xl-4  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-primary">
          <div class="card-body  p-4">
            <div class="media">
              <span class="me-3">
                <i class="la la-users"></i>
              </span>
              <div class="media-body text-white">
                <p class="mb-1">All Users</p>
                <h3 class="text-white">{customers.length}</h3>
                <div class="progress mb-2 bg-secondary">
                  <div
                    class="progress-bar progress-animated bg-white"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                {/* <small>80% Increase in 20 Days</small> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-primary">
          <div class="card-body  p-4">
            <div class="media">
              <span class="me-3">
                <i class="la la-users"></i>
              </span>
              <div class="media-body text-white">
                <p class="mb-1">MANAGER(S)</p>
                <h3 class="text-white">
                  {
                    customers.filter(
                      (user) => user.roles.toLowerCase() === "manager",
                    ).length
                  }
                </h3>
                <div class="progress mb-2 bg-secondary">
                  <div
                    class="progress-bar progress-animated bg-white"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-primary">
          <div class="card-body  p-4">
            <div class="media">
              <span class="me-3">
                <i class="la la-users"></i>
              </span>
              <div class="media-body text-white">
                <p class="mb-1">ACCOUNT OFFICER(S)</p>
                <h3 className="text-white">
                  {
                    customers.filter(
                      (item) => item.roles.toLowerCase() === "accountofficer",
                    ).length
                  }
                </h3>
                <div class="progress mb-2 bg-secondary">
                  <div
                    class="progress-bar progress-animated bg-white"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-primary">
          <div class="card-body  p-4">
            <div class="media">
              <span class="me-3">
                <i class="la la-users"></i>
              </span>
              <div class="media-body text-white">
                <p class="mb-1">DPO(S)</p>
                <h3 class="text-white">
                  {
                    customers.filter(
                      (user) => user.roles.toLowerCase() === "dpo",
                    ).length
                  }
                </h3>
                <div class="progress mb-2 bg-secondary">
                  <div
                    class="progress-bar progress-animated bg-white"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-primary">
          <div class="card-body  p-4">
            <div class="media">
              <span class="me-3">
                <i class="la la-users"></i>
              </span>
              <div class="media-body text-white">
                <p class="mb-1">ASSISTANT MANAGER(S)</p>
                <h3 class="text-white">1</h3>
                <div class="progress mb-2 bg-secondary">
                  <div
                    class="progress-bar progress-animated bg-white"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
