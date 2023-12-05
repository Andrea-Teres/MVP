import { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import { Typography, Container, IconButton } from "@mui/material";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  const getMyProfile = async () => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      const { data } = await axios.get(`/api/auth/profile`);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = await getMyProfile();

      console.log("the user is", user);
      setUser(user);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  return (
    <div>
      <NavBar />

      <Container display="flex" maxWidth="lg" align="left">
        <Typography variant="h3" sx={{ mt: 5, mb: 2 }}>
          <AttractionsOutlinedIcon fontSize="inherit" sx={{ mb: 2, mr: 1 }} />
          Welcome, {user && user.username}!
        </Typography>
      </Container>
    </div>
  );
}
