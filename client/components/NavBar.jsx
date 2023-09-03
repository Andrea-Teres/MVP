import "/styles/stylesheet.css";
import { Routes, Route, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: "rgb(149, 5, 50)" }}>
            <Link to="/home">
              <i
                className="fa-solid fa-house"
                style={{ color: "rgb(253, 242, 202)", padding: 20 }}
              ></i>
            </Link>

            <Link to="/wishlist">
              <i
                className="fa-solid fa-star"
                style={{ color: "rgb(253, 242, 202)", padding: 20 }}
              ></i>
            </Link>
            <Typography style={{ color: "rgb(253, 242, 202)", padding: 20 }}>
              Welcome, User!
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
