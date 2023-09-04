import "/styles/stylesheet.css";
import { Routes, Route, Link } from "react-router-dom";

import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import header from "../assets/park-quest-logo-2.png";

function NavBar() {
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
            <Typography sx={{ color: "rgb(253, 242, 202)", mr: 0.5, ml: 2 }}>
              <AttractionsOutlinedIcon />
            </Typography>
            <Typography
              component="div"
              sx={{
                color: "rgb(253, 242, 202)",
                mr: 5,
              }}
            >
              Welcome, Andrea!
            </Typography>

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
