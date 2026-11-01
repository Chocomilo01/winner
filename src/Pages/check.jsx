import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
const RepayLoan = () => {
  const [loading, setLoading] = useState(true);

  const [loanApplicantsDetails, setLoanApplicantsDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState("");
  const [repaymentDate, setRepaymentDate] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://winnerbe.onrender.com/api/v1/loans/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Specific Loan Data:", data.data);
        setLoanApplicantsDetails(data.data);

        // fetch customer details using the id from loanApplicantsDetails.customer
        return fetch(
          `https://winnerbe.onrender.com/api/v1/customers/${data.data.customer}`,
        );
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        return response.json();
      })
      .then((customerData) => {
        console.log("Fetched Customer Data:", customerData);
        setCustomerDetails(customerData.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        toast.error("Customer Failed To Fetched");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      customerId: customerDetails._id,
      amount: repaymentAmount,
      interestRate: loanApplicantsDetails?.interestRate,
      loanStartDate: loanApplicantsDetails?.loanStartDate,
      loanEndDate: loanApplicantsDetails?.loanEndDate,
      repaymentDate: repaymentDate,
      // paymentDate: paymentDate,
    };

    console.log(formData);
    setLoading(true);

    try {
      const response = await fetch(
        `https://winnerbe.onrender.com/api/v1/loans/withdrawals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Repayment Added");
      setTimeout(() => {
        navigate("/loan-applicants");
      }, 1000);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message,
      );
      toast.error("An Error Occurred", error.message);
    } finally {
      setLoading(false); // <-- stop the loader
    }
  };
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <div class="col-xl-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Add Deposits/Withdrawal</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Customer</label>
                    <p>{customerDetails?.name}</p>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Repayment Amount</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Repayment Amount"
                      value={repaymentAmount}
                      onChange={(e) => setRepaymentAmount(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Interest Rate</label>
                    <p>{loanApplicantsDetails?.interestRate}</p>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Loan Start Date</label>
                    <p>{loanApplicantsDetails?.loanStartDate}</p>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Loan End Date</label>
                    <p>{loanApplicantsDetails?.loanEndDate}</p>
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Re-Payment Date</label>
                    <input
                      type="date"
                      class="form-control"
                      value={repaymentDate}
                      onChange={(e) => setRepaymentDate(e.target.value)}
                    />
                  </div>
                </div>

                <button onClick={handleSubmit} class="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepayLoan;
