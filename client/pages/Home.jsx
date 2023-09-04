import React, { useState, useEffect } from "react";
import "/styles/stylesheet.css";
import Map from "/components/Map";
import GoogleMapComponent from "../components/GoogleMapComponent";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Home() {
  const [parks, setParks] = useState([]);
  const [newPark, setNewPark] = useState("");
  const [error, setError] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);

  const [searchResultsList, setSearchResultsList] = useState([]); //this is the main state used for the logic of the app
  const [highlightedPark, setHighlightedPark] = useState("");

  const [
    selectedToShowPhotoAndOpeningHours,
    setSelectedToShowPhotoAndOpeningHours,
  ] = useState();

  const changeSearchResultsList = (newSearchResultsList) => {
    setSearchResultsList(newSearchResultsList);
  };

  //ADD the park to my wishlist
  async function addToWishlist(park) {
    try {
      // Send a POST request to your backend API endpoint (/api/wishlist)
      const response = await axios.post("/api/wishlist", park);

      // Check the response status and handle success or error accordingly
      if (response.status === 200) {
        alert(`${park.name} has been added to your wishlist!`);
        return response.data; // Return data on success
      } else {
        console.log("Response was not ok");
        throw new Error("Unknown error occurred");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // The server returned a 400 status code (Bad Request)
        alert(`You already have ${park.name} in your wishlist.`);
        console.error(
          "Error adding park to wishlist:",
          err.response.data.error
        );
      } else {
        // Handle other errors (e.g., network issues, server crashes)
        alert("An error occurred while adding the park to your wishlist.");
        console.error("Error adding park to wishlist:", err);
      }
    }
  }

  //DISABLE button when clicked
  // const disableButton = (event) => {
  //   event.currentTarget.disabled = true;
  // };

  const changeHighlightedPark = (locationDetails) => {
    console.log(locationDetails);
    setHighlightedPark(locationDetails);
  };

  const showPhotoAndOpeningHours = (id) => {
    console.log(id);
    !selectedToShowPhotoAndOpeningHours?.[id]
      ? setSelectedToShowPhotoAndOpeningHours({
          [id]: true,
        })
      : setSelectedToShowPhotoAndOpeningHours({
          [id]: false,
        });
  };

  return (
    <div>
      <Container display="flex" maxWidth="lg" align="center">
        {error && <div className="error-message">{error}</div>}
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <GoogleMapComponent
              changeSearchResultsList={changeSearchResultsList}
              searchResultsList={searchResultsList}
              highlightedPark={highlightedPark}
              setHighlightedPark={setHighlightedPark}
            />
          </Grid>
          <Grid item xs={5}>
            <Paper>
              <TableContainer sx={{ maxHeight: 330, mt: 13 }}>
                <Table stickyHeader aria-label="results table">
                  {searchResultsList.length > 0 && ( // Conditionally render TableHead
                    <TableHead>
                      <TableRow>
                        {/* Add table headers here */}
                        <TableCell>Name</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody>
                    {searchResultsList.map((locationDetails) => (
                      <TableRow key={locationDetails.place_id}>
                        <TableCell>
                          <Typography
                            onClick={() =>
                              changeHighlightedPark(locationDetails)
                            }
                            className={
                              selectedToShowPhotoAndOpeningHours
                                ? "fw-bold"
                                : ""
                            }
                          >
                            {locationDetails.name}
                          </Typography>
                          {selectedToShowPhotoAndOpeningHours?.[
                            locationDetails.place_id
                          ] &&
                            locationDetails?.photos && (
                              <div>
                                <img
                                  src={locationDetails?.photos?.[0]?.getUrl()}
                                  alt=""
                                  height="150px"
                                />
                              </div>
                            )}
                        </TableCell>
                        <TableCell>{locationDetails.rating}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="location"
                            sx={{ color: "rgb(149, 5, 50)" }}
                            onClick={() =>
                              changeHighlightedPark(locationDetails)
                            }
                          >
                            <LocationOnIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            type="submit"
                            sx={{ color: "rgb(149, 5, 50)" }}
                            onClick={(e) => {
                              addToWishlist({
                                google_id: locationDetails.place_id,
                                name: locationDetails.name,
                                rating: locationDetails.rating,
                                address: locationDetails.formatted_address,
                                image_url:
                                  locationDetails.photos[0]?.getUrl() || "",
                                latitude:
                                  locationDetails.geometry.location.lat(),
                                longitude:
                                  locationDetails.geometry.location.lng(),
                              });
                            }}
                          >
                            <FavoriteBorderIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
