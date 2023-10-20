import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import NavBar from "../components/NavBar";
import { Typography, Container } from "@mui/material";

export default function Profile() {
  return (
    <div>
      <NavBar />

      <Container display="flex" maxWidth="lg" align="left">
        <Typography variant="h3" sx={{ mt: 5, mb: 2 }}>
          My Profile
        </Typography>
      </Container>
    </div>
  );
}
