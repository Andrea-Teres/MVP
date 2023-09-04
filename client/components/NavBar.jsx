import "/styles/stylesheet.css";
import { Routes, Route, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import header from "../assets/park-quest-logo-2.png";

function NavBar() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: "rgb(149, 5, 50)" }}>
            <Typography sx={{ color: "rgb(253, 242, 202)", mr: 0.5, ml: 2 }}>
              <AttractionsOutlinedIcon />
            </Typography>
            <Typography
              component="div"
              sx={{
                color: "rgb(253, 242, 202)",
                paddingRight: 42,
              }}
            >
              Welcome, User!
            </Typography>
            <div style={{ flexGrow: 1 }}>
              <Link to="/home">
                <img src={header} alt="Park Quest" className="logo-image" />
              </Link>
            </div>
            <Link to="/wishlist">
              <IconButton
                size="small"
                edge="start"
                sx={{ color: "rgb(253, 242, 202)", mr: 2 }}
              >
                <FavoriteIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
