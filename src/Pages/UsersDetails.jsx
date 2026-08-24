import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";

const UsersDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Uploaded transactions
  const [uploadedData, setUploadedData] = useState([]);
  const [uploadedTotals, setUploadedTotals] = useState({
    total: 0,
    credit: 0,
    debit: 0,
  });
  const [uploadedPagination, setUploadedPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  // Date filters
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  const token = localStorage.getItem("token");
  const { id } = useParams();
  const itemsPerPage = 200;

  // Helper for query string
  const buildDateQuery = () => {
    if (filters.startDate && filters.endDate) {
      return `&startDate=${filters.startDate}&endDate=${filters.endDate}`;
    }
    return "";
  };

  // Format currency with commas
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Format number with commas (without currency symbol)
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-NG").format(number || 0);
  };

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);

      // ✅ Get user details
      const userRes = await fetch(
        `https://winner-3hjl.onrender.com/api/v1/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const userJson = await userRes.json();

      if (!userJson.success) throw new Error("Failed to fetch user");
      const user = userJson.data;
      setUserDetails(user);

      const firstName = user.firstName?.trim().toUpperCase() || "";
      const dateQuery = buildDateQuery();

      // ✅ Fetch uploaded transactions
      const uploadedRes = await fetch(
        `https://winner-3hjl.onrender.com/api/v1/transactions/getAllTransactionsByUploader?uploadedBy=${encodeURIComponent(
          firstName,
        )}&page=${page}&limit=${itemsPerPage}${dateQuery}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const uploadedJson = await uploadedRes.json();

      if (uploadedJson.success) {
        const data = uploadedJson.data || [];
        setUploadedData(data);
        setUploadedPagination(
          uploadedJson.pagination || { page: 1, totalPages: 1, total: 0 },
        );

        // Calculate totals from TYPE
        const total = data.reduce((sum, t) => sum + (t.amount || 0), 0);
        const credit = data
          .filter((t) => t.choose?.toLowerCase() === "credit")
          .reduce((sum, t) => sum + (t.amount || 0), 0);
        const debit = data
          .filter((t) => t.choose?.toLowerCase() === "debit")
          .reduce((sum, t) => sum + (t.amount || 0), 0);

        setUploadedTotals({ total, credit, debit });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchData(1);
  };

  const resetFilters = () => {
    setFilters({ startDate: "", endDate: "" });
    fetchData(1);
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="row">
          <h2>
            Savings Activity for {userDetails?.firstName}{" "}
            {userDetails?.lastName}
          </h2>

          {/* 🗓️ Date Filter */}
          <div className="col-12 mb-3">
            <form
              className="d-flex align-items-center gap-3 flex-wrap"
              onSubmit={handleFilterSubmit}
            >
              <div>
                <label className="form-label">Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label className="form-label">End Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                Apply Filter
              </button>

              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={resetFilters}
              >
                Reset
              </button>
            </form>
          </div>

          {/* 💰 Summary Cards */}
          {/* <div className="col-xl-4 col-xxl-4 col-sm-6">
            <div className="card crm-cart bg-primary border-0">
              <div className="card-body">
                <p className="text-white fs-5 fw-bold">
                  {formatCurrency(uploadedTotals.total)}
                </p>
                <span className="text-white">Total Uploaded</span>
              </div>
            </div>
          </div> */}

          <div className="col-xl-6 col-xxl-6 col-sm-6">
            <div className="card crm-cart bg-success border-0">
              <div className="card-body">
                <p className="text-white fs-5 fw-bold">
                  {formatCurrency(uploadedTotals.credit)}
                </p>
                <span className="text-white">Total Credit</span>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-xxl-6 col-sm-6">
            <div className="card crm-cart bg-danger border-0">
              <div className="card-body">
                <p className="text-white fs-5 fw-bold">
                  {formatCurrency(uploadedTotals.debit)}
                </p>
                <span className="text-white">Total Debit</span>
              </div>
            </div>
          </div>

          {/* 🔼 Uploaded Transactions */}
          <div className="col-xl-12">
            <div className="card mt-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">
                  Transactions Uploaded By User
                </h4>
                <span className="badge bg-primary">
                  Total: {formatNumber(uploadedPagination.total)} transactions
                </span>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>Customer</th>
                        <th>Payment Date</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Mode</th>
                        <th>Uploaded By</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uploadedData.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center py-4">
                            <div className="text-muted">
                              <i className="fas fa-inbox fa-2x mb-2"></i>
                              <br />
                              No uploaded transactions found.
                            </div>
                          </td>
                        </tr>
                      ) : (
                        uploadedData.map((t) => (
                          <tr key={t._id}>
                            <td className="fw-bold">{t.name || "N/A"}</td>
                            <td>
                              {new Date(t.paymentDate).toLocaleDateString()}
                            </td>
                            <td>{t.description || "No description"}</td>
                            <td>
                              <span
                                className={`badge light badge-${
                                  t.choose === "credit" ? "success" : "danger"
                                }`}
                              >
                                {t.choose?.toUpperCase() || "UNKNOWN"}
                              </span>
                            </td>
                            <td className="fw-bold">
                              {formatCurrency(t.amount)}
                            </td>
                            <td>{formatCurrency(t.balance)}</td>
                            <td>
                              <span
                                className={`badge light badge-${
                                  t.modeOfPayment === "cash"
                                    ? "warning"
                                    : "info"
                                }`}
                              >
                                {t.modeOfPayment?.toUpperCase() || "N/A"}
                              </span>
                            </td>
                            <td>{t.uploadedBy}</td>
                            <td>{new Date(t.createdAt).toLocaleString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination for Uploaded Transactions */}
                {uploadedPagination.totalPages > 1 && (
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Page {uploadedPagination.page} of{" "}
                        {uploadedPagination.totalPages}
                      </small>
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          disabled={uploadedPagination.page === 1}
                          onClick={() =>
                            handlePageChange(uploadedPagination.page - 1)
                          }
                        >
                          Previous
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          disabled={
                            uploadedPagination.page ===
                            uploadedPagination.totalPages
                          }
                          onClick={() =>
                            handlePageChange(uploadedPagination.page + 1)
                          }
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersDetails;
