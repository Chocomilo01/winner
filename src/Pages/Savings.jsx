import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";

const Savings = () => {
  const [customers, setCustomers] = useState([]);

  const [customersnormal, setCustomersnormal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalWithdrawals, settotalWithdrawals] = useState([]);
  const [totalWithdrawalsCash, settotalWithdrawalsCash] = useState([]);
  const [totalDepositTf, setTotalDepositTf] = useState([]);
  const [totalDepositTfnormal, setTotalDepositTfnormal] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [updatedTotalDepositAmount, setUpdatedTotalDepositAmount] =
    useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://winnerbe.onrender.com/api/v1/transactions/totalDepositByCashByPaymentDate?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched Data:", data.data);
        setCustomers(data.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `https://winnerbe.onrender.com/api/v1/transactions/totalDepositByCashByPaymentDate?startDate=2010-01-01&endDate=2050-01-01`,
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
        console.log("Fetched This:", data.data);
        setCustomersnormal(data.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, []);
  useEffect(() => {
    fetch(
      `https://winnerbe.onrender.com/api/v1/transactions/totalWithdrawalsByTransferByPaymentDate?startDate=${startDate}&endDate=${endDate}`,
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
        console.log("Fetched Data:", data.data);
        settotalWithdrawals(data.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, [startDate, endDate]);
  useEffect(() => {
    fetch(
      `https://winnerbe.onrender.com/api/v1/transactions/totalWithdrawalsByCashByPaymentDate?startDate=${startDate}&endDate=${endDate}`,
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
        console.log("Fetched Data:", data.data);
        settotalWithdrawalsCash(data.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, [startDate, endDate]);
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startDate2 = today.toISOString().split("T")[0];
    const endDate2 = tomorrow.toISOString().split("T")[0];
    fetch(
      `https://winnerbe.onrender.com/api/v1/transactions/totalDepositByTransferByPaymentDate?startDate=${startDate}&endDate=${endDate}`,
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
        console.log("Fetched Data:", data.data);
        setTotalDepositTf(data.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, [startDate, endDate]);
  useEffect(() => {
    fetch(
      `https://winnerbe.onrender.com/api/v1/transactions/totalDepositByTransferByPaymentDate?startDate=2010-01-01&endDate=2050-01-01`,
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
        console.log("Fetched Data:", data.data);
        setTotalDepositTfnormal(data.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, []);

  function safeSumAndFormat(a, b) {
    const numberA = parseFloat(a);
    const numberB = parseFloat(b);

    if (!isNaN(numberA) && !isNaN(numberB)) {
      return (numberA + numberB)?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return "Select Date Range"; // or some other default value if the conversion fails
  }
  function safeSumAndFormatTotal(a, b) {
    const numberA = parseFloat(a);
    const numberB = parseFloat(b);

    if (!isNaN(numberA) && !isNaN(numberB)) {
      return (numberA + numberB)?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return "Loading"; // or some other default value if the conversion fails
  }

  function safeMinusAndFormat(a, b, c, d) {
    const numberA = parseFloat(a);
    const numberB = parseFloat(b);
    const numberC = parseFloat(c);
    const numberD = parseFloat(d);

    if (
      !isNaN(numberA) &&
      !isNaN(numberB) &&
      !isNaN(numberC) &&
      !isNaN(numberD)
    ) {
      return (numberA + numberB - (numberC + numberD))?.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      );
    }

    return "Select Date Range"; // or some other default value if the conversion fails
  }

  return (
    <>
      {loading && <Loader />}
      <div className="row">
        <h2>INFLOWS</h2>
        <div className="flexy">
          <div className="col-sm">
            <label>Start Date:</label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-sm2">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <a href="/transactions" class="col-xl-4 col-xxl-4 col-sm-6">
          <div class="card crm-cart bg-primary border-0">
            <div class="card-header border-0 pb-0">
              <span class="text-white fs-16">
                Count: {customers.length}
                <i class="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div class="icon-box bg-white">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                    fill="var(--primary)"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="crm-cart-data">
                <p class="text-white">
                  &#8358;{" "}
                  {safeSumAndFormat(
                    customers.totalDepositAmount,
                    totalDepositTf.totalDepositAmount,
                  )}
                </p>
                <span class="d-block mb-3 text-white">Total Savings</span>
              </div>
            </div>
          </div>
        </a>
        <a href="/transactions-by-cash" class="col-xl-4 col-xxl-4 col-sm-6">
          <div class="card crm-cart bg-primary border-0">
            <div class="card-header border-0 pb-0">
              <span class="text-white fs-16">
                Count: {customers.length}
                <i class="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div class="icon-box bg-white">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                    fill="var(--primary)"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="crm-cart-data">
                <p class="text-white">
                  &#8358;{" "}
                  {updatedTotalDepositAmount !== null
                    ? updatedTotalDepositAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : customers.totalDepositAmount?.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </p>
                <span class="d-block mb-3 text-white">Collected Via CASH</span>
              </div>
            </div>
          </div>
        </a>
        <a href="/transactions-by-transfer" class="col-xl-4 col-xxl-4 col-sm-4">
          <div class="card crm-cart bg-primary border-0">
            <div class="card-header border-0 pb-0">
              <span class="text-white fs-16">
                Count: 0<i class="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div class="icon-box bg-white">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                    fill="var(--primary)"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="crm-cart-data">
                <p class="text-white">
                  &#8358;{" "}
                  {/* {totalDepositTf.totalDepositAmount?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} */}
                  {updatedTotalDepositAmount !== null
                    ? updatedTotalDepositAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : totalDepositTf.totalDepositAmount?.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                </p>
                <span class="d-block mb-3 text-white">
                  Collected Via Transfer
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="row">
        <h2>OUTFLOWS</h2>
        <a href="/withdrawals" class="col-xl-4 col-xxl-4 col-sm-6">
          <div class="card crm-cart bg-primary border-0">
            <div class="card-header border-0 pb-0">
              <div class="icon-box bg-white">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                    fill="var(--primary)"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="crm-cart-data">
                <p class="text-white">
                  &#8358;{" "}
                  {safeSumAndFormat(
                    totalWithdrawalsCash.totalWithdrawalsAmount,
                    totalWithdrawals.totalWithdrawalsAmount,
                  )}
                </p>
                <span class="d-block mb-3 text-white">Total Withdrawals</span>
              </div>
            </div>
          </div>
        </a>
        <a href="/savings-list" class="col-xl-4 col-xxl-4 col-sm-6">
          <div class="card crm-cart bg-primary border-0">
            <div class="card-header border-0 pb-0">
              <span class="text-white fs-16">
                Count: 0<i class="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div class="icon-box bg-white">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                    fill="var(--primary)"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="crm-cart-data">
                <p class="text-white">
                  &#8358;{" "}
                  {updatedTotalDepositAmount !== null
                    ? updatedTotalDepositAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : totalWithdrawalsCash.totalWithdrawalsAmount?.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                </p>
                <span class="d-block mb-3 text-white">Withdrawn Via CASH</span>
              </div>
            </div>
          </div>
        </a>
        <a href="/savings-list" class="col-xl-4 col-xxl-4 col-sm-4">
          <div class="card crm-cart bg-primary border-0">
            <div class="card-header border-0 pb-0">
              <span class="text-white fs-16">
                Count: 0<i class="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div class="icon-box bg-white">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                    fill="var(--primary)"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="crm-cart-data">
                <p class="text-white">
                  &#8358;{" "}
                  {updatedTotalDepositAmount !== null
                    ? updatedTotalDepositAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : totalWithdrawals.totalWithdrawalsAmount?.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                </p>
                <span class="d-block mb-3 text-white">
                  Withdrawn Via Transfer
                </span>
              </div>
            </div>
          </div>
        </a>
        <a href="/savings-list" class="col-xl-4 col-xxl-4 col-sm-6">
          <div class="card crm-cart bg-primary border-0">
            <div class="card-header border-0 pb-0">
              <div class="icon-box bg-white">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                    fill="var(--primary)"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="crm-cart-data">
                <p class="text-white">
                  &#8358;{" "}
                  {safeMinusAndFormat(
                    customers.totalDepositAmount,
                    totalDepositTf.totalDepositAmount,
                    totalWithdrawalsCash.totalWithdrawalsAmount,
                    totalWithdrawals.totalWithdrawalsAmount,
                  )}
                </p>
                <span class="d-block mb-3 text-white">Balance</span>
              </div>
            </div>
          </div>
        </a>
        <a href="/transactions" class="col-xl-4 col-xxl-4 col-sm-6">
          <div class="card crm-cart bg-primary border-0">
            <div class="card-header border-0 pb-0">
              <div class="icon-box bg-white">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                    fill="var(--primary)"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="card-body">
              <div class="crm-cart-data">
                <p class="text-white">
                  &#8358;{" "}
                  {safeSumAndFormatTotal(
                    customersnormal.totalDepositAmount,
                    totalDepositTfnormal.totalDepositAmount,
                  )}
                </p>
                <span class="d-block mb-3 text-white">
                  All Time Transaction
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Savings;
