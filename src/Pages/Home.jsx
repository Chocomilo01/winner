import React from "react";
import HomeCards from "../Components/HomeCards";

const Home = () => {
  return (
    <>
     
          <div class="row">
            <div class="col-xl-9 col-xxl-12">
              <div class="row">
                <div className="col-lg-12">
                  <HomeCards />
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
