import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader/Loader";
import { CookiesProvider, useCookies } from "react-cookie";

const AddDepositWithdrawal = () => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["userId"]);
  const [debitCredit, setDebitCredit] = useState("");
  const [type, setType] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [allowOverdraft, setAllowOverdraft] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace 'your_token_key' with the actual key you use to store the token

    fetch(`https://winnerbe.onrender.com/api/v1/customers/${id}`, {
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
    const token = localStorage.getItem("token"); // Replace 'your_token_key' with the actual key you use to store the token

    fetch(`https://winnerbe.onrender.com/api/v1/users/${cookies.userId}`, {
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
        console.log("Fetched Logged In User Data:", data.data);
        setUser(data.data);
        console.log("emmanuel", data.data);
      })
      .catch((error) => console.log("Error fetching Logged In data: ", error))
      .finally(() => setLoading(false));
  }, []);
  const formatAmountInput = (value) => {
    // Remove commas and anything that isn't a number or decimal point
    const cleanValue = value.replace(/,/g, "").replace(/[^0-9.]/g, "");

    if (!cleanValue) {
      return "";
    }

    // Prevent multiple decimal points
    const parts = cleanValue.split(".");

    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Format integer part with commas
    const formattedInteger = Number(integerPart || 0).toLocaleString("en-US");

    // Allow decimal values
    if (decimalPart !== undefined) {
      return `${formattedInteger}.${decimalPart.slice(0, 2)}`;
    }

    return formattedInteger;
  };
  const handleSubmit = async (e, forceCreate = false) => {
    e.preventDefault();

    const numericAmount = Number(amount.replace(/,/g, ""));

    if (!numericAmount || numericAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const formData = {
      amount: numericAmount,
      type: debitCredit === "debit" ? "withdrawal" : "deposit",
      choose: debitCredit,
      customerId: customerDetails?._id,
      collectedBy: collectedBy,
      description: description,
      modeOfPayment: type,
      paymentDate: paymentDate,
      uploadedBy: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      name: customerDetails?.name,
      forceCreate,
    };
    if (debitCredit !== "debit") {
      formData.modeOfPayment = type;
    }
    console.log(formData);
    setLoading(true);
    const postEndpoint =
      debitCredit === "debit"
        ? "/transactions/withdrawal"
        : "/transactions/deposit";
    const token = localStorage.getItem("token"); // Replace 'your_token_key' with the actual key you use to store the token

    try {
      const response = await fetch(
        `https://winnerbe.onrender.com/api/v1${postEndpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("BACKEND RESPONSE:", data);

      if (data.duplicate) {
        const proceed = window.confirm(
          data.message ||
            "A similar transaction was already made earlier. Do you want to continue?",
        );
        if (proceed) {
          return handleSubmit(
            {
              preventDefault: () => {},
            },
            true,
          );
        }

        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Request failed with status ${response.status}`,
        );
      }

      toast.success(
        `${debitCredit === "debit" ? "Withdrawal" : "Deposit"} added successfully`,
      );

      setTimeout(() => {
        navigate("/savings-list");
      }, 1000);
    } catch (error) {
      console.error(error);

      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setPaymentDate(today);
  }, []);

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
    <CookiesProvider>
      <ToastContainer />
      {loading && <Loader />}
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
                    <label class="form-label">Choose Debit / Credit</label>
                    <select
                      value={debitCredit}
                      onChange={(e) => {
                        setDebitCredit(e.target.value);
                        console.log(
                          "Value after changing debitCredit:",
                          e.target.value,
                        );
                      }}
                      class="default-select form-control wide"
                    >
                      {debitCredit === "debit" && (
                        <div className="mb-3 col-md-6">
                          <div className="form-check mt-4">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="allowOverdraft"
                              checked={allowOverdraft}
                              onChange={(e) =>
                                setAllowOverdraft(e.target.checked)
                              }
                            />

                            <label
                              className="form-check-label"
                              htmlFor="allowOverdraft"
                            >
                              Allow Overdraft
                            </label>
                          </div>

                          {allowOverdraft && (
                            <small className="text-warning">
                              This withdrawal may take the customer's balance
                              below ₦0.
                            </small>
                          )}
                        </div>
                      )}
                      <option value="">Select One</option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Customer</label>
                    <p>{customerDetails?.name}</p>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Amount</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) =>
                        setAmount(formatAmountInput(e.target.value))
                      }
                      className="form-control"
                      placeholder="Amount"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      class="default-select form-control wide"
                    >
                      <option value="">select one</option>
                      <option value="cash">Cash</option>
                      <option value="transfer">Transfer</option>
                      <option value="credit_card">Credit Card</option>
                    </select>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Collected By</label>

                    <select
                      value={collectedBy}
                      onChange={(e) => setCollectedBy(e.target.value)}
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
                    <label class="form-label">Payment Date</label>
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="form-control"
                      disabled={user?.roles !== "superAdmin"}
                    />
                  </div>
                  <div class="mb-3 col-md-12">
                    <label class="form-label">Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      class="form-control"
                      placeholder="Description"
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
  );
};

export default AddDepositWithdrawal;
