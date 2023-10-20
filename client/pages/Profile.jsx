import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import NavBar from "../components/NavBar";
import { Typography, Container, IconButton } from "@mui/material";

export default function Profile() {
  return (
    <div>
      <NavBar />

      <Container display="flex" maxWidth="lg" align="left">
        <Typography variant="h3" sx={{ mt: 5, mb: 2 }}>
          <AttractionsOutlinedIcon fontSize="inherit" sx={{ mb: 2, mr: 1 }} />
          My Profile
        </Typography>
      </Container>
    </div>
  );
}
