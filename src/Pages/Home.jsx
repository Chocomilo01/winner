// import React from "react";
// import HomeCards from "../Components/HomeCards";

// const Home = () => {
//   return (
//     <>

//           <div class="row">
//             <div class="col-xl-9 col-xxl-12">
//               <div class="row">
//                 <div className="col-lg-12">
//                   <HomeCards />
//                   {/* <FinancesCard />
//                   <Progress /> */}
//                 </div>
//               </div>
//             </div>

//       </div>
//     </>
//   );
// };

// export default Home;

import React from "react";
import HomeCards from "../Components/HomeCards";

const Home = () => {
  const role = localStorage.getItem("role");

  const canViewDashboard = role === "superAdmin" || role === "manager";

  return (
    <>
      <div className="row">
        <div className="col-xl-9 col-xxl-12">
          <div className="row">
            <div className="col-lg-12">
              {canViewDashboard ? (
                <HomeCards />
              ) : (
                <div
                  style={{
                    minHeight: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <h2 style={{ color: "#4b2e91", marginBottom: "10px" }}>
                    Loyalty is Royalty
                  </h2>

                  <p style={{ color: "#666", fontSize: "16px" }}>
                    You are not authorized to view this content.
                  </p>
                </div>
              )}

              {/* <FinancesCard />
              <Progress /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;