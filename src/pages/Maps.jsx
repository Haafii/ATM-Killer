// import React, { useState,useEffect } from 'react';
// import { GoogleMap, OverlayView ,LoadScript ,useJsApiLoader} from '@react-google-maps/api';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import CurLoc from "../../public/Images/loc_icon.png";

// function Maps() {
//   const [loading, setLoading] = useState(true);
//   const [location, setLocation] = useState(null);

  

//   useEffect(() => {
//     // Function to fetch the user's location
//     const fetchLocation = () => {
//       if (navigator.geolocation) {
//         console.log("----------------------")
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             setLocation({ latitude, longitude });
//             setLoading(false);
//           },
//           (error) => {
//             console.error('Error getting location:', error);
//             setLoading(false);
//           }
//         );
//       } else {
//         console.error('Geolocation is not supported in this browser.');
//         setLoading(false);
//       }
//     };
//     // Call the fetchLocation function to get the user's location
//     fetchLocation();
//   }, []);

//   return (
  
//     <div className="p-4 flex flex-col items-center justify-center bg-primary h-screen"> {/* Add padding to the container */}
//       {loading ? (
//         <div className="text-center">
//           <p className="text-lg font-bold mb-2 text-gray-400">Finding nearest persons...</p>
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
//         </div>
//       ) : (
//         <div>
//          <App location={location} />
//         </div>
//       )}
//     </div>)
//   ;
// }

// function MyMapComponent({long=150.644,lat=-34.397}) {
//   return (
//     <GoogleMap
//       id="my-map"
//       mapContainerStyle={{ height: "100vh", width: "100vw" }}
//       zoom={18}
//       center={{ lat , lng: long }}
//     >
//      <OverlayView
//       position={{ lat , lng: long }}
//       mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//       //getPixelPositionOffset={getPixelPositionOffset}
//     >
//     <div id="mygooglemap" className=''>
//       <img src={CurLoc} alt="Current Location" />
//     </div>
//     </OverlayView>



//     </GoogleMap>
//   );
// }



// function App({location}) {
//   return (
//     <LoadScript googleMapsApiKey="AIzaSyCd6CytIb5ffa3_9tjZvFsTc0fZCXOvZfk">
//       <MyMapComponent lat={location.latitude} long={location.longitude} />
//     </LoadScript>
//   );
// }

// export default Maps


import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import CurLoc from '../../public/Images/loc_icon.png';

// Define the URL for LocationOnIcon image
const LocationOnIconUrl = '@mui/icons-material/LocationOn'; // Replace with the actual URL

function Maps() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Function to fetch the user's location
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            setLoading(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported in this browser.');
        setLoading(false);
      }
    };
    // Call the fetchLocation function to get the user's location
    fetchLocation();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center justify-center bg-primary h-screen">
      {loading ? (
        <div className="text-center">
          <p className="text-lg font-bold mb-2 text-gray-400">Finding nearest persons...</p>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
        </div>
      ) : (
        <div>
          <App userLocation={location} />
        </div>
      )}
    </div>
  );
}

function MyMapComponent({ userLocation, locations }) {
  return (
    <GoogleMap
      id="my-map"
      mapContainerStyle={{ height: '100vh', width: '100vw' }}
      zoom={14}
      center={{ lat: userLocation.latitude, lng: userLocation.longitude }}
    >
      {/* User's Location Marker */}
      <Marker
        position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
        icon={{
          url: CurLoc, // Use the URL for CurLoc
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />

      {/* Nearest Location Markers */}
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          icon={{
            url: LocationOnIconUrl, // Use the URL for LocationOnIcon
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}
    </GoogleMap>
  );
}

function App({ userLocation }) {
  // Define your nearest locations here (replace with your own data)
  const nearestLocations = [
    { lat: 10.829366, lng: 77.619242}, // Example nearest location 1
    { lat: 9.053556, lng: 77.683242}, // Example nearest location 2
    // Add more nearest locations as needed
  ];

  return (
    <LoadScript googleMapsApiKey="AIzaSyCd6CytIb5ffa3_9tjZvFsTc0fZCXOvZfk">
      <MyMapComponent userLocation={userLocation} locations={nearestLocations} />
    </LoadScript>
  );
}

export default Maps;
