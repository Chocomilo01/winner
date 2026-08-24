import React from "react";

const AddExpense = () => {
  return (
    <>
      <div class="col-xl-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Add Expense</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Expense Head</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Expense Head"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Choose Debit / Credit</label>
                    <select class="default-select form-control wide">
                      <option value="">Select One</option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Amount</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Amount"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Quantity</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Quantity"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Rate</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Rate"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Description</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Description"
                    />
                  </div>
                </div>

                <button class="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
