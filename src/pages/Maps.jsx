import React, { useState, useEffect } from 'react';

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
    <div className="p-4 flex flex-col items-center justify-center bg-primary h-screen"> {/* Add padding to the container */}
      {loading ? (
        <div className="text-center">
          <p className="text-lg font-bold mb-2 text-gray-400">Finding nearest persons...</p>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
          {/* Use an animated spinner to indicate loading */}
        </div>
      ) : (
        <div>
          {/* Render your map component here using the 'location' state */}
          {location && (
            <div>
              <p className="text-lg font-bold mb-2">Location:</p>
              <p className="text-xl">
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </p>
              {/* Replace this with your map component */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Maps;
