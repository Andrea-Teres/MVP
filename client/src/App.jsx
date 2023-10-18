import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import Login from "/pages/Login";
import NavBar from "../components/NavBar";
import Register from "/pages/Register";
import AuthContext from "../contexts/AuthContext";
import RequireAuth from "../components/RequireAuth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, []);

  function login(data) {
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
    }
    setUser(true);
    console.log("login");
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(false);
    console.log("logout");
  }

  const authObject = {
    user,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authObject}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/wishlist"
            element={
              <RequireAuth>
                <Wishlist />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
