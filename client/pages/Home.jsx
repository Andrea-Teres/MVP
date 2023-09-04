import React, { useState, useEffect } from "react";
import "/styles/stylesheet.css";
import Map from "/components/Map";
import GoogleMapComponent from "../components/GoogleMapComponent";
import axios from "axios";
import { Container, Typography } from "@mui/material";

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
      <Container display="flex" maxWidth="md" align="center">
        {/* <Typography variant="h4" gutterBottom>
          Your adventure starts here...
        </Typography> */}
        {error && <div className="error-message">{error}</div>}

        <GoogleMapComponent
          changeSearchResultsList={changeSearchResultsList}
          searchResultsList={searchResultsList}
          highlightedPark={highlightedPark}
          setHighlightedPark={setHighlightedPark}
        />

        <div className="list-group m-5">
          {searchResultsList && (
            <>
              <h4 className="text-center mb-3">
                Check out these parks based on your search:
              </h4>
              {searchResultsList?.map((locationDetails) => (
                <div key={locationDetails.place_id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <p
                      onClick={() => changeHighlightedPark(locationDetails)}
                      className={
                        selectedToShowPhotoAndOpeningHours ? "fw-bold" : ""
                      }
                    >
                      {locationDetails.name}
                    </p>

                    <div>
                      <div className="btn btn-dark btn-sm rating">
                        Rating {locationDetails.rating}
                      </div>

                      <button
                        className=" btn btn-outline-success btn-sm"
                        onClick={() => changeHighlightedPark(locationDetails)}
                      >
                        <i className=" fa-solid fa-location-dot"></i>
                      </button>

                      <button
                        className=" btn btn-outline-warning btn-sm"
                        type="submit"
                        onClick={(e) => {
                          addToWishlist({
                            google_id: locationDetails.place_id,
                            name: locationDetails.name,
                            rating: locationDetails.rating,
                            address: locationDetails.formatted_address,
                            image_url:
                              locationDetails.photos[0]?.getUrl() || "", // Handle case when there are no photos
                            latitude: locationDetails.geometry.location.lat(),
                            longitude: locationDetails.geometry.location.lng(),
                          });
                          // disableButton(e);
                        }}
                      >
                        <i className="fa-solid fa-star"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    {selectedToShowPhotoAndOpeningHours?.[
                      locationDetails.place_id
                    ] &&
                      locationDetails?.photos && (
                        <div className="d-flex justify-content-end mt-2 mb-2">
                          <img
                            src={locationDetails?.photos?.[0]?.getUrl()}
                            alt=""
                            height="250px"
                          />
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
