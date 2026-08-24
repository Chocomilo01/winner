import React from "react";

const CreateGroupPermission = () => {
  return (
    <>
      <div class="col-xl-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Groups & Permissions</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <form>
                <div class="row">
                  <div class="mb-3 col-md-12">
                    <label class="form-label">Group Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Group Name"
                    />
                  </div>
                  <div class="mb-3 col-md-5">
                    <label class="form-label">Unassigned Permissions:</label>
                    <select
                      id="inputState"
                      class="default-select form-control wide"
                    >
                      <option selected>Select Permissions</option>
                      <option>Can Add Customers</option>
                      <option>Can Change Customers</option>
                      <option>Can Delete Customers</option>
                      <option>Can View Customers</option>
                      <option>Can add loan applicants</option>
                      <option>Can change loan applicants</option>
                      <option>Can delete loan applicants</option>
                      <option>Can view loan applicants</option>
                      <option>Can add loan applicants</option>
                      <option>Can change loan durations</option>
                      <option>Can delete loan durations</option>
                      <option>Can view loan durations</option>
                      <option>Can add loan feedback</option>
                      <option>Can change loan feedback</option>
                      <option>Can delete loan feedback</option>
                      <option>Can view loan feedback</option>
                      <option>Can change loan repayments</option>
                      <option>Can delete loan repayments</option>
                      <option>Can view loan repayments</option>
                      <option>Can add Savings</option>
                      <option>Can delete Savings</option>
                      <option>Can view Savings</option>
                      <option>Can add Savings history</option>
                      <option>Can change Savings history</option>
                      <option>Can delete Savings history</option>
                      <option>Can view Savings history</option>
                      <option>Can add Withdrawal Histories</option>
                      <option>Can change Withdrawal Histories</option>
                      <option>Can delete Withdrawal Histories</option>
                      <option>Can view Withdrawal Histories</option>
                      <option>Can add user</option>
                      <option>Can change user</option>
                      <option>Can delete user</option>
                      <option>Can view user</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-1">
                    <button class="btn btn-primary">Add</button>
                  </div>
                  <div className="mb-3 col-md-1">
                    <button class="btn btn-danger">Remove</button>
                  </div>
                  <div class="mb-3 col-md-5">
                    <label class="form-label">Assigned Permissions</label>
                    <select
                      id="inputState"
                      class="default-select form-control wide"
                    ></select>
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

export default CreateGroupPermission;
