import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: accountHolderName,
      dateOfBirth: dob,
      occupation,
      placeOfBirth,
      sex,
      phone,
      customersPhoneNo: phone,
      maritalStatus,
      spouseName,
      spousePhoneNo: spousePhone,
      meansOfIdentification: identificationMeans,
      meansOfIdentificationNumber: idNumber,
      bankName,
      bankAccountNo,
      bankAccountName,
      nextOfKin,
      nextOfKinPhone,
      homeAddress: contactAddress,
      contactAddress,
      bvn,
      passport: "null",

      // Logged-in user
      accountOfficer:
        `${userss?.firstName || ""} ${userss?.lastName || ""}`.trim(),

      // Selected officer
      officerIncharge: accountOfficer,
    };
    setLoading(true);
    // console.log("Selected officer:", accountOfficer); // <-- ADD HERE
    // console.log("Form Data:", formData); // <-- ADD THIS TOO

    const token = localStorage.getItem("token");
    try {
      console.log("Logged In User:", userss);
      console.log("Selected Officer:", accountOfficer);
      console.log("Sending:", formData);
      const response = await fetch(
        "https://winner-3hjl.onrender.com/api/v1/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Customer Added Successfully");
      navigate("/customers-list");
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

  // const filteredUsers = users.filter((user) => user.roles === "accountOfficer");
  // console.log(filteredUsers);
  const filteredUsers = users;
  // console.log("All Users:", users);
  // console.log("Filtered Officers:", filteredUsers);

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
        // console.log("Fetched Logged In User Data:", data.data);
        setUserss(data.data);
      })
      .catch((error) => console.log("Error fetching Logged In data: ", error))
      .finally(() => setLoading(false));
  }, []);
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
                        placeholder="Applicants Full Name"
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
                        placeholder="Occupation"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label>Place Of Birth</label>
                      <input
                        type="text"
                        value={placeOfBirth}
                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                        className="form-control"
                        placeholder="Place Of Birth"
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
                        placeholder="Customer's Phone"
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
                        placeholder="Spouse Name"
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Spouse Phone No</label>
                      <input
                        type="text"
                        value={spousePhone}
                        onChange={(e) => setSpousePhone(e.target.value)}
                        placeholder="Spouse Phone No"
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
                        placeholder="Intl Passport, drivers license Number etc..."
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
                        placeholder="Bank Name"
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-4">
                      <label class="form-label">Bank Account No</label>
                      <input
                        type="text"
                        value={bankAccountNo}
                        onChange={(e) => setBankAccountNo(e.target.value)}
                        placeholder="Bank Account Number"
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-4">
                      <label class="form-label">Bank Account Name</label>
                      <input
                        type="text"
                        value={bankAccountName}
                        onChange={(e) => setBankAccountName(e.target.value)}
                        placeholder="Bank Account Name"
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
                        placeholder="Next of Kin"
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Next of Kin Phone No</label>
                      <input
                        type="text"
                        value={nextOfKinPhone}
                        onChange={(e) => setNextOfKinPhone(e.target.value)}
                        placeholder="Next of Kin Phone Number"
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
                        placeholder="Contact Address"
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
                        placeholder="BVN"
                        className="form-control"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">Officer in charge</label>

                      <select
                        value={accountOfficer}
                        onChange={(e) => setAccountOfficer(e.target.value)}
                        className="form-control"
                      >
                        <option value="">Select One</option>

                        {filteredUsers.map((item) => (
                          <option
                            key={item._id}
                            value={`${item.firstName || ""} ${item.lastName || ""}`.trim()}
                          >
                            {`${item.firstName || ""} ${item.lastName || ""}`.trim()}
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

export default AddCustomer;
