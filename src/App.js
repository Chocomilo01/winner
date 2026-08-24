import "./App.css";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import NavHeader from "./Components/NavHeader";
import Routing from "./Routes";
import Login from "./Components/LoginAndRegister/Login";
import About from "./Components/LoginAndRegister/About";
import React, { useState } from "react";
import EditUser from "./Pages/EditUser";




import { UserContextProvider } from "./UserContext";
import { CookiesProvider } from "react-cookie";
import { Routes, Route, Navigate } from "react-router-dom";
import StaffLogin from "./Components/LoginAndRegister/StaffLogin";
function App() {
   const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <CookiesProvider>
      <UserContextProvider>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          {/* PROTECTED ROUTES */}
          <Route
            path="/*"
            element={
              token ? (
                <div id="main-wrapper">
                  <NavHeader
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />

                  <Header />

                  <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />

                  <div className="content-body">
                    <div className="container-fluid">
                      <Routing />
                    </div>
                  </div>

                  <div className="footer">
                    <div className="copyright">
                      <p>
                        Copyright © 2026 Techmint || Developed by{" "}
                        <a
                          href="https://techmint.africa/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Techmint
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default App;
