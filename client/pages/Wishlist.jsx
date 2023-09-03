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
      console.log(data);
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

  // const loadWishlist = async () => {
  //   try {
  //     const response = await fetch("/api/wishlist");
  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message);
  //     setWishlist(data);
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const deleteItemFromWishlist = async (id) => {
  //   try {
  //     const response = await fetch(`/api/wishlist/${id}`, {
  //       method: "DELETE",
  //     });
  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message);
  //     loadWishlist();
  //     console.log(data.message);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    <div className="container">
      <h3 className="text-center">Wishlist</h3>
      <div className="list-group mt-4">
        {wishlist.map((locationDetails) => (
          <div
            key={locationDetails.id}
            className="list-group-item d-flex align-items-center justify-content-between"
            onClick={() => changeHighlightedPark(locationDetails)}
          >
            {locationDetails.name}

            <div className=" align-items-start justify-content-between">
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => changeHighlightedPark(locationDetails)}
              >
                <i className="fa-solid fa-location-dot"></i>
              </button>

              <button
                onClick={() => deleteItemFromWishlist(locationDetails.id)}
                className="btn btn-outline-danger btn-sm"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}

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
                        infoWindowData?.id === locationDetails.google_id && (
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
                                {infoWindowData.name} {infoWindowData.address}
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
      </div>
    </div>
  );
}
