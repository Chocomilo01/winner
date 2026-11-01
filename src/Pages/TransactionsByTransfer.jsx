import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import * as XLSX from "xlsx";

const TransactionsByTransfer = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [AllTransactionsByCash, setAllTransactionsByCash] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayedCustomers, setDisplayedCustomers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(
      "https://winnerbe.onrender.com/api/v1/transactions/transactions/transfer",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setAllTransactionsByCash(data.data);
        setDisplayedCustomers(data.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);

    // Immediately filter the data when a date is selected
    const date = new Date(event.target.value);
    const filteredCustomers = AllTransactionsByCash.filter((item) => {
      const customerCreatedAt = new Date(item.paymentDate);
      return customerCreatedAt.toDateString() === date.toDateString();
    });

    setDisplayedCustomers(filteredCustomers);
  };

  const exportToExcel = () => {
    const formattedData = displayedCustomers.map((item, index) => [
      index + 1,
      item.customer,
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
    XLSX.utils.book_append_sheet(wb, ws, "Loan Data");
    XLSX.writeFile(wb, "Winner Savings Transactions Report.xlsx");
  };

  return (
    <>
      {loading && <Loader />}
      <div className="card">
        <div className="card-header">
          <h4 class="card-title">Transactions By Cash</h4>
          <div class="d-flex align-items-center flex-wrap flex-sm-nowrap">
            <div class="mb-3 mt-2 mx-sm-2">
              <label class="sr-only">Search</label>
              <input
                type="date"
                class="form-control"
                placeholder="Search"
                onChange={handleDateChange}
              />{" "}
            </div>
            &nbsp;
            <button type="submit" class="btn btn-primary mb-2">
              Filter By Date
            </button>
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
                    displayedCustomers.map((item, index) => (
                      <tr key={index}>
                        {/* ... Table data */}
                        <td>{index + 1}</td>
                        <td>{item.customer}</td>
                        <td>₦ {item.amount}</td>
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
      </div>
    </>
  );
};

export default TransactionsByTransfer;
