import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "/components/NavBar.jsx";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Login />
    </BrowserRouter>
  </React.StrictMode>
);
