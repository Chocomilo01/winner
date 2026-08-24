import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Img from "../Assets/logofull.png";

import * as XLSX from "xlsx";

const CustomerProfile = () => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [selectedMode, setSelectedMode] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [loanProfile, setLoanProfile] = useState(null);
  const [allCustomers, setAllCustomers] = useState([]); // stores all fetched data
  const [displayedCustomers, setDisplayedCustomers] = useState([]); // stores data currently displayed in table
  const [pageNumber, setPageNumber] = useState(0);
  const imgData = Img;

  const customersPerPage = 10;
  const pagesVisited = pageNumber * customersPerPage;
  const token = localStorage.getItem("token");

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        setLoading(true);

        const response = await fetch(
          `https://winner-3hjl.onrender.com/api/v1/loans/customer/${id}/loans`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        setLoans(data.data);
        const promises = data.data?.map(async (loan) => {
          const customerId = loan.customer;
          if (customerId) {
            const token = localStorage.getItem("token");

            const customerResponse = await fetch(
              `https://winner-3hjl.onrender.com/api/v1/customers/${customerId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            const customerData = await customerResponse.json();
            return customerData.data;
          }
          return null;
        });

        // Wait for all customer details to be fetched
        const customerResults = await Promise.all(promises);
        setCustomerData(customerResults);
        toast.success("Fetched All");
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast.error("Failed to fetch loan data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`https://winner-3hjl.onrender.com/api/v1/customers/${id}`, {
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
        console.log("Fetched Specific Customer Data:", data.data);
        setCustomerDetails(data.data);
      })
      .catch((error) =>
        console.log("Error fetching specific customer data: ", error),
      )
      .finally(() => setLoading(false));
  }, [id]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `https://winner-3hjl.onrender.com/api/v1/customers/${id}/transactions`,
      {
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
        console.log("Fetched Specific Customer Data:", data);
        setTransactions(data);
        setDisplayedCustomers(
          data.slice(pagesVisited, pagesVisited + customersPerPage),
        );
      })
      .catch((error) =>
        console.log("Error fetching specific customer data: ", error),
      )
      .finally(() => setLoading(false));
  }, [id, pageNumber]);

  const pageCount = Math.ceil(transactions.length / customersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };
  const filteredTransactions = displayedCustomers.filter((transact) => {
    if (selectedMode === "all") {
      return true;
    } else {
      return transact.modeOfPayment === selectedMode;
    }
  });

  useEffect(() => {
    const matchingLoan = loans.find(
      (loan) => loan.customer?._id === id || loan.customer === id,
    );

    if (matchingLoan) {
      setLoanProfile(matchingLoan._id);
      console.log("Customer Loan Profile:", matchingLoan);
    } else {
      setLoanProfile(null);
      toast.info("This customer does not have any active loan profile");
    }
  }, [loans, id]);
  const exportToExcel = () => {
    const doc = new jsPDF();

    doc.addImage(imgData, "PNG", 150, 10, 40, 15);
    doc.setFontSize(16);
    doc.text("winners Savings LTD", 14, 25);

    doc.setFontSize(8);
    doc.text("No 6, Post Office Road Mushin Lagos", 14, 30);

    doc.setFontSize(10);
    doc.text("Transaction Report", 14, 35);
    doc.setFontSize(10);
    doc.text(customerDetails?.name, 14, 40);

    const headers = [
      [
        "Payment Date",
        "Description",
        "Debit",
        "Credit",
        "Mode",
        "Balance",
        "Collected By",
        "Uploaded By",
        "Created At",
        "Updated At",
      ],
    ];

    // ✅ Export ALL filtered data (not paginated)
    const allFiltered = transactions.filter((transact) => {
      if (selectedMode === "all") return true;
      return transact.modeOfPayment === selectedMode;
    });

    const data = allFiltered.map((transact) => {
      const debit =
        transact.choose === "Debit"
          ? transact.amount?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })
          : "--------";

      const credit =
        transact.choose === "credit"
          ? transact.amount?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })
          : "--------";

      return [
        transact.paymentDate
          ? new Date(transact.paymentDate).toDateString()
          : "N/A",
        transact.description || "N/A",
        debit,
        credit,
        transact.modeOfPayment || "N/A",
        transact.balance?.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        }) || "",
        transact.collectedBy || "N/A",
        transact.uploadedBy || "N/A",
        new Date(transact.createdAt).toDateString(),
        new Date(transact.updatedAt).toDateString(),
      ];
    });

    autoTable(doc, {
      startY: 42,
      head: headers,
      body: data,
      styles: { fontSize: 8 },
      theme: "striped",
    });

    doc.save("WinnerSavings_Transactions.pdf");
  };

  function addCommas(number) {
    return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      {loading && <Loader />}
      <div class="row">
        <div class="col-lg-12">
          <div class="profile card card-body px-3 pt-3 pb-0">
            <div class="profile-head">
              <div class="photo-content">
                <div class="cover-photo rounded"></div>
              </div>
              <div class="profile-info">
                <div class="profile-photo">
                  <img
                    src="images/userimage.png"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                </div>
                <div class="profile-details">
                  <div class="profile-name px-3 pt-2">
                    <h4 class="text-primary mb-0">{customerDetails?.name}</h4>
                    <p>Phone: {customerDetails?.customersPhoneNo}</p>
                  </div>
                  <div class="profile-email px-2 pt-2">
                    <h4 class="text-muted mb-0">
                      Account Officer: {customerDetails?.officerIncharge}
                    </h4>
                  </div>
                  <div class="dropdown ms-auto">
                    <a
                      href="#"
                      class="btn btn-primary light sharp"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    >
                      View Profile{" "}
                      <i class="fa fa-user-circle text-primary me-2"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <Link
                        to={`/customer-details/${id}`}
                        class="dropdown-item"
                      >
                        <i class="fa fa-user-circle text-primary me-2"></i> View
                        Customer Details
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="card">
          <div class="card-body">
            <div class="profile-statistics">
              <div class="text-center">
                <div class="row">
                  <div class="col">
                    {loanProfile ? (
                      <Link
                        className="btn btn-primary mb-1 me-1"
                        to={`/loan-applicants-details/${loanProfile}`}
                      >
                        Has Active Loan
                      </Link>
                    ) : (
                      <button
                        className="btn btn-secondary mb-1 me-1"
                        onClick={() =>
                          toast.info("This customer has no loan profile")
                        }
                      >
                        No Active Loan
                      </button>
                    )}
                  </div>
                  <div class="col">
                    <a class="btn btn-primary mb-1 me-1">
                      Available Balance:{" "}
                      {addCommas(customerDetails?.accountBalance)}
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="col-xl-12 col-xxl-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Deposits/Withdrawal</h4>

              <div class="d-flex align-items-center flex-wrap flex-sm-nowrap">
                <select
                  className="form-control"
                  value={selectedMode}
                  onChange={handleModeChange}
                >
                  <option value="all">Filter By Cash/Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
              <div class="d-flex align-items-center flex-wrap flex-sm-nowrap">
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={() => {
                    exportToExcel();
                  }}
                >
                  EXPORT AS EXCEL
                </button>
              </div>
              <div class="d-flex align-items-center flex-wrap flex-sm-nowrap">
                <Link
                  to={`/add-contribution/${customerDetails?._id}`}
                  class="btn btn-primary mb-2"
                >
                  Add Deposits/Withdrawal
                </Link>
              </div>
            </div>

            <div class="card-body p-0">
              <div class="table-responsive active-projects">
                <div className="rowed"></div>

                <table id="projects-tbl" class="table">
                  <thead>
                    <tr>
                      <th>Payment Date</th>
                      <th>Desc.</th>
                      <th>Debit</th>
                      <th>Credit</th>
                      <th>Mode</th>
                      <th>Bal (N)</th>
                      <th>Collected By</th>
                      <th>Uploaded By</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transact) => (
                      <tr>
                        <td>
                          {transact.paymentDate
                            ? new Date(transact.paymentDate).toDateString()
                            : "N/A"}
                        </td>

                        <td>
                          {transact.description ? transact.description : "N/A"}
                        </td>

                        <td>
                          {transact.choose === "Debit" ? (
                            <>
                              {transact.amount?.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </>
                          ) : (
                            <>--------</>
                          )}
                        </td>
                        <td>
                          {transact.choose === "credit" ? (
                            <>
                              {transact.amount?.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </>
                          ) : (
                            <>--------</>
                          )}
                        </td>

                        <td>
                          {transact.modeOfPayment
                            ? transact.modeOfPayment?.toUpperCase()
                            : "N/A"}
                        </td>
                        <td>
                          {transact.balance?.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          {transact.collectedBy
                            ? transact.collectedBy?.toUpperCase()
                            : "N/A"}
                        </td>
                        <td>
                          {" "}
                          {transact.uploadedBy
                            ? transact.uploadedBy?.toUpperCase()
                            : "N/A"}
                        </td>
                        <td>{new Date(transact.createdAt).toDateString()}</td>
                        <td>{new Date(transact.updatedAt).toDateString()}</td>
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
                                  <circle
                                    fill="#000000"
                                    cx="12"
                                    cy="12"
                                    r="2"
                                  />
                                  <circle
                                    fill="#000000"
                                    cx="19"
                                    cy="12"
                                    r="2"
                                  />
                                </g>
                              </svg>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="#">
                                View Details
                              </a>
                              <a class="dropdown-item" href="#">
                                Edit
                              </a>
                              <a class="dropdown-item" href="#">
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
      </div>
    </>
  );
};

export default CustomerProfile;
