import React from "react";

const Expenses = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 class="card-title">All Expenses</h4>
          <button type="button" className="btn btn-primary mb-2">
            Add Expense
          </button>
        </div>
        <div className="card-body">
          <div class="table-responsive">
            <table class="table table-responsive-md">
              <thead>
                <tr>
                  <th>
                    <strong>Created At</strong>
                  </th>
                  <th>
                    <strong>Qty</strong>
                  </th>
                  <th>
                    <strong>Description</strong>
                  </th>
                  <th>
                    <strong>Rate</strong>
                  </th>
                  <th>
                    <strong>Amount</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>4 Jan 2024</td>
                  <td>2</td>
                  <td>Computer Stationaries</td>
                  <td>200,000</td>
                  <td>400,000</td>
                </tr>
                <tr>
                  <td>4 Jan 2024</td>
                  <td>2</td>
                  <td>Computer Stationaries</td>
                  <td>200,000</td>
                  <td>400,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
