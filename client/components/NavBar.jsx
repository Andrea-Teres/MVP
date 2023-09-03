import "/styles/stylesheet.css";
import { Routes, Route, Link } from "react-router-dom";

import Container from "@mui/material/Container";

function NavBar() {
  return (
    <div>
      <Container maxWidth="md" align="center">
        <ul className="nav justify-content-end container-sm grid gap-3">
          <li style={{ color: "rgb(231, 107, 24)", padding: 20 }}>
            Welcome, User!
          </li>
          <li>
            <Link to="/home">
              <i
                className="fa-solid fa-house"
                style={{ color: "rgb(231, 107, 24)", padding: 20 }}
              ></i>
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <i
                className="fa-solid fa-star"
                style={{ color: "rgb(231, 107, 24", padding: 20 }}
              ></i>
            </Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default NavBar;
