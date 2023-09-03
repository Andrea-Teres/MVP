import React from "react";
import "/styles/LoginSignup.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { makeStyles } from "@mui/styles";

export default function Login() {
  // make input and button functional

  //create endpoint to authenticate users

  //make Home and Wishlist pages private
  // const useStyles = makeStyles((theme) => ({
  //   customTextField: {
  //     backgroundColor: "#ffebee",
  //   },
  // }));
  // const classes = useStyles();

  return (
    <div>
      <Container maxWidth="md" align="center">
        <Typography variant="h4" gutterBottom>
          Log in to My Theme Park
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
              className="white-background"
              label="Email"
              variant="outlined"
              color="warning"
            />
            <TextField
              className="white-background"
              label="Password"
              variant="outlined"
              color="warning"
            />
          </div>
        </Box>
        <Button variant="outlined" color="warning">
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
