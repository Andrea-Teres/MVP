import React from "react";
import "/styles/LoginSignup.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Login() {
  // make input and button functional

  //create endpoint to authenticate users

  //create users table containing email and password

  //make Home and Wishlist pages private

  return (
    <div>
      <Container maxWidth="md" align="center">
        <Typography variant="h2" gutterBottom>
          Log in
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "30ch" },
            mt: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              color="secondary"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="secondary"
            />
          </div>
        </Box>
        <Button variant="outlined" color="secondary">
          Log in
        </Button>
        <Box sx={{ mt: 2 }}>
          <Typography>Not a member? Sign up here!</Typography>
        </Box>
      </Container>

      {/* Link to Sign up page */}
    </div>
  );
}
