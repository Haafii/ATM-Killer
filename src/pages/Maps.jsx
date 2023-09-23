import React, { useState,useEffect,useRef } from 'react';
import { GoogleMap, OverlayView ,LoadScript ,useJsApiLoader, Marker} from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurLoc from "../../public/Images/loc_icon.png";

function Maps() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  

  useEffect(() => {
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
  
    <div className="p-4 flex flex-col items-center justify-center bg-primary h-screen"> {/* Add padding to the container */}
      {loading ? (
        <div className="text-center">
          <p className="text-lg font-bold mb-2 text-gray-400">Finding nearest persons...</p>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
        </div>
      ) : (
        <div>
         <App location={location} />
        </div>
      )}
    </div>)
  ;
}

function MyMapComponent({long=150.644,lat=-34.397}) {

  const mapRef = useRef(null);

  const [locations, setLocations] = useState([

    {
      lat:10.054,
      lng :76.619,
    },
    {
      lat:10.0545,
      lng :76.619,
    },
    {
      lat:10.0545,
      lng :76.6194,
    },
    {
      lat:10.05457,
      lng :76.61949,
    },
    {
      lat:10.0544,
      lng :76.6194,
    },
    {
      lat:10.0544,
      lng :76.6194,
    }
    
  ]);


  function drawPath(from_loc,to_loc){

    if (!mapRef.current) return;
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(mapRef.current);



    directionsService.route(
      {
        origin: from_loc,
        destination: to_loc,
        travelMode: window.google.maps.TravelMode.DRIVING,
        // waypoints: pathCoordinates.slice(1, -1).map((location) => ({
        //   location,
        //   stopover: false,
        // })),
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );


  }






  // Function to add a new location to the array
  const addLocation = () => {
    // Here, we create a new location object and push it to the existing array
    const newLocation = { lat: 0, lng: 0 }; // You can provide initial values
    setLocations([...locations, newLocation]);
  };
  console.log(lat,long)


  return (
    <GoogleMap
      id="my-map"
      mapContainerStyle={{ height: "100vh", width: "100vw" }}
      zoom={19}
      center={{ lat , lng: long }}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
     <OverlayView
      position={{ lat , lng: long }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      //getPixelPositionOffset={getPixelPositionOffset}
    >
    <div id="mygooglemap" className=''>
      <img src={CurLoc} alt="Current Location" />
    </div>
    </OverlayView>

    {/* Nearest Location Markers */}
    {locations.map((location, index) =>
    {
      console.log("Running .....")
      return (
        <OverlayView
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          //getPixelPositionOffset={getPixelPositionOffset}
        >
          <div id="mygooglemap" style={{width:'100px',height:'100px'}}>
            {/* <img src={LocationOnIcon} alt="Location"  color='red'/>
             */}
              <Marker key={index} position={location} onClick={()=>{
                  drawPath({ lat , lng: long },location)
              }} />
          </div>
        </OverlayView>
      )
    })}
    </GoogleMap>
  );
}


function App({location}) {
  return (
    <LoadScript googleMapsApiKey={ import.meta.env.VITE_GMAP_KEY}>
      <MyMapComponent lat={location.latitude} long={location.longitude} />
    </LoadScript>
  );
}

export default Maps


// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
// import CurLoc from '../../public/Images/loc_icon.png';

// // Define the URL for LocationOnIcon image
// const LocationOnIconUrl = '@mui/icons-material/LocationOn'; // Replace with the actual URL

// function Maps() {
//   const [loading, setLoading] = useState(true);
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     // Function to fetch the user's location
//     const fetchLocation = () => {
//       if (navigator.geolocation) {
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
//           ,{enableHighAccuracy: true}
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
//     <div className="p-4 flex flex-col items-center justify-center bg-primary h-screen">
//       {loading ? (
//         <div className="text-center">
//           <p className="text-lg font-bold mb-2 text-gray-400">Finding nearest persons...</p>
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
//         </div>
//       ) : (
//         <div>
//           <App userLocation={location} />
//         </div>
//       )}
//     </div>
//   );
// }

// function MyMapComponent({ userLocation, locations }) {
//   return (
//     <GoogleMap
//       id="my-map"
//       mapContainerStyle={{ height: '100vh', width: '100vw' }}
//       zoom={14}
//       center={{ lat: userLocation.latitude, lng: userLocation.longitude }}
//     >
//       {/* User's Location Marker */}
//       <Marker
//         position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
//         icon={{
//           url: CurLoc, // Use the URL for CurLoc
//           scaledSize: new window.google.maps.Size(40, 40),
//         }}
//       />

//       {/* Nearest Location Markers */}
//       {locations.map((location, index) => (
//         <Marker
//           key={index}
//           position={{ lat: location.lat, lng: location.lng }}
//           icon={{
//             url: LocationOnIconUrl, // Use the URL for LocationOnIcon
//             scaledSize: new window.google.maps.Size(40, 40),
//           }}
//         />
//       ))}
//     </GoogleMap>
//   );
// }

// function App({ userLocation }) {
//   // Define your nearest locations here (replace with your own data)
//   const nearestLocations = [
//     { lat: 10.829366, lng: 77.619242}, // Example nearest location 1
//     { lat: 9.053556, lng: 77.683242}, // Example nearest location 2
   
//   ];

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyCd6CytIb5ffa3_9tjZvFsTc0fZCXOvZfk">
//       <MyMapComponent userLocation={userLocation} locations={nearestLocations} />
//     </LoadScript>
//   );
// }

// export default Maps;
