import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
const EditLoan = () => {
  const [customers, setCustomers] = useState([]);
  const [loan, setLoan] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [customerSelection, setCustomerSelection] = useState("");
  const [loanTitle, setLoanTitle] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [currentOccupation, setCurrentOccupation] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [spousePhone, setSpousePhone] = useState("");
  const [spouseOccupation, setSpouseOccupation] = useState("");
  const [spouseOfficeAddress, setSpouseOfficeAddress] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [loanStartDate, setLoanStartDate] = useState(null);
  const [loanEndDate, setLoanEndDate] = useState(null);
  const [repaymentSchedule, setRepaymentSchedule] = useState("");
  const [guarantor1Name, setGuarantor1Name] = useState("");
  const [guarantor1Sex, setGuarantor1Sex] = useState("");
  const [guarantor1Dob, setGuarantor1Dob] = useState(null);
  const [guarantor1Phone, setGuarantor1Phone] = useState("");
  const [guarantor1Occupation, setGuarantor1Occupation] = useState("");
  const [guarantor1HouseAddress, setGuarantor1HouseAddress] = useState("");
  const [guarantor1OfficeAddress, setGuarantor1OfficeAddress] = useState("");
  const [guarantor2Name, setGuarantor2Name] = useState("");
  const [guarantor2Sex, setGuarantor2Sex] = useState("");
  const [guarantor2Dob, setGuarantor2Dob] = useState(null);
  const [guarantor2Phone, setGuarantor2Phone] = useState("");
  const [guarantor2Occupation, setGuarantor2Occupation] = useState("");
  const [guarantor2HouseAddress, setGuarantor2HouseAddress] = useState("");
  const [guarantor2OfficeAddress, setGuarantor2OfficeAddress] = useState("");
  const [interestRate, setinterestRate] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5200/api/v1/loans/${id}`, {
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
        console.log("Fetched Sing:", data.data);
        toast.success("Loan Details Fetched Successfully");
        setLoan(data.data);

        // Now, fetch customer data using the loan.customer value
        return fetch(
          `http://localhost:5200/api/v1/customers/${data.data.customer}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Cuuu:", data.data);
        toast.success("Loan Customer");
        setCustomers(data.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        toast.error("Failed Loan Customer");
      })
      .finally(() => setLoading(false)); // Set loading to false here, after success or error
  }, [id]);

  function capitalizeFirstLetter(word) {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1);
  }
  console.log("check am now", customers?.name);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission behaviour
    // Combine all the useState data into one object
    const payload = {};
    if (customerSelection !== "") payload.customerId = customerSelection;
    payload.name = customers?.name; // Set the selected customer's name here

    if (loanTitle !== "") payload.loanTitle = loanTitle;
    if (phone1 !== "") payload.phoneNo1 = phone1;
    if (phone2 !== "") payload.phoneNo2 = phone2;
    if (houseAddress !== "") payload.houseAddress = houseAddress;
    if (officeAddress !== "") payload.officeAddress = officeAddress;
    if (maritalStatus !== "") payload.maritalStatus = maritalStatus;
    if (currentOccupation !== "")
      payload.currentOccupationOfApplicant = currentOccupation;
    if (spouseName !== "") payload.spouseName = spouseName;
    if (spousePhone !== "") payload.spousePhoneNo = spousePhone;
    if (spouseOccupation !== "") payload.spouseOccupation = spouseOccupation;
    if (spouseOfficeAddress !== "")
      payload.spouseOfficeAddress = spouseOfficeAddress;
    if (loanAmount !== "") payload.amount = loanAmount;
    if (loanDuration !== "") payload.loanDuration = loanDuration;
    if (interestRate !== "") payload.interestRate = interestRate;
    if (loanStartDate !== null) payload.loanStartDate = loanStartDate;
    if (loanEndDate !== null) payload.loanEndDate = loanEndDate;
    if (repaymentSchedule !== "") payload.repaymentSchedule = repaymentSchedule;
    if (guarantor1Name !== "") payload.firstGuarantorsName = guarantor1Name;
    if (guarantor1Sex !== "") payload.firstGuarantorsSex = guarantor1Sex;
    if (guarantor1Dob !== null)
      payload.firstGuarantorsDateOfBirth = guarantor1Dob;
    if (guarantor1Phone !== "")
      payload.firstGuarantorsPhoneNumber = guarantor1Phone;
    if (guarantor1Occupation !== "")
      payload.firstGuarantorsOccupation = guarantor1Occupation;
    if (guarantor1HouseAddress !== "")
      payload.firstGuarantorsHouseAddress = guarantor1HouseAddress;
    if (guarantor1OfficeAddress !== "")
      payload.firstGuarantorsOfficeAddress = guarantor1OfficeAddress;
    if (guarantor2Name !== "") payload.secondGuarantorsName = guarantor2Name;
    if (guarantor2Sex !== "") payload.secondGuarantorsSex = guarantor2Sex;
    if (guarantor2Dob !== null)
      payload.secondGuarantorsDateOfBirth = guarantor2Dob;
    if (guarantor2Phone !== "")
      payload.secondGuarantorsPhoneNumber = guarantor2Phone;
    if (guarantor2Occupation !== "")
      payload.secondGuarantorsOccupation = guarantor2Occupation;
    if (guarantor2HouseAddress !== "")
      payload.secondGuarantorsHouseAddress = guarantor2HouseAddress;
    if (guarantor2OfficeAddress !== "")
      payload.secondGuarantorsOfficeAddress = guarantor2OfficeAddress;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5200/api/v1/loans/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Handle successful put, maybe set a success message or redirect user
      toast.success("Loan Application Edited Successfully!");
      toast.success(data.message);
      navigate("/loan-applicants");
    } catch (error) {
      // Handle errors, maybe display a message to the user
      console.error("There was a problem with the PUT operation:", error);

      toast.error("An Error Occurred");
    }
  };
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <div class="col-xl-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Loan Application Form</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Search and Select Customer</label>
                    <p>{capitalizeFirstLetter(customers?.name)}</p>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Loan Title</label>
                    <input
                      type="text"
                      value={loanTitle}
                      onChange={(e) => setLoanTitle(e.target.value)}
                      placeholder={loan.loanTitle}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Phone NO 1</label>
                    <input
                      type="number"
                      class="form-control"
                      value={phone1}
                      onChange={(e) => setPhone1(e.target.value)}
                      placeholder={loan.phoneNo1}
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label>Phone NO 2</label>
                    <input
                      type="number"
                      class="form-control"
                      value={phone2}
                      onChange={(e) => setPhone2(e.target.value)}
                      placeholder={loan.loanNoTitle}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-12">
                    <label class="form-label">House Address</label>
                    <input
                      type="text"
                      class="form-control"
                      value={houseAddress}
                      onChange={(e) => setHouseAddress(e.target.value)}
                      placeholder={loan.houseAddress}
                    />
                  </div>
                  <div class="mb-3 col-md-12">
                    <label class="form-label">Office Address</label>
                    <input
                      type="text"
                      placeholder={loan.officeAddress}
                      value={officeAddress}
                      onChange={(e) => setOfficeAddress(e.target.value)}
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Marital Status</label>
                    <select
                      id="inputState"
                      class="default-select form-control wide"
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                      <option selected>Select One</option>
                      <option value={"single"}>Single</option>
                      <option value={"married"}>Married</option>
                      <option value={"divorced"}>Divorced</option>
                    </select>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">
                      Current Occupation Of Applicant
                    </label>
                    <input
                      type="text"
                      value={currentOccupation}
                      onChange={(e) => setCurrentOccupation(e.target.value)}
                      placeholder={loan.currentOccupationOfApplicant}
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Spouse Name</label>
                    <input
                      type="text"
                      placeholder={loan.spouseName}
                      value={spouseName}
                      onChange={(e) => setSpouseName(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Spouse Phone No</label>
                    <input
                      type="number"
                      value={spousePhone}
                      onChange={(e) => setSpousePhone(e.target.value)}
                      placeholder={loan.spousePhoneNo}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Spouse Occupation</label>
                    <input
                      type="text"
                      placeholder={loan.spouseOccupation}
                      value={spouseOccupation}
                      onChange={(e) => setSpouseOccupation(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Spouse Office Address</label>
                    <input
                      type="text"
                      placeholder={loan.spouseOfficeAddress}
                      value={spouseOfficeAddress}
                      onChange={(e) => setSpouseOfficeAddress(e.target.value)}
                      class="form-control"
                    />
                  </div>
                </div>
                <h3>LOAN REQUEST DETAILS</h3>
                <div class="row">
                  <div class="mb-3 col-md-4">
                    <label class="form-label">LOAN REQUESTED AMOUNT</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text border-0">&#8358;</span>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        class="form-control"
                        placeholder={loan.totalLoanRecieved}
                      />
                    </div>
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">LOAN TENURE/DURATION</label>
                    <select
                      id="inputState"
                      class="default-select form-control wide"
                      value={loanDuration}
                      onChange={(e) => setLoanDuration(e.target.value)}
                    >
                      <option selected>Nothing Selected</option>
                      <option value={"onemonth"}>1 Month (30 Days)</option>
                      <option value={"twomonths"}>2 Month (60 Days)</option>
                      <option value={"threemonths"}>3 Month (90 Days)</option>
                    </select>
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">Interest Amount</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text border-0">&#8358;</span>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setinterestRate(e.target.value)}
                        class="form-control"
                        placeholder={loan.totalInterestAccured}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-4">
                    <label class="form-label">LOAN START DATE</label>
                    <input
                      type="date"
                      value={loanStartDate}
                      onChange={(e) => setLoanStartDate(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">LOAN END DATE</label>
                    <input
                      type="date"
                      class="form-control"
                      value={loanEndDate}
                      onChange={(e) => setLoanEndDate(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">REPAYMENT SCHEDULE</label>
                    <select
                      id="inputState"
                      class="default-select form-control wide"
                      value={repaymentSchedule}
                      onChange={(e) => setRepaymentSchedule(e.target.value)}
                    >
                      <option selected>Nothing Selected</option>
                      <option value={"daily"}>Daily</option>
                      <option value={"weekly"}>Weekly</option>
                      <option value={"bi-weekly"}>BiWeekly</option>
                      <option value={"monthly"}>Monthly</option>
                      <option value={"quaterly"}>Quaterly</option>
                      <option value={"bi-anually"}>BiAnnually</option>
                      <option value={"anually"}>Annually</option>
                    </select>
                  </div>
                </div>
                <h3>GUARANTORS' DETAILS</h3>
                <h3>FIRST GUARANTOR'S DETAILS</h3>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">GUARANTOR'S Name</label>
                    <input
                      type="text"
                      placeholder={loan.firstGuarantorsName}
                      class="form-control"
                      value={guarantor1Name}
                      onChange={(e) => setGuarantor1Name(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Sex</label>
                    <select
                      id="inputState"
                      class="default-select form-control wide"
                      value={guarantor1Sex}
                      onChange={(e) => setGuarantor1Sex(e.target.value)}
                    >
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">Date Of Birth</label>
                    <input
                      type="date"
                      value={guarantor1Dob}
                      onChange={(e) => setGuarantor1Dob(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">Phone Number</label>
                    <input
                      type="text"
                      placeholder={loan.firstGuarantorsPhoneNumber}
                      value={guarantor1Phone}
                      onChange={(e) => setGuarantor1Phone(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">Occupation</label>
                    <input
                      type="text"
                      value={guarantor1Occupation}
                      onChange={(e) => setGuarantor1Occupation(e.target.value)}
                      placeholder={loan.firstGuarantorsOccupation}
                      class="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <label class="form-label">House Address</label>
                    <input
                      type="text"
                      placeholder={loan.firstGuarantorsHouseAddress}
                      value={guarantor1HouseAddress}
                      onChange={(e) =>
                        setGuarantor1HouseAddress(e.target.value)
                      }
                      class="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label class="form-label">Office Address</label>
                    <input
                      type="text"
                      placeholder={loan.firstGuarantorsOfficeAddress}
                      value={guarantor1OfficeAddress}
                      onChange={(e) =>
                        setGuarantor1OfficeAddress(e.target.value)
                      }
                      class="form-control"
                    />
                  </div>
                </div>

                <h3>SECOND GUARANTOR'S DETAILS</h3>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">GUARANTOR'S Name</label>
                    <input
                      type="text"
                      placeholder={loan.secondGuarantorsName}
                      value={guarantor2Name}
                      onChange={(e) => setGuarantor2Name(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Sex</label>
                    <select
                      id="inputState"
                      class="default-select form-control wide"
                      value={guarantor2Sex}
                      onChange={(e) => setGuarantor2Sex(e.target.value)}
                    >
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">Date Of Birth</label>
                    <input
                      type="date"
                      value={guarantor2Dob}
                      onChange={(e) => setGuarantor2Dob(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">Phone Number</label>
                    <input
                      type="text"
                      placeholder={loan.secondGuarantorsPhoneNumber}
                      value={guarantor2Phone}
                      onChange={(e) => setGuarantor2Phone(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label class="form-label">Occupation</label>
                    <input
                      type="text"
                      placeholder={loan.secondGuarantorsOccupation}
                      class="form-control"
                      value={guarantor2Occupation}
                      onChange={(e) => setGuarantor2Occupation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <label class="form-label">House Address</label>
                    <input
                      type="text"
                      placeholder={loan.secondGuarantorsHouseAddress}
                      class="form-control"
                      value={guarantor2HouseAddress}
                      onChange={(e) =>
                        setGuarantor2HouseAddress(e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label class="form-label">Office Address</label>
                    <input
                      type="text"
                      placeholder={loan.secondGuarantorsOfficeAddress}
                      value={guarantor2OfficeAddress}
                      onChange={(e) =>
                        setGuarantor2OfficeAddress(e.target.value)
                      }
                      class="form-control"
                    />
                  </div>
                </div>

                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLoan;
