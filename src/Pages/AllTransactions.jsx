import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import * as XLSX from "xlsx";

const AllTransactions = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [AllTransactionsByCash, setAllTransactionsByCash] = useState([]);
  const [displayedCustomers, setDisplayedCustomers] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [collectedByFilter, setCollectedByFilter] = useState("");
  const [collectors, setCollectors] = useState([]);

  // ADD THESE
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 50;

  const handleStartDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
    applyFilters(value, endDate, collectedByFilter);
  };

  const handleEndDateChange = (event) => {
    const value = event.target.value;
    setEndDate(value);
    applyFilters(startDate, value, collectedByFilter);
  };
  const applyFilters = (
    start = startDate,
    end = endDate,
    collector = collectedByFilter,
  ) => {
    let filtered = [...AllTransactionsByCash];

    // Date filter
    if (start || end) {
      filtered = filtered.filter((item) => {
        // Compare only YYYY-MM-DD strings
        const paymentDate = item.paymentDate?.split("T")[0];

        if (start && paymentDate < start) {
          return false;
        }

        if (end && paymentDate > end) {
          return false;
        }

        return true;
      });
    }

    // Staff filter
    if (collector) {
      filtered = filtered.filter(
        (item) =>
          (item.collectedBy || "").trim().toLowerCase() ===
          collector.trim().toLowerCase(),
      );
    }

    setDisplayedCustomers(filtered);
    setCurrentPage(1);
  };
  const handleCollectedByFilter = (collector) => {
    setCollectedByFilter(collector);
    applyFilters(startDate, endDate, collector);
  };

  <button
    className="btn btn-secondary mb-2 ms-2"
    onClick={() => {
      setStartDate("");
      setEndDate("");
      setCollectedByFilter("");
      setDisplayedCustomers(AllTransactionsByCash);
      setCurrentPage(1);
    }}
  >
    Clear Filters
  </button>;

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace 'your_token_key' with the actual key you use to store the token

    fetch("http://localhost:5200/api/v1/transactions/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Total transactions:", data.data.length);

        const sortedTransactions = data.data.reverse();
        const uniqueCollectors = [
          ...new Set(
            sortedTransactions
              .map((item) => item.collectedBy)
              .filter((name) => name && name.trim() !== ""),
          ),
        ];

        setCollectors(uniqueCollectors);

        setAllTransactionsByCash(sortedTransactions);
        setDisplayedCustomers(sortedTransactions);
        setCurrentPage(1);

        // Reset filters
        setStartDate("");
        setEndDate("");
        setCollectedByFilter("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const exportToExcel = () => {
    // ✅ Safe alphabetical sort (handles name OR customer)
    const sortedCustomers = [...displayedCustomers].sort((a, b) => {
      const nameA = (a.name || "").toLowerCase();
      const nameB = (b.name || "").toLowerCase();
      return nameA.localeCompare(nameB);
    });

    const formattedData = sortedCustomers.map((item, index) => [
      index + 1,
      item.name, // ✅ show actual name
      `₦ ${item.amount}`,
      item.paymentDate ? new Date(item.paymentDate).toDateString() : "N/A",
      item.choose,
      item.collectedBy,
      item.updatedAt ? new Date(item.updatedAt).toDateString() : "N/A",
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      [
        "#",
        "Customer",
        "Amt (₦)",
        "Payment Date",
        "Type",
        "Collected By",
        "Updated At",
      ],
      ...formattedData,
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "winner Savings Transactions Report.xlsx");
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  const totalPages = Math.max(
    1,
    Math.ceil(displayedCustomers.length / customersPerPage),
  );

  const currentCustomers = displayedCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer,
  );
  const totalAmount = displayedCustomers.reduce(
    (total, item) => total + (Number(item.amount) || 0),
    0,
  );

  const totalCredit = displayedCustomers
    .filter((item) => item.choose?.toLowerCase() === "credit")
    .reduce((total, item) => total + (Number(item.amount) || 0), 0);

  const totalDebit = displayedCustomers
    .filter((item) => item.choose?.toLowerCase() === "debit")
    .reduce((total, item) => total + (Number(item.amount) || 0), 0);

  const totalBalance = displayedCustomers.reduce(
    (total, item) => total + (Number(item.balance) || 0),
    0,
  );

  return (
    <>
      {loading && <Loader />}
      <div className="card">
        <div className="card-header">
          <div className="row mt-3">
            {/* TOTAL TRANSACTIONS */}
            <div className="col-md-3">
              <div className="alert alert-primary mb-2">
                <strong>Total Transactions:</strong>
                <br />
                {displayedCustomers.length.toLocaleString()}
              </div>
            </div>

            {/* TOTAL CREDIT */}
            <div className="col-md-3">
              <div className="alert alert-success mb-2">
                <strong>Total Credit:</strong>
                <br />₦ {totalCredit.toLocaleString()}
              </div>
            </div>

            {/* TOTAL DEBIT */}
            <div className="col-md-3">
              <div className="alert alert-danger mb-2">
                <strong>Total Debit:</strong>
                <br />₦ {totalDebit.toLocaleString()}
              </div>
            </div>

            {/* TOTAL BALANCE */}
            <div className="col-md-3">
              <div className="alert alert-warning mb-2">
                <strong>Total Balance:</strong>
                <br />₦ {totalBalance.toLocaleString()}
              </div>
            </div>
          </div>
          <h4 class="card-title">All Transactions</h4>
          <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
            <div className="mb-3 mt-2 mx-sm-2">
              <label className="sr-only">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate || ""}
                onChange={handleStartDateChange}
              />
            </div>

            <div className="mb-3 mt-2 mx-sm-2">
              <label className="sr-only">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate || ""}
                onChange={handleEndDateChange}
              />
            </div>

            <div className="mb-3 mt-2 mx-sm-2">
              <select
                className="form-control"
                value={collectedByFilter}
                onChange={(e) => handleCollectedByFilter(e.target.value)}
              >
                <option value="">All Staff</option>

                {collectors.map((collector) => (
                  <option key={collector} value={collector}>
                    {collector}
                  </option>
                ))}
              </select>
            </div>
          </div>
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

        <div className="card-body">
          {error ? (
            <p>Error: {error}</p>
          ) : (
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
                      <strong>AMT (₦)</strong>
                    </th>
                    <th>
                      <strong>BALANCE (₦)</strong>
                    </th>

                    <th>
                      <strong>PAYMENT DATE</strong>
                    </th>
                    <th>
                      <strong>TYPE</strong>
                    </th>
                    <th>
                      <strong>Collected By</strong>
                    </th>
                    <th>
                      <strong>Updated At</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AllTransactionsByCash.length === 0 ? (
                    <tr>
                      <td colSpan="9">No transactions found</td>
                    </tr>
                  ) : (
                    currentCustomers.map((item, index) => (
                      <tr key={index}>
                        {/* ... Table data */}
                        <td>{indexOfFirstCustomer + index + 1}</td>
                        <td>{item.name || item.customer}</td>
                        <td>₦ {item.amount}</td>
                        <td>₦ {item.balance}</td>
                        <td>{new Date(item.paymentDate).toDateString()}</td>
                        <td>
                          <span class="badge light badge-success">
                            {item.choose}
                          </span>
                        </td>

                        <td>
                          {item.collectedBy === "" ||
                          item.collectedBy == null ? (
                            <p>--------</p>
                          ) : (
                            item.collectedBy
                          )}
                        </td>
                        <td>{new Date(item.updatedAt).toDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AllTransactions;
