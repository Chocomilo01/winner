import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]); // stores all fetched data
  const [displayedCustomers, setDisplayedCustomers] = useState([]); // stores data currently displayed in table
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const customersPerPage = 10;
  const pagesVisited = pageNumber * customersPerPage;

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://winner-3hjl.onrender.com/api/v1/customers", {
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
        toast.success("Customer Fetched Successfully");
        setCustomers(data.data);
        setAllCustomers(data.data);
        setDisplayedCustomers(
          data.data.slice(pagesVisited, pagesVisited + customersPerPage),
        );
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        toast.error("Customer Failed To Fetched");
      })
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, [pageNumber]);

  const pageCount = Math.ceil(customers.length / customersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const deleteCustomer = (customerId) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms deletion, proceed with the deletion
        const token = localStorage.getItem("token");

        setDeleting(true);
        fetch(
          `https://winner-3hjl.onrender.com/api/v1/customers/${customerId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // If successfully deleted from backend, remove from local state
            const updatedCustomers = customers.filter(
              (customer) => customer._id !== customerId,
            );
            toast.success("Customer Deleted Successfully");
            setCustomers(updatedCustomers);

            // Show success message using SweetAlert
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log("Error deleting customer: ", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete customer.",
              icon: "error",
            });
          })
          .finally(() => {
            // Hide loader
            setDeleting(false);
          });
      }
    });
  };

  const handleDateChange = (event) => {
    // Step 2
    setSearchQuery(""); // Reset search query when a date is selected

    // Immediately filter the data when a date is selected
    const date = new Date(event.target.value);
    const filteredCustomers = allCustomers.filter((customer) => {
      const customerCreatedAt = new Date(customer.createdAt);
      return customerCreatedAt.toDateString() === date.toDateString();
    });

    setDisplayedCustomers(
      filteredCustomers.slice(pagesVisited, pagesVisited + customersPerPage),
    );
  };

  const handleSearch = () => {
    // Step 4
    const filteredCustomers = allCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setDisplayedCustomers(
      filteredCustomers.slice(pagesVisited, pagesVisited + customersPerPage),
    );
  };

  return (
    <>
      {loading && <Loader />}
      {deleting && <Loader />}
      <ToastContainer />
      <div class="col-xl-12 col-xxl-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Customers List</h4>
            <div class="d-flex align-items-center flex-wrap flex-sm-nowrap">
              <div class="mb-3 mt-2 mx-sm-2">
                <label class="sr-only">Search</label>
                <input
                  type="date"
                  class="form-control"
                  placeholder="Search"
                  onChange={handleDateChange}
                />
              </div>
              &nbsp;
              <button type="submit" class="btn btn-primary mb-2">
                Filter By Date
              </button>
            </div>
            <div class="d-flex align-items-center flex-wrap flex-sm-nowrap">
              <div class="mb-3 mt-2 mx-sm-2">
                <label class="sr-only">Search</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search by Customer Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              &nbsp;
              <button
                type="submit"
                class="btn btn-primary mb-2"
                onClick={handleSearch}
              >
                Search
              </button>
              &nbsp;&nbsp;
              <a href="add-customer" className="btn btn-primary mb-2">
                Add New Member
              </a>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive active-projects">
              <div className="rowed">
                {/* <form class="d-flex align-items-center flex-wrap flex-sm-nowrap">
                 
                //   <button type="submit" class="btn btn-primary mb-2">
                //     Search
                //   </button>
                // </form> */}
              </div>

              <table id="projects-tbl" class="table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Customer</th>
                    <th>Account NO</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Account Officer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedCustomers.map((customer, index) => (
                    <tr key={index}>
                      <td>{index + 1 + pagesVisited}</td>
                      <td>
                        {" "}
                        <Link
                          to={`/customer-available-balance/${customer._id}`}
                          class="dropdown-item"
                        >
                          {customer.name}{" "}
                        </Link>
                      </td>

                      <td>{customer?.accountNumber}</td>
                      <td>{customer.customersPhoneNo}</td>
                      <td>
                        <span class="badge light badge-success">ACTIVE</span>
                      </td>
                      <td>{customer.officerIncharge}</td>
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
                          <div class="dropdown-menu">
                            <Link
                              to={`/customer-available-balance/${customer._id}`}
                              class="dropdown-item"
                            >
                              View Details
                            </Link>

                            <Link
                              class="dropdown-item"
                              to={`/edit-customer/${customer._id}`}
                            >
                              Edit
                            </Link>
                            <a
                              class="dropdown-item"
                              onClick={() => deleteCustomer(customer._id)}
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination-container"}
                previousLinkClassName={"pagination-button"}
                nextLinkClassName={"pagination-button"}
                pageClassName={"pagination-button"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerList;
