import React from "react";
import "/styles/LoginSignup.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  return (
    <div>
      <Container maxWidth="md" align="center">
        <h1>Log in</h1>
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
          <p>Not a member? Sign up here!</p>
        </Box>
      </Container>

      {/* Link to Sign up page */}
    </div>
  );
}
