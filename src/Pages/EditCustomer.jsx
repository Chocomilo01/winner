import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

const EditCustomer = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [userss, setUserss] = useState([]);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [dob, setDob] = useState("");
  const [occupation, setOccupation] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [passport, setPassport] = useState(null);
  const [phone, setPhone] = useState("");
  const [cookies] = useCookies(["userId"]);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [spousePhone, setSpousePhone] = useState("");
  const [identificationMeans, setIdentificationMeans] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [nextOfKin, setNextOfKin] = useState("");
  const [nextOfKinPhone, setNextOfKinPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [bvn, setBvn] = useState("");
  const [accountOfficer, setAccountOfficer] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};

    if (accountHolderName !== "") payload.name = accountHolderName;
    if (dob !== "") payload.dateOfBirth = dob;
    if (occupation !== "") payload.occupation = occupation;
    if (placeOfBirth !== "") payload.placeOfBirth = placeOfBirth;
    if (sex !== "") payload.sex = sex;
    if (phone !== "") payload.phone = phone;
    if (phone !== "") payload.customersPhoneNo = phone;
    if (maritalStatus !== "") payload.maritalStatus = maritalStatus;
    if (spouseName !== "") payload.spouseName = spouseName;
    if (spousePhone !== "") payload.spousePhoneNo = spousePhone;
    if (identificationMeans !== "")
      payload.meansOfIdentification = identificationMeans;
    if (idNumber !== "") payload.meansOfIdentificationNumber = idNumber;
    if (bankName !== "") payload.bankName = bankName;
    if (bankAccountNo !== "") payload.bankAccountNo = bankAccountNo;
    if (bankAccountName !== "") payload.bankAccountName = bankAccountName;
    if (nextOfKin !== "") payload.nextOfKin = nextOfKin;
    if (nextOfKinPhone !== "") payload.nextOfKinPhone = nextOfKinPhone;
    if (contactAddress !== "") payload.homeAddress = contactAddress;
    if (contactAddress !== "") payload.contactAddress = contactAddress;
    if (accountOfficer !== "") payload.accountOfficer = userss?.firstName;
    if (bvn !== "") payload.bvn = bvn;
    if (passport !== "") payload.passport = "null";
    if (accountOfficer !== "") payload.officerIncharge = accountOfficer;
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://winner-3hjl.onrender.com/api/v1/customers/${id}`,
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
      toast.success("Customer Edited Successfully");
      navigate(`/customer-available-balance/${id}`);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message,
      );
      toast.error("An Error Occurred");
    } finally {
      setLoading(false); // <-- stop the loader
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace 'your_token_key' with the actual key you use to store the token

    fetch("https://winner-3hjl.onrender.com/api/v1/users", {
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

  const filteredUsers = users.filter((user) => user.roles === "accountOfficer");
  console.log(filteredUsers);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace 'your_token_key' with the actual key you use to store the token

    fetch(`https://winner-3hjl.onrender.com/api/v1/users/${cookies.userId}`, {
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
        setUserss(data.data);
      })
      .catch((error) => console.log("Error fetching Logged In data: ", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch customer details
    fetch(`https://winner-3hjl.onrender.com/api/v1/customers/${id}`, {
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
        setCustomerDetails(data.data);
        console.log("ewoo", data.data);
      })
      .catch((error) =>
        console.log("Error fetching specific customer data: ", error),
      );
  }, [id]);
  function capitalizeFirstLetter(word) {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1);
  }
  return (
    <div>
      <CookiesProvider>
        <ToastContainer />
        {loading && <Loader />}
        <div class="col-xl-12 col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Add Customer</h4>
            </div>
            <div class="card-body">
              <div class="basic-form">
                <div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Account Holder's Name:</label>

                      <input
                        type="text"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        class="form-control"
                        placeholder={capitalizeFirstLetter(
                          customerDetails?.name,
                        )}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Date of Birth</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Occupation</label>
                      <input
                        type="text"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="form-control"
                        placeholder={customerDetails?.occupation}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label>Place Of Birth</label>
                      <input
                        type="text"
                        value={placeOfBirth}
                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                        className="form-control"
                        placeholder={customerDetails?.placeOfBirth}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Sex</label>
                      <select
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        className="default-select form-control wide"
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Passport</label>
                      <input
                        type="file"
                        onChange={(e) => setPassport(e.target.files[0])}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Customer's Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={customerDetails?.customersPhoneNo}
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Marital Status</label>
                      <select
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        className="default-select form-control wide"
                      >
                        <option value="" disabled>
                          Select One
                        </option>
                        <option value={"Single"}>Single</option>
                        <option value={"Married"}>Married</option>
                        <option value={"Divorced"}>Divorced</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Spouse Name</label>
                      <input
                        type="text"
                        value={spouseName}
                        onChange={(e) => setSpouseName(e.target.value)}
                        placeholder={customerDetails?.spouseName}
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Spouse Phone No</label>
                      <input
                        type="text"
                        value={spousePhone}
                        onChange={(e) => setSpousePhone(e.target.value)}
                        placeholder={customerDetails?.spousePhoneNo}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Means of Identification</label>
                      <select
                        value={identificationMeans}
                        onChange={(e) => setIdentificationMeans(e.target.value)}
                        className="default-select form-control wide"
                      >
                        <option value="" disabled>
                          Intl Passport, drivers license etc...
                        </option>
                        <option value={"intl passport"}>
                          International Passport
                        </option>
                        <option value={"nin"}>NIN</option>
                        <option value={"voters card"}>Voter's Card</option>
                        <option value={"others"}>Others</option>
                      </select>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">
                        Means of Identification Number: (if others, enter ID
                        name and ID number)
                      </label>
                      <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder={
                          customerDetails?.meansOfIdentificationNumber
                        }
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-4">
                      <label class="form-label">Bank Name</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder={customerDetails?.bankName}
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-4">
                      <label class="form-label">Bank Account No</label>
                      <input
                        type="text"
                        value={bankAccountNo}
                        onChange={(e) => setBankAccountNo(e.target.value)}
                        placeholder={customerDetails?.bankAccountNo}
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-4">
                      <label class="form-label">Bank Account Name</label>
                      <input
                        type="text"
                        value={bankAccountName}
                        onChange={(e) => setBankAccountName(e.target.value)}
                        placeholder={customerDetails?.bankAccountName}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Next of Kin</label>
                      <input
                        type="text"
                        value={nextOfKin}
                        onChange={(e) => setNextOfKin(e.target.value)}
                        placeholder={customerDetails?.nextOfKin}
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Next of Kin Phone No</label>
                      <input
                        type="text"
                        value={nextOfKinPhone}
                        onChange={(e) => setNextOfKinPhone(e.target.value)}
                        placeholder={customerDetails?.nextOfKinPhone}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label class="form-label">Contact Address</label>
                      <input
                        type="text"
                        value={contactAddress}
                        onChange={(e) => setContactAddress(e.target.value)}
                        placeholder={customerDetails?.contactAddress}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label class="form-label">BVN</label>
                      <input
                        type="text"
                        value={bvn}
                        onChange={(e) => setBvn(e.target.value)}
                        placeholder={customerDetails?.customersPhoneNo}
                        className="form-control"
                        bvn
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Officer in charge</label>

                      <select
                        value={accountOfficer}
                        onChange={(e) => setAccountOfficer(e.target.value)}
                        class="default-select form-control wide"
                      >
                        <option value="">Select One</option>
                        {users.map((item, index) => (
                          <option value={item.firstName + " " + item.lastName}>
                            {item.firstName}&nbsp;
                            {item.lastName}
                          </option>
                        ))}
                      </select>
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
    </div>
  );
};

export default EditCustomer;
