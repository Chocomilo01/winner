import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerDetails = () => {
  const [customerDetails, setCustomerDetails] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");

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
      );
  }, [id]);
  function capitalizeFirstLetter(word) {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1);
  }
  return (
    <>
      <div className="row">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div class="product-detail-content">
            <div class="new-arrival-content pr">
              <h4> Name: {capitalizeFirstLetter(customerDetails?.name)}</h4>
              <p>
                Phone Number:{" "}
                <span class="item"> {customerDetails?.customersPhoneNo}</span>
              </p>

              <p>
                Sex:{" "}
                <span class="item">
                  {capitalizeFirstLetter(customerDetails?.sex)}
                </span>{" "}
              </p>
              <p>
                Occupation:{" "}
                <span class="item">
                  {capitalizeFirstLetter(customerDetails?.occupation)}
                </span>
              </p>
              <p>
                Date Of Birth:{" "}
                <span class="item">
                  {capitalizeFirstLetter(customerDetails?.dateOfBirth)}
                </span>
              </p>
              <div class="d-table mb-2">
                <p class="price float-start d-block">
                  Account Balance: {customerDetails?.accountBalance}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div class="product-detail-content">
            <div class="new-arrival-content pr">
              <h4>
                {" "}
                Next Of Kin Name:{" "}
                {capitalizeFirstLetter(customerDetails?.nextOfKin)}
              </h4>
              <p>
                Next Of Kin Phone Number:{" "}
                <span class="item"> {customerDetails?.nextOfKinPhone}</span>
              </p>

              <p>
                Contact Address:{" "}
                <span class="item">
                  {capitalizeFirstLetter(customerDetails?.contactAddress)}
                </span>{" "}
              </p>
              <p>
                Bank Name:{" "}
                <span class="item">
                  {capitalizeFirstLetter(customerDetails?.bankName)}
                </span>
              </p>
              <p>
                Bank Account Number:{" "}
                <span class="item">
                  {capitalizeFirstLetter(customerDetails?.bankAccountNo)}
                </span>
              </p>
              <div class="d-table mb-2">
                <p class="price float-start d-block">
                  Account number: {customerDetails?.accountNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
