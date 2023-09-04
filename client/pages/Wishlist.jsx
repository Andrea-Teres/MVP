import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindowF,
} from "@react-google-maps/api";
import "../styles/GoogleMapComponent.css";
import "/styles/stylesheet.css";
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
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import title from "../assets/my-wishlist.png";

import axios from "axios";

const { VITE_GOOGLE_API_KEY } = import.meta.env;

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null); // New state for current location

  useEffect(() => {
    loadWishlist();
    // Get current location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log("Error getting current location:", error);
        }
      );
    }
  }, []);

  const loadWishlist = async () => {
    try {
      const response = await axios.get("/api/wishlist");
      const data = response.data; // Assuming the response format is an array of wishlist items
      setWishlist(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItemFromWishlist = async (id) => {
    try {
      await axios.delete("/api/wishlist", { data: { id } }); // Send id in the request body
      loadWishlist(); // Reload wishlist after deletion
      console.log("Item deleted successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  //MAP
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  //these markers are used for the boundaries of the map on initial load of the page, see onLoad function
  const [markers, setMarkers] = useState([
    { lat: 41.3874, lng: 2.1686 }, //Barcelona
    { lat: 41.3574, lng: 2.0707 },
    { lat: 41.363, lng: 2.1651 },
    { lat: 41.447, lng: 2.245 },
  ]);

  //these states are used for onClick event on markers
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [highlightedPark, setHighlightedPark] = useState("");

  const changeHighlightedPark = (locationDetails) => {
    console.log(locationDetails);
    setHighlightedPark(locationDetails);
    console.log(wishlist);
  };

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  useEffect(() => {
    showMarkerInfoWindow(
      highlightedPark?.google_id,
      highlightedPark?.name,
      highlightedPark?.address
    );
  }, [highlightedPark]);

  const showMarkerInfoWindow = (id, name, address) => {
    // mapRef?.panTo({ lat, lng });

    setInfoWindowData({ id, address, name });

    setIsOpen(true);
  };

  return (
    <div>
      <Container display="flex" maxWidth="lg" align="left">
        {/* <Typography variant="h4" sx={{ mt: 5, mb: 2 }}>
          Wishlist
        </Typography> */}
        <img src={title} alt="My Wishlist" className="title-image" />
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Paper>
              <TableContainer sx={{ maxHeight: 330, mt: 2, overflowY: "auto" }}>
                <Table stickyHeader aria-label="wishlist table">
                  {wishlist.length > 0 && (
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody>
                    {wishlist.map((locationDetails) => (
                      <TableRow key={locationDetails.id}>
                        <TableCell>
                          <Typography
                            onClick={() =>
                              changeHighlightedPark(locationDetails)
                            }
                          >
                            {locationDetails.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton
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
                            sx={{ color: "rgb(149, 5, 50)" }}
                            onClick={() =>
                              deleteItemFromWishlist(locationDetails.id)
                            }
                          >
                            <HeartBrokenOutlinedIcon />{" "}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* MAP COMPONENT */}

          <Grid item xs={7}>
            <div className="map-container-wrap m-3">
              <div className="App">
                {!isLoaded ? (
                  <h1>Loading...</h1>
                ) : (
                  <GoogleMap
                    mapContainerClassName="map-container"
                    onLoad={onLoad}
                    center={
                      highlightedPark
                        ? {
                            lat: +highlightedPark.latitude,
                            lng: +highlightedPark.longitude,
                          }
                        : currentLocation // Use current location if no highlightedPark
                    }
                  >
                    {wishlist?.map((locationDetails) => (
                      <div key={locationDetails.id}>
                        <MarkerF
                          position={{
                            lat: +locationDetails?.latitude,
                            lng: +locationDetails?.longitude,
                          }}
                          onClick={() => {
                            showMarkerInfoWindow(
                              locationDetails.google_id,
                              locationDetails.name,
                              locationDetails.address
                            );
                          }}
                          key={locationDetails.id}
                          icon={
                            "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
                          }
                        >
                          {isOpen &&
                            infoWindowData?.id ===
                              locationDetails.google_id && (
                              <InfoWindowF
                                position={{
                                  // Provide a position prop
                                  lat: +locationDetails?.latitude,
                                  lng: +locationDetails?.longitude,
                                }}
                                onCloseClick={() => {
                                  setIsOpen(false);
                                }}
                              >
                                <div>
                                  <p className="infoWindowTitle">
                                    {infoWindowData.name}
                                  </p>
                                  <p className="infoWindowData">
                                    {infoWindowData.name}{" "}
                                    {infoWindowData.address}
                                  </p>
                                </div>
                              </InfoWindowF>
                            )}
                        </MarkerF>
                      </div>
                    ))}
                  </GoogleMap>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
