import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";

const Loans = () => {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState([]);
  const [total2, setTotal2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [roi, setRoi] = useState(0);
  const [toteLoanBal, setToteLoanBal] = useState(0);
  const [totalLoanBal, setTotalLoanBal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Make all API calls in parallel
        const [response1, response2, response3] = await Promise.all([
          // First API call
          fetch(
            `https://winnerbe.onrender.com/api/v1/loans/total-deposit-amount-by-cash?startDate=${new Date().toISOString().split("T")[0]}&endDate=${new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          ),
          // Second API call
          fetch(`https://winnerbe.onrender.com/api/v1/loans/bank/recieved`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          // Third API call
          fetch("https://winnerbe.onrender.com/api/v1/loans?limit=all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        // Check if all responses are ok
        if (!response1.ok || !response2.ok || !response3.ok) {
          throw new Error("One or more network responses were not ok");
        }

        // Parse all responses
        const [data1, data2, data3] = await Promise.all([
          response1.json(),
          response2.json(),
          response3.json(),
        ]);

        // Process first response
        setTotal(data1);

        // Process second response
        setTotal2(data2.data);

        // Process third response
        if (!data3?.data || !Array.isArray(data3.data)) {
          console.error("Invalid response structure:", data3);
          return;
        }

        // ✅ Deduplicate loans (1 loan per customer)
        const uniqueLoans = data3.data.reduceRight((unique, loan) => {
          const existingIndex = unique.findIndex(
            (uniqueLoan) => uniqueLoan.customer === loan.customer,
          );
          if (existingIndex === -1) {
            unique.unshift(loan);
          }
          return unique;
        }, []);

        console.log("✅ All Loans Count:", data3.data.length);
        console.log("✅ Unique Customers:", uniqueLoans.length);

        // ✅ Store all loans
        setCustomers(data3.data);

        // ✅ Calculate total balance across all unique customers
        const totalBalance = uniqueLoans.reduce(
          (sum, customer) => sum + (Number(customer.balance) || 0),
          0,
        );

        // ✅ Calculate total interest accrued (ROI)
        const totalRoi = uniqueLoans.reduce(
          (sum, customer) => sum + (Number(customer.totalInterestAccured) || 0),
          0,
        );

        // ✅ Calculate total balance across all loans (not just unique)
        const toteLoanBale = data3.data.reduce(
          (sum, loan) => sum + (Number(loan.balance) || 0),
          0,
        );

        console.log("💰 Total (unique) Balance:", totalBalance);
        console.log("💰 Total (all loans) Balance:", toteLoanBale);
        console.log("📈 Total ROI:", totalRoi);

        // ✅ Update state
        setTotalDeposit(totalBalance);
        setRoi(totalRoi);
        setToteLoanBal(toteLoanBale);
        setTotalLoanBal(totalBalance);

        // ✅ Combine ROI with total received from bank
        setTotalAmount(totalRoi + (data2.data?.totalLoanRecieved || 0));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Set loading to false only after ALL API calls are complete
        setLoading(false);
      }
    };

    fetchAllData();
  }, []); // Empty dependency array since we only want to run this once

  function safeSumAndFormat(a, b) {
    const numberA = parseFloat(a);
    const numberB = parseFloat(b);

    if (!isNaN(numberA) && !isNaN(numberB)) {
      return (numberA + numberB)?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return "Select Date Range";
  }

  return (
    <>
      {loading && <Loader />}
      <div className="row">
        <div className="col-xl-4 col-xxl-4 col-sm-6">
          <div className="card crm-cart bg-secondary border-0">
            <div className="card-header border-0 pb-0">
              <span className="text-white fs-16">
                Count: {customers.length}
                <i className="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div className="icon-box bg-white">
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
            <div className="card-body">
              <div className="crm-cart-data">
                <p>
                  &#8358;{" "}
                  {total2?.totalLoanRecieved?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <span className="d-block mb-3 text-black">
                  All Loan Applications
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Other card components remain the same */}
        <div className="col-xl-4 col-xxl-4 col-sm-6">
          <div className="card crm-cart bg-secondary border-0">
            <div className="card-header border-0 pb-0">
              <span className="text-white fs-16">
                Count: {customers.length}
                <i className="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div className="icon-box bg-white">
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
            <div className="card-body">
              <div className="crm-cart-data">
                <p>
                  &#8358;{" "}
                  {total2?.totalLoanRecieved?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <span className="d-block mb-3 text-black">
                  All Approved(Current Loan)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-xxl-4 col-sm-4">
          <div className="card crm-cart bg-primary border-0">
            <div className="card-header border-0 pb-0">
              <span className="text-white fs-16">
                Count: 0<i className="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div className="icon-box bg-white">
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
            <div className="card-body">
              <div className="crm-cart-data">
                <p className="text-white">
                  &#8358;{" "}
                  {totalDeposit?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <span className="d-block mb-3 text-white">
                  Total Loan Balance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4 col-xxl-4 col-sm-6">
          <div className="card crm-cart bg-secondary border-0">
            <div className="card-header border-0 pb-0">
              <span className="text-white fs-16">
                Count: 0<i className="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div className="icon-box bg-white">
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
            <div className="card-body">
              <div className="crm-cart-data">
                <p>
                  &#8358;{" "}
                  {total2?.totalLoanRepaid?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <span className="d-block mb-3 text-black">
                  All Loan Repayment
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-xxl-4 col-sm-4">
          <div className="card crm-cart bg-primary border-0">
            <div className="card-header border-0 pb-0">
              <span className="text-white fs-16">
                roi:&#8358;{" "}
                {roi.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <i className="fa-solid fa-chevron-up ms-1"></i>
              </span>
              <div className="icon-box bg-white">
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
            <div className="card-body">
              <div className="crm-cart-data">
                <p className="text-white">
                  &#8358; {safeSumAndFormat(total2?.totalLoanRecieved, roi)}
                </p>
                <span className="d-block mb-3 text-white">
                  Total ROI Amount
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loans;
