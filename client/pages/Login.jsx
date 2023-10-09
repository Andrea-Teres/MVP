import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import "/styles/stylesheet.css";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import header from "../assets/bottom-logo.png";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState(null);

  const { email, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials,
      });
      // console.log("about to login");
      auth.login(data);
      // console.log(auth);
      console.log(data);
      setData(data.message);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setData("Login failed, please try again");
    }
  };

  return (
    <div>
      <Container display="flex" maxWidth="sm" align="center">
        <Box>
          <img src={header} alt="Park Quest" />
        </Box>
        {/* <Typography variant="h4" sx={{ mt: 5 }}>
          Your adventure starts here...
        </Typography> */}
        <Box
          sx={{
            "& .MuiTextField-root": { m: 2, width: "30ch" },
            mt: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={credentials.email}
            onChange={handleChange}
            name="email"
            className="textfield"
            label="Email"
            variant="outlined"
            color="warning"
            type="text"
          />
          <TextField
            value={credentials.password}
            onChange={handleChange}
            name="password"
            className="textfield"
            label="Password"
            variant="outlined"
            color="warning"
            type="password"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="warning"
          onClick={login}
        >
          Log in
        </Button>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "20px" }}>
            Not a member? <Link to="/register">Sign up!</Link>
          </Typography>
        </Box>
      </Container>

      {/* Link to Sign up page */}
    </div>
  );
}
