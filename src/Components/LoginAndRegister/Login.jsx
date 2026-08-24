import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Login = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState(1000);
  const [savings, setSavings] = useState(0);
  const [security, setSecurity] = useState(0);

  useEffect(() => {
    let savingsCount = 0;
    let securityCount = 0;

    // Members increase forever
    const memberTimer = setInterval(() => {
      setMembers((prev) => prev + 1);
    }, 5000); // +1 every 5 seconds

    // Animate savings to 50M
    const savingsTimer = setInterval(() => {
      savingsCount += 1;

      if (savingsCount >= 50) {
        savingsCount = 50;
        clearInterval(savingsTimer);
      }

      setSavings(savingsCount);
    }, 50);

    // Animate security to 100%
    const securityTimer = setInterval(() => {
      securityCount += 2;

      if (securityCount >= 100) {
        securityCount = 100;
        clearInterval(securityTimer);
      }

      setSecurity(securityCount);
    }, 25);

    return () => {
      clearInterval(memberTimer);
      clearInterval(savingsTimer);
      clearInterval(securityTimer);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(10,25,47,.75), rgba(10,25,47,.85)), url('https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* FIXED HEADER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          padding: "15px 0",
        }}
      >
        <div className="container">
          <div
            className="d-flex justify-content-between align-items-center flex-wrap px-4 py-3"
            style={{
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(0,0,0,.25)",
              gap: "15px",
            }}
          >
            <div className="d-flex align-items-center">
              <img
                src="/images/logo/logo.png"
                alt="logo"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "#fff",
                  padding: "5px",
                }}
              />

              <div className="ms-3">
                <h3 className="text-white fw-bold mb-0">winner savings</h3>

                <small
                  style={{
                    color: "rgba(255,255,255,.8)",
                  }}
                >
                  Business Company
                </small>
              </div>
            </div>

            <button
              className="btn staff-login-btn fw-bold"
              onClick={() => navigate("/staff-login")}
              style={{
                background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
              }}
            >
              Staff Login
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div
        className="container"
        style={{
          paddingTop: "150px",
        }}
      >
        <div className="row align-items-center py-5">
          {/* LEFT SIDE */}
          <div className="col-lg-7 text-white">
            <h1
              className="fw-bold"
              style={{
                fontSize: "clamp(3rem,8vw,5.5rem)",
                lineHeight: "1.1",
                color: "#ffffff",
                textShadow:
                  "0 2px 10px rgba(0,0,0,.4), 0 0 25px rgba(255,255,255,.15)",
              }}
            >
              Save Daily.
              <br />
              Grow Faster.
              <br />
              Prosper Together.
            </h1>

            <p
              className="mt-4"
              style={{
                fontSize: "1.2rem",
                color: "rgba(255,255,255,.85)",
                maxWidth: "700px",
              }}
            >
              Join thousands of traders, artisans, salary earners and
              entrepreneurs building financial stability through secure daily
              savings, flexible withdrawals and trusted cooperative services.
            </p>

            <div className="mt-5 d-flex flex-wrap gap-3">
              <button
                className="btn btn-warning btn-lg fw-bold px-4"
                onClick={() => navigate("/about")}
              >
                Open Account
              </button>

              <button
                className="btn btn-outline-light btn-lg px-4"
                onClick={() => navigate("/about")}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="col-lg-5 mt-5 mt-lg-0">
            <div
              className="p-4"
              style={{
                background: "rgba(255,255,255,.12)",
                backdropFilter: "blur(12px)",
                borderRadius: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,.25)",
              }}
            >
              <h4 className="text-white mb-4">Why Choose winnersave?</h4>

              <div className="row g-3">
                <div className="col-6">
                  <div
                    className="p-3 text-center"
                    style={{
                      background: "rgba(255,255,255,.15)",
                      borderRadius: "15px",
                    }}
                  >
                    <h2 className="text-warning fw-bold">
                      {members.toLocaleString()}+
                    </h2>

                    <small className="text-white">Members</small>
                  </div>
                </div>

                <div className="col-6">
                  <div
                    className="p-3 text-center"
                    style={{
                      background: "rgba(255,255,255,.15)",
                      borderRadius: "15px",
                    }}
                  >
                    <h2 className="text-warning fw-bold">₦{savings}M+</h2>

                    <small className="text-white">Savings</small>
                  </div>
                </div>

                <div className="col-6">
                  <div
                    className="p-3 text-center"
                    style={{
                      background: "rgba(255,255,255,.15)",
                      borderRadius: "15px",
                    }}
                  >
                    <h2 className="text-warning fw-bold">24/7</h2>

                    <small className="text-white">Support</small>
                  </div>
                </div>

                <div className="col-6">
                  <div
                    className="p-3 text-center"
                    style={{
                      background: "rgba(255,255,255,.15)",
                      borderRadius: "15px",
                    }}
                  >
                    <h2 className="text-warning fw-bold">{security}%</h2>

                    <small className="text-white">Secure</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END CARD */}
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="text-center py-4 mt-5"
        style={{
          background: "rgba(0,0,0,.35)",
          color: "#fff",
          borderTop: "1px solid rgba(255,255,255,.1)",
        }}
      >
        <div className="container">
          <div className="mb-2">
            📍 12 Adebiaye Street, Tejuosho Yaba, Lagos
          </div>

          <div className="mb-2">📞 0903 308 0031</div>

          <small>
            © {new Date().getFullYear()} Techmint Africa. All Rights Reserved.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
