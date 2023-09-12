import React from "react";
import "/styles/stylesheet.css";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import background from "../assets/background-logo.png";

export default function Register() {
  // make input and button functional

  //create endpoint to authenticate users

  //make Home and Wishlist pages private

  return (
    <div>
      <Container display="flex" maxWidth="sm" align="center">
        <Typography variant="h4" sx={{ mt: 5 }}>
          Create your profile{" "}
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
              className="textfield"
              label="Email"
              variant="outlined"
              color="warning"
            />
            <TextField
              className="textfield"
              label="Password"
              variant="outlined"
              color="warning"
            />
          </div>
        </Box>
        <Button variant="contained" color="warning">
          Sign up{" "}
        </Button>
      </Container>

      {/* Link to Sign up page */}
    </div>
  );
}
