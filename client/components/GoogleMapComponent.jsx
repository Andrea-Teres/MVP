import React, { useState, useEffect } from "react";

import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindowF,
} from "@react-google-maps/api";

import "../styles/GoogleMapComponent.css";
import "/styles/stylesheet.css";
import { Container, TextField, Box, Button, Grid } from "@mui/material";

const { VITE_GOOGLE_API_KEY } = import.meta.env;

//searchResultsList is the main state that hold the logic, it is passed as a prop from the Home page
export default function GoogleMapComponent({
  changeSearchResultsList,
  searchResultsList,
  highlightedPark,
  setHighlightedPark,
  markers,
}) {
  //MAP
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  //these markers are used for the boundaries of the map on initial load of the page, see onLoad function
  // const [markers, setMarkers] = useState([
  //   { lat: 41.3874, lng: 2.1686 }, //Barcelona
  //   { lat: 41.3574, lng: 2.0707 },
  //   { lat: 41.363, lng: 2.1651 },
  //   { lat: 41.447, lng: 2.245 },
  // ]);

  //these states are used for onClick event on markers
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

  //state for setting center of the map
  // const [center, setCenter] = useState(() => {
  //   return !highlightedPark
  //     ? {
  //         lat: searchResultsList[0]?.geometry.location.lat(),
  //         lng: searchResultsList[0]?.geometry.location.lng(),
  //       }
  //     : {
  //         lat: highlightedPark.geometry.location.lat(),
  //         lng: highlightedPark.geometry.location.lng(),
  //       };
  // });

  //other states that are needed
  const [input, setInput] = useState("");
  const [service, setService] = useState("");

  const handleChange = (event) => {
    setInput(`${event.target.value}`);
    // console.log(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search();
    console.log(highlightedPark);
  };

  const search = () => {
    service.textSearch({ query: `amusement parks ${input}` }, (suggestions) => {
      console.log(suggestions);
      const filteredSuggestions = suggestions.filter((el) =>
        //Google Places API has a property "type"
        el.types.includes("amusement_park")
      );

      console.log(filteredSuggestions);

      //this is setting searchResultsList state passed as a prop from Home page (will use this state for markers on the map, as well as for rendering the list of found parks on the page)
      changeSearchResultsList(filteredSuggestions);
      setHighlightedPark("");

      setInput("");
    });
  };

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);

    const placesService = new window.google.maps.places.PlacesService(map);
    console.log(placesService);

    setService(placesService);
  };

  useEffect(() => {
    showMarkerInfoWindow(
      highlightedPark?.place_id,
      highlightedPark?.name,
      highlightedPark?.formatted_address
    );
  }, [highlightedPark]);

  const showMarkerInfoWindow = (id, name, address) => {
    // mapRef?.panTo({ lat, lng });

    setInfoWindowData({ id, address, name });

    setIsOpen(true);
  };

  // State to store the user's current position
  const [userPosition, setUserPosition] = useState(null);

  // Fetch the user's current position
  const fetchUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user position:", error);
      }
    );
  };

  useEffect(() => {
    fetchUserPosition();
  }, []);

  return (
    <Container maxWidth="md" align="left">
      <Box
        sx={{
          "& .MuiTextField-root": { m: 2, width: "30ch" },
          mt: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            "& .MuiTextField-root": { m: 2, width: "30ch" },
            mt: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <div className="search-container">
            <form onSubmit={handleSubmit}>
              <TextField
                value={input}
                onChange={handleChange}
                placeholder="Search by location or park name"
                className="textfield"
                color="warning"
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                color="warning"
                sx={{ marginBottom: "-44px" }}
              >
                Search
              </Button>
            </form>
          </div>
        </Box>

        <div className="map-container-wrap">
          <div className="App">
            {!isLoaded ? (
              <h4>Loading...</h4>
            ) : (
              <GoogleMap
                mapContainerClassName="map-container"
                onLoad={onLoad}
                center={
                  searchResultsList.length > 0
                    ? {
                        lat: searchResultsList[0].geometry.location.lat(),
                        lng: searchResultsList[0].geometry.location.lng(),
                      }
                    : userPosition || { lat: 0, lng: 0 } // Use a default center if no results or user position available
                }
              >
                {searchResultsList?.map((locationDetails) => (
                  <MarkerF
                    position={{
                      lat: locationDetails.geometry.location.lat(),
                      lng: locationDetails.geometry.location.lng(),
                    }}
                    onClick={() => {
                      showMarkerInfoWindow(
                        locationDetails.place_id,
                        locationDetails.name,
                        // locationDetails.geometry.location.lat(),
                        // locationDetails.geometry.location.lng(),
                        locationDetails.formatted_address
                      );
                    }}
                    key={locationDetails.place_id}
                    icon={
                      "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
                    }
                  >
                    {isOpen &&
                      infoWindowData?.id === locationDetails.place_id && (
                        <InfoWindowF
                          onCloseClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          <div>
                            <p className="infoWindowTitle">
                              {infoWindowData.name}
                            </p>
                            <p className="infoWindowData">
                              {infoWindowData.name} {infoWindowData.address}
                            </p>
                          </div>
                        </InfoWindowF>
                      )}
                  </MarkerF>
                ))}
              </GoogleMap>
            )}
          </div>
        </div>
      </Box>
    </Container>
  );
}
