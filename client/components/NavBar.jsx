import "/styles/stylesheet.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import header from "../assets/park-quest-logo-2.png";

function NavBar() {
  const auth = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState(null);

  const getUserEmail = async () => {
    try {
      const response = await axios.get("/api/user/email/:email");
      const data = response.data.email;
      setUserEmail(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserEmail();
  }, []);

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
              Welcome {userEmail}!
            </Typography>
            <a onClick={auth.logout}>Logout</a>

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
