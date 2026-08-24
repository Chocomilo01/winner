import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import * as XLSX from "xlsx";
import ReactPaginate from "react-paginate";

const Withdrawals = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch transactions with pagination and date filters
  const fetchTransactions = async (
    page = 1,
    limit = 10,
    start = "",
    end = "",
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      // Add date filters if provided - using your backend's expected parameters
      if (start) params.append("startDate", start);
      if (end) params.append("endDate", end);

      const response = await fetch(
        `https://winner-3hjl.onrender.com/api/v1/transactions/withdrawals?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.success) {
        setTransactions(data.data || []);
        setPagination({
          page: data.pagination?.page || 1,
          limit: data.pagination?.limit || 10,
          total: data.pagination?.total || 0,
          pages: data.pagination?.pages || 0,
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle page change
  const handlePageChange = (selectedPage) => {
    const newPage = selectedPage.selected + 1;
    fetchTransactions(newPage, pagination.limit, startDate, endDate);
  };

  // Handle date filter application
  const handleDateFilter = () => {
    // Reset to page 1 when applying new filters
    fetchTransactions(1, pagination.limit, startDate, endDate);
  };

  // Clear date filters
  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    fetchTransactions(1, pagination.limit);
  };

  // Export to Excel
  const exportToExcel = () => {
    const formattedData = transactions.map((item, index) => [
      index + 1,
      item.name || item.customer,
      `₦ ${item.amount}`,
      `₦ ${item.balance || 0}`,
      item.paymentDate ? new Date(item.paymentDate).toDateString() : "N/A",
      item.choose,
      item.collectedBy || "--------",
      item.updatedAt ? new Date(item.updatedAt).toDateString() : "N/A",
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      [
        "#",
        "Customer",
        "Amt (₦)",
        "Balance (₦)",
        "Payment Date",
        "Type",
        "Collected By",
        "Updated At",
      ],
      ...formattedData,
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Withdrawals Report");
    XLSX.writeFile(wb, "Winner Savings Withdrawals Report.xlsx");
  };

  return (
    <>
      {loading && <Loader />}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Withdrawals</h4>

          {/* Date Range Filter */}
          <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
            <div className="mb-2">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-end gap-2 mb-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDateFilter}
              >
                Apply Filter
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClearFilters}
              >
                Clear
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={exportToExcel}
          >
            EXPORT AS EXCEL
          </button>
        </div>

        <div className="card-body">
          {error ? (
            <p className="text-danger">Error: {error}</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th>
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
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No withdrawals found
                        </td>
                      </tr>
                    ) : (
                      transactions.map((item, index) => (
                        <tr key={item._id || index}>
                          <td>
                            {(pagination.page - 1) * pagination.limit +
                              index +
                              1}
                          </td>
                          <td>{item.name || item.customer}</td>
                          <td>₦ {item.amount?.toLocaleString()}</td>
                          <td>₦ {item.balance?.toLocaleString() || "0"}</td>
                          <td>
                            {item.paymentDate
                              ? new Date(item.paymentDate).toDateString()
                              : "N/A"}
                          </td>
                          <td>
                            <span
                              className={`badge light ${
                                item.choose?.toLowerCase() === "credit"
                                  ? "badge-success"
                                  : "badge-danger"
                              }`}
                            >
                              {item.choose}
                            </span>
                          </td>
                          <td>
                            {!item.collectedBy ? (
                              <span className="text-muted">--------</span>
                            ) : (
                              item.collectedBy
                            )}
                          </td>
                          <td>
                            {item.updatedAt
                              ? new Date(item.updatedAt).toDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pagination.pages}
                    onPageChange={handlePageChange}
                    forcePage={pagination.page - 1}
                    containerClassName={"pagination"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    pageLinkClassName={"page-link"}
                    activeClassName={"active"}
                    disabledClassName={"disabled"}
                  />
                </div>
              )}

              {/* Results Count */}
              {transactions.length > 0 && (
                <div className="mt-3 text-center">
                  <p className="text-muted">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total,
                    )}{" "}
                    of {pagination.total} entries
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Withdrawals;
