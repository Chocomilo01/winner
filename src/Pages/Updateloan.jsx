import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { CookiesProvider, useCookies } from "react-cookie";

const Updateloan = () => {
  const [loading, setLoading] = useState(true);

  const [loanApplicantsDetails, setLoanApplicantsDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState("");
  const [debitCredit, setDebitCredit] = useState("");
  const [repaymentDate, setRepaymentDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [loanStartDate, setLoanStartDate] = useState("");
  const [loanEndDate, setLoanEndDate] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [collectedBy, setcollectedBy] = useState("");
  const [description, setDescription] = useState("");
  const [cookies] = useCookies(["userId"]);

  const [type, setType] = useState("");
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const [userss, setUserss] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logging type value for debugging
    console.log("Type before adding to payload:", type);

    const payload = {};
    if (repaymentAmount !== "") payload.amount = repaymentAmount;
    if (interestRate !== "") payload.interestRate = interestRate;
    if (loanStartDate !== "") payload.loanStartDate = loanStartDate;
    if (loanEndDate !== "") payload.loanEndDate = loanEndDate;
    if (repaymentDate !== "") payload.repaymentDate = repaymentDate;
    if (type !== "") payload.type = type;
    if (collectedBy !== "") payload.collectedBy = collectedBy;
    if (paymentDate !== "") payload.paymentDate = paymentDate;

    // Logging payload to verify type is added
    console.log("Payload before sending:", payload);

    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://winnerbe.onrender.com/api/v1/loans/${id}/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
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

  useEffect(() => {
    fetch("https://winnerbe.onrender.com/api/v1/users", {
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
        setUsers(data.data);
      })
      .catch((error) => console.log("Error fetching data: ", error))
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, []);
  return (
    <>
      <CookiesProvider>
        {/* {loading && <Loader />} */}
        <ToastContainer />
        <div class="col-xl-12 col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Edit Deposits/Withdrawal</h4>
            </div>
            <div class="card-body">
              <div class="basic-form">
                <div>
                  <div class="row">
                    {/* <div class="mb-3 col-md-6">
                      <label class="form-label">Repayment Amount</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Repayment Amount"
                        value={repaymentAmount}
                        onChange={(e) => setRepaymentAmount(e.target.value)}
                      />
                    </div> */}
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Type</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        class="default-select form-control wide"
                      >
                        <option value="">Select One</option>
                        <option value="cash">Cash</option>
                        <option value="transfer">Transfer</option>
                      </select>
                    </div>

                    {/* <div class="mb-3 col-md-6">
                      <label class="form-label">Interest Amount</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder={loanApplicantsDetails?.interestRate}
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                    </div> */}
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Collected By</label>

                      <select
                        value={collectedBy}
                        onChange={(e) => setcollectedBy(e.target.value)}
                        class="default-select form-control wide"
                      >
                        <option value="">Select One</option>
                        {users.map((item, index) => (
                          <option value={item.firstName + item.lastName}>
                            {item.firstName}&nbsp;
                            {item.lastName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div class="mb-3 col-md-6">
                      <label class="form-label">Start Date</label>
                      <input
                        type="date"
                        class="form-control"
                        value={loanStartDate}
                        onChange={(e) => setLoanStartDate(e.target.value)}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">End Date</label>
                      <input
                        type="date"
                        class="form-control"
                        value={loanEndDate}
                        onChange={(e) => setLoanEndDate(e.target.value)}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Payment Date</label>
                      <input
                        type="date"
                        class="form-control"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                      />
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
                    <div class="mb-3 col-md-12">
                      <label class="form-label">Description</label>
                      <input
                        type="text"
                        class="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
      </CookiesProvider>
    </>
  );
};

export default Updateloan;
