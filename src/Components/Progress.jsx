import React from "react";
import ReactApexChart from "react-apexcharts";

const redial = {
  series: [75],
  chart: {
    type: "radialBar",
    offsetY: 0,
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -180,
      endAngle: 180,
      track: {
        background: "#F1EAFF",
        strokeWidth: "100%",
        margin: 3,
      },

      hollow: {
        margin: 20,
        size: "60%",
        background: "transparent",
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: "front",
      },

      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 5,
          fontSize: "24px",
          color: "#000000",
          fontWeight: 600,
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 1600,
      options: {
        chart: {
          height: 150,
        },
      },
    },
  ],
  grid: {
    padding: {
      top: -10,
    },
  },
  /* stroke: {
    dashArray: 4,
    colors:'#6EC51E'
  }, */
  fill: {
    type: "gradient",
    colors: "#7A849B",
    gradient: {
      shade: "black",
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [64, 43, 64, 0.5],
    },
  },
  labels: ["Average Results"],
};
const Progress = () => {
  return (
    <div>
      <div class="col-xl-3 col-sm-6">
        <div class="card">
          <div class="card-body">
            {/* <div id="redial"></div> */}
            <ReactApexChart
              options={redial}
              series={redial.series}
              //   width={240}
              //   height={100}
              //   class="chartBar"
                type="radialBar"
            />
            <span class="right-sign">
              <svg
                width="93"
                height="93"
                viewBox="0 0 93 93"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_3_700)">
                  <circle cx="46.5" cy="31.5" r="16.5" fill="#F8B940" />
                </g>
                <g clip-path="url(#clip0_3_700)">
                  <path
                    d="M52.738 25.3524C53.0957 24.9315 53.7268 24.8804 54.1476 25.2381C54.5684 25.5957 54.6196 26.2268 54.2619 26.6476L45.7619 36.6476C45.3986 37.0751 44.7549 37.1201 44.3356 36.7474L39.8356 32.7474C39.4228 32.3805 39.3857 31.7484 39.7526 31.3356C40.1195 30.9229 40.7516 30.8857 41.1643 31.2526L44.9002 34.5733L52.738 25.3524Z"
                    fill="#222B40"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_3_700"
                    x="0"
                    y="0"
                    width="93"
                    height="93"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="15" />
                    <feGaussianBlur stdDeviation="15" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_3_700"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_3_700"
                      result="shape"
                    />
                  </filter>
                  <clipPath id="clip0_3_700">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(35 19)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <div class="redia-date text-center">
              <h4>My Progress</h4>
              <p>Lorem ipsum dolor sit amet, consectetur</p>
              <a href="crm.html" class="btn btn-secondary text-black">
                More Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
