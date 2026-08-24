import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div
        className="hero-section text-white"
        style={{
          background: "rgb(45, 199, 7)",
          minHeight: "500px",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center text-center text-lg-start">
            <div className="col-lg-7">
              {/* <span
                className="badge px-3 py-2 mb-3"
                style={{
                  backgroundColor: "rgb(48, 28, 85)",
                  color: "#111827",
                  fontSize: "1rem",
                }}
              >
                Trusted Daily Savings Cooperative
              </span> */}

              <h1
                className="fw-bold"
                style={{
                  fontSize: "clamp(2rem, 7vw, 4rem)",
                  lineHeight: "1.2",
                }}
              >
                Building Financial Discipline Through Daily Savings
              </h1>

              <p
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.3rem)",
                  maxWidth: "700px",
                  lineHeight: "1.8",
                }}
              >
                winner savings Cooperative Society helps traders, artisans,
                transport workers, entrepreneurs and salary earners grow their
                money through trusted daily thrift contributions, secure savings
                plans and financial support services.
              </p>

              <button
                className="btn btn-warning btn-lg fw-bold mt-3"
                style={{
                  backgroundColor: "rgba(34, 43, 64, 1)",
                  color: "#fff",
                }}
                onClick={() => navigate("/")}
              >
                Back Home
              </button>
            </div>

            <div className="col-lg-5 text-center mt-5 mt-lg-0">
              <img
                src="/images/logo/logo.png"
                alt="winnersave Logo"
                className="rounded-circle shadow-lg"
                style={{
                  width: "clamp(150px, 40vw, 260px)",
                  height: "clamp(150px, 40vw, 260px)",
                  objectFit: "cover",
                  border: "8px solid rgba(255,255,255,.8)",
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="container py-5">
          {/* Who We Are */}
          <div className="row g-4">
            <div className="col-lg-6">
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-3" style={{ color: "#065f46" }}>
                    Who We Are
                  </h3>

                  <p>
                    Winner Savings Cooperative Society is a community-focused
                    savings organization dedicated to helping people develop
                    strong saving habits through daily thrift contributions.
                  </p>

                  <p>
                    We provide secure and transparent financial services that
                    make it easier for members to save consistently, access
                    their funds when needed and improve their financial future.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-3" style={{ color: "#d97706" }}>
                    Our Mission
                  </h3>

                  <p>
                    To empower individuals, traders and small businesses through
                    disciplined savings, transparency and accessible financial
                    support.
                  </p>

                  <h4 className="mt-4 fw-bold" style={{ color: "#065f46" }}>
                    Our Vision
                  </h4>

                  <p>
                    To become Nigeria's most trusted daily thrift and
                    cooperative savings partner.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="row text-center py-5 g-4">
            <div className="col-md-3">
              <h1 className="fw-bold" style={{ color: "#065f46" }}>
                1000+
              </h1>
              <p>Active Savers</p>
            </div>

            <div className="col-md-3">
              <h1 className="fw-bold" style={{ color: "#10b981" }}>
                ₦50M+
              </h1>
              <p>Member Savings</p>
            </div>

            <div className="col-md-3">
              <h1 className="fw-bold" style={{ color: "#f59e0b" }}>
                Daily
              </h1>
              <p>Collections</p>
            </div>

            <div className="col-md-3">
              <h1 className="fw-bold" style={{ color: "#ef4444" }}>
                99%
              </h1>
              <p>Member Satisfaction</p>
            </div>
          </div>

          {/* Services */}
          <div
            className="card border-0 shadow mb-5"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="card-body p-5">
              <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#065f46" }}
              >
                Our Services
              </h2>

              <div className="row g-4">
                {[
                  {
                    title: "💰 Daily Thrift Savings",
                    text: "Save small amounts daily and build a stronger future.",
                  },
                  {
                    title: "📈 Fixed Savings",
                    text: "Structured savings plans for medium and long-term goals.",
                  },
                  {
                    title: "🏦 Withdrawals",
                    text: "Convenient and transparent access to your savings.",
                  },
                  {
                    title: "🤝 Loan Assistance",
                    text: "Support and loan opportunities for eligible members.",
                  },
                  {
                    title: "📱 SMS Alerts",
                    text: "Receive instant notifications for all transactions.",
                  },
                  {
                    title: "🎯 Financial Guidance",
                    text: "Advice and support to help members achieve their goals.",
                  },
                ].map((service, index) => (
                  <div className="col-md-4" key={index}>
                    <div
                      className="service-card border rounded p-4 h-100 bg-white"
                      style={{
                        transition: "0.3s",
                      }}
                    >
                      <h4>{service.title}</h4>
                      <p>{service.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div
            className="card border-0 shadow"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="card-body p-5">
              <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#065f46" }}
              >
                Why Save With winnersave?
              </h2>

              <div className="row text-center g-4">
                <div className="col-md-3">
                  <h1>🔒</h1>
                  <h5>Secure</h5>
                  <p>Your savings records are safe and protected.</p>
                </div>

                <div className="col-md-3">
                  <h1>⚡</h1>
                  <h5>Reliable</h5>
                  <p>Prompt collections and withdrawals.</p>
                </div>

                <div className="col-md-3">
                  <h1>📲</h1>
                  <h5>Digital</h5>
                  <p>Technology-driven transaction management.</p>
                </div>

                <div className="col-md-3">
                  <h1>🤝</h1>
                  <h5>Trusted</h5>
                  <p>Built on integrity and transparency.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="cta-box text-center mt-5 p-5"
            style={{
              borderRadius: "20px",
              background: "rgb(21, 255, 0)",
              color: "#fff",
            }}
          >
            <h2 className="fw-bold">Start Your Daily Savings Journey Today</h2>

            <p className="lead">
              Small daily contributions can create a stronger financial future.
            </p>

            <button
              className="btn btn-warning btn-lg fw-bold mt-3"
              style={{ backgroundColor: "rgba(34, 43, 64, 1)", color: "#fff" }}
              onClick={() => navigate("/")}
            >
              Start Saving Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
