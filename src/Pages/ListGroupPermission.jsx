import React from "react";

const ListGroupPermission = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 class="card-title">Groups And Permissions</h4>

          <button className="btn btn-primary mb-2">
            Add New Group/Permission
          </button>
        </div>
        <div className="card-body">
          <div class="table-responsive">
            <table class="table table-responsive-md">
              <thead>
                <tr>
                  <th>
                    <strong>GROUP NAME</strong>
                  </th>
                  <th>
                    <strong>NO OF USERS</strong>
                  </th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ACCOUNT OFFICER</td>
                  <td>11</td>

                  <td>
                    <div class="dropdown">
                      <button
                        type="button"
                        class="btn btn-success light sharp"
                        data-bs-toggle="dropdown"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          version="1.1"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <rect x="0" y="0" width="24" height="24" />
                            <circle fill="#000000" cx="5" cy="12" r="2" />
                            <circle fill="#000000" cx="12" cy="12" r="2" />
                            <circle fill="#000000" cx="19" cy="12" r="2" />
                          </g>
                        </svg>
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">
                          View Details
                        </a>

                        <a class="dropdown-item" href="#">
                          Delete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListGroupPermission;
