import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapRef = useRef(null);
  const pathCoordinates = [
    {
        lat:10.054,
        lng :76.619,
      },
    //   {
    //     lat:10.0545,
    //     lng :76.619,
    //   },
    //   {
    //     lat:10.0545,
    //     lng :76.6194,
    //   },
    //   {
    //     lat:10.05457,
    //     lng :76.61949,
    //   },
    //   {
    //     lat:10.0544,
    //     lng :76.6194,
    //   },
      {
        lat:10.0544,
        lng :76.61,
      }
  ];

  useEffect(() => {
    if (!mapRef.current) return;
    console.log("___________")
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(mapRef.current);

    directionsService.route(
      {
        origin: pathCoordinates[0],
        destination: pathCoordinates[pathCoordinates.length - 1],
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: pathCoordinates.slice(1, -1).map((location) => ({
          location,
          stopover: false,
        })),
      },
      (result, status) => {
        console.log("_________result__")
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          console.log("__________direction set__")
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCd6CytIb5ffa3_9tjZvFsTc0fZCXOvZfk">
      <GoogleMap
        id='direction-example'
        mapContainerStyle={{
          height: "400px",
          width: "800px"
        }}
        zoom={17}
        center={pathCoordinates[0]}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {pathCoordinates.map((location, i) => (
          <Marker key={i} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
