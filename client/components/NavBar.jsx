import "/styles/stylesheet.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import header from "../assets/park-quest-logo-2.png";

function NavBar() {
  const auth = useContext(AuthContext);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: "rgb(149, 5, 50)" }}>
            <div style={{ flexGrow: 1 }}>
              <Link to="/home">
                <img src={header} alt="Park Quest" className="logo-image" />
              </Link>
            </div>
            <Link to="/profile">
              <IconButton sx={{ color: "rgb(253, 242, 202)", mr: 2, ml: 2 }}>
                <PersonIcon />
              </IconButton>
            </Link>

            <Link to="/wishlist">
              <IconButton
                size="small"
                edge="start"
                sx={{ color: "rgb(253, 242, 202)", mr: 2 }}
              >
                <FavoriteIcon />
              </IconButton>
            </Link>
            <Button
              variant="contained"
              sx={{
                color: "#960532",
                backgroundColor: "#F8F0D3",
                ":hover": {
                  backgroundColor: "#960532",
                  color: "#F8F0D3",
                },
                mr: 2,
              }}
              onClick={auth.logout}
            >
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
