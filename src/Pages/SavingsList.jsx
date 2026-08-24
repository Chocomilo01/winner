import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const SavingsList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [allCustomers, setAllCustomers] = useState([]); // stores all fetched data
  const [displayedCustomers, setDisplayedCustomers] = useState([]); // stores data currently displayed in table
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [selectedBalanceDate, setSelectedBalanceDate] = useState(null);
  const [customerBalances, setCustomerBalances] = useState({});

  const customersPerPage = 10;
  const pagesVisited = pageNumber * customersPerPage;
  const token = localStorage.getItem("token");

  const handleBalanceDateChange = (event) => {
    setSelectedBalanceDate(event.target.value);
  };
  useEffect(() => {
    setLoading(true); // Show loader when fetching data
    fetch("http://localhost:5200/api/v1/customers", {
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
      .finally(() => setLoading(false)); // Hide loader after fetching data
  }, [pageNumber]);

  const pageCount = Math.ceil(customers.length / customersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);

    // Simulate a delay to show the loader (optional, but useful for testing)
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
        setDeleting(true);
        fetch(`http://localhost:5200/api/v1/customers/${customerId}`, {
          method: "DELETE",
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
            // If successfully deleted from backend, remove from local state
            const updatedCustomers = customers.filter(
              (customer) => customer._id !== customerId,
            );
            toast.success("Customer Deleted Successfully");
            setCustomers(updatedCustomers);
          })
          .catch((error) => {
            console.log("Error deleting customer: ", error);
            toast.error("Failed to delete customer");
          })
          .finally(() => {
            // Hide loader
            setDeleting(false);
          });
      }
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);

    // Immediately filter the data when a date is selected
    const date = new Date(event.target.value);
    const filteredCustomers = allCustomers.filter((customer) => {
      const customerCreatedAt = new Date(customer.updatedAt);
      return customerCreatedAt.toDateString() === date.toDateString();
    });

    setDisplayedCustomers(filteredCustomers);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filteredCustomers = allCustomers.filter((customer) =>
      customer.accountNumber
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    );
    setDisplayedCustomers(filteredCustomers);
  };

  const handleSearchName = (event) => {
    setSearchQuery2(event.target.value);
    const filteredCustomers = allCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setDisplayedCustomers(filteredCustomers);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toDateString(undefined, options);
  };

  const exportToExcel = async () => {
    if (!selectedBalanceDate) {
      toast.error("Please select a date first");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("🔄 Preparing export...", {
      autoClose: false,
    });

    try {
      // Initialize Excel workbook
      const workbook = XLSX.utils.book_new();

      // Process in batches
      const BATCH_SIZE = 50;
      let allRows = [];

      for (let i = 0; i < allCustomers.length; i += BATCH_SIZE) {
        const batch = allCustomers.slice(i, i + BATCH_SIZE);
        toast.update(toastId, {
          render: `📦 Processing ${Math.min(i + BATCH_SIZE, allCustomers.length)}/${allCustomers.length} records...`,
        });

        const batchRows = await Promise.all(
          batch.map(async (customer) => {
            try {
              // Fetch transactions for balance calculation
              const response = await fetch(
                `http://localhost:5200/api/v1/customers/${customer._id}/transactions`,
                { headers: { Authorization: `Bearer ${token}` } },
              );
              const transactions = await response.json();

              // Calculate balance for selected date
              const balanceOnDate =
                transactions
                  .filter(
                    (t) =>
                      new Date(t.paymentDate).toDateString() ===
                      new Date(selectedBalanceDate).toDateString(),
                  )
                  .slice(-1)[0]?.balance || customer.accountBalance;

              // Create a new object with ALL original fields + calculated balance
              return {
                ...customer,
                balanceOnSelectedDate: balanceOnDate,
              };
            } catch (error) {
              console.error(
                `Failed to process ${customer.accountNumber}:`,
                error,
              );
              return {
                ...customer,
                balanceOnSelectedDate: "Error",
              };
            }
          }),
        );

        allRows = [...allRows, ...batchRows];
        await new Promise((resolve) => setTimeout(resolve, 100)); // Prevent UI freeze
      }

      // Create worksheet with all data
      // ✅ Sort alphabetically before export
      allRows.sort((a, b) => {
        return (a.name || "").localeCompare(b.name || "");
      });

      // Create worksheet with all data
      const worksheet = XLSX.utils.json_to_sheet(allRows);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

      // Export
      XLSX.writeFile(
        workbook,
        `Full_Customer_Export_${selectedBalanceDate}.xlsx`,
      );
      toast.update(toastId, {
        render: `✅ Success! Exported ${allRows.length} records`,
        type: "success",
        autoClose: 5000,
        isLoading: false,
      });
    } catch (error) {
      toast.update(toastId, {
        render: `❌ Export failed: ${error.message}`,
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchBalancesForDate = async () => {
    if (!selectedBalanceDate) {
      toast.error("Please select a date");
      return;
    }

    setLoading(true);

    try {
      const balances = {};

      // Fetch transactions for each displayed customer
      for (const customer of displayedCustomers) {
        const response = await fetch(
          `http://localhost:5200/api/v1/customers/${customer._id}/transactions`, // Assuming the endpoint returns transactions
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        console.log("Transactions for customer:", customer._id, data);

        // Filter transactions for the selected date
        const transactionsOnDate = data.filter((transaction) => {
          const transactionDate = new Date(
            transaction.paymentDate,
          ).toDateString();
          const selectedDate = new Date(selectedBalanceDate).toDateString();
          return transactionDate === selectedDate;
        });

        console.log("Transactions on selected date:", transactionsOnDate);

        // Calculate the available balance for the selected date
        if (transactionsOnDate.length > 0) {
          // Use the last transaction's balance for the selected date
          balances[customer._id] =
            transactionsOnDate[transactionsOnDate.length - 1].balance;
        } else {
          // If no transaction is found, use the last available balance
          balances[customer._id] = customer.accountBalance;
        }
      }

      console.log("Balances:", balances);
      setCustomerBalances(balances);
    } catch (error) {
      console.error("Error fetching balances:", error);
      toast.error("Failed to fetch balances");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setCustomerBalances({}); // Reset balances when customers are fetched
  }, [allCustomers]);

  return (
    <>
      {loading && <Loader />}
      {deleting && <Loader />}
      <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">All Savings</h4>

          {/* <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
            <div className="mb-3 mt-2 mx-sm-2">
              <label className="sr-only">Search</label>
              <input
                type="date"
                className="form-control"
                placeholder="Search"
                onChange={handleDateChange}
              />{" "}
            </div>
            &nbsp;
            <button type="submit" className="btn btn-primary mb-2">
              Filter By Date
            </button>
          </div> */}
          <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
            <div className="mb-3 mt-2 mx-sm-2">
              <label className="sr-only">Select Date for Balance</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select Date for Balance"
                onChange={handleBalanceDateChange}
              />
            </div>
            &nbsp;
            <button
              type="button"
              className="btn btn-primary mb-2"
              onClick={fetchBalancesForDate}
            >
              Fetch Balances
            </button>
          </div>

          <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
            <div className="mb-3 mt-2 mx-sm-2">
              <label className="sr-only">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Account Number"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            &nbsp;
            <div className="mb-3 mt-2 mx-sm-2">
              <label className="sr-only">Search By Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name"
                value={searchQuery2}
                onChange={handleSearchName}
              />
            </div>
            &nbsp;
            <button type="submit" className="btn btn-primary mb-2">
              Search
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-primary mb-2" onClick={exportToExcel}>
              Export As Excel
            </button>
          </div>
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
                    <strong>Customer</strong>
                  </th>
                  <th>
                    <strong>Customer ID</strong>
                  </th>
                  <th>
                    <strong>Phone No</strong>
                  </th>
                  <th>
                    <strong>
                      Balance on {selectedBalanceDate || "Selected Date"}
                    </strong>
                  </th>
                  <th>
                    <strong>Today's Balance(&#8358;)</strong>
                  </th>
                  <th>
                    <strong>Account Officer</strong>
                  </th>
                  <th>
                    <strong>Created At</strong>
                  </th>
                  <th>
                    <strong>Payment Date</strong>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{index + 1 + pagesVisited}</strong>
                    </td>
                    <td>
                      <Link to={`/customer-profile/${customer._id}`}>
                        {customer.name}
                      </Link>
                    </td>
                    <td>{customer.accountNumber}</td>
                    <td>{customer.customersPhoneNo}</td>
                    <td>
                      {customerBalances[customer._id] !== undefined
                        ? customerBalances[customer._id]
                        : "N/A"}
                    </td>
                    <td>{customer.accountBalance}</td>
                    <td>{customer.officerIncharge}</td>
                    <td>{formatDate(customer.createdAt)}</td>
                    <td>{formatDate(customer.updatedAt)}</td>
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
                            to={`/customer-profile/${customer._id}`}
                            class="dropdown-item"
                          >
                            View Details
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
    </>
  );
};

export default SavingsList;
