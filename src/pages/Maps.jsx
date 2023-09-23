import React, { useState,useEffect,useRef, useCallback } from 'react';
import { GoogleMap, OverlayView ,LoadScript ,useJsApiLoader, Marker} from '@react-google-maps/api';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CurLoc from "../../public/Images/loc_icon.png";
import {socket,CLocation} from '../libs/websocket';

Notification.requestPermission().then(res=>{
  console.log(res)
})

const AllLocations = [{
  id: 0,
  lat:10.054,
  lng :76.619,
},
{
  id:1,
  lat:10.0545,
  lng :76.619,
},
{
  id:2,
  lat:10.0545,
  lng :76.6194,
},
{
  id:3,
  lat:10.05457,
  lng :76.61949,
},
{
  id:4,
  lat:10.0544,
  lng :76.6194,
},
{
  id:5,
  lat:10.0544,
  lng :76.6194,
}]






function Maps() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);


  const fetchLocation = () => {
    if (navigator.geolocation) {
      console.log("Fetching Location")
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

  const RunOnScoket=()=>{
    if(socket.cid==0){
      fetchLocation();
    }
    else{
      setLocation({ latitude:AllLocations[socket.cid].lat, longitude:AllLocations[socket.cid].lng });
      setLoading(false);
    }
  }

  useEffect(() => {
    
    if(socket.cid==undefined){
      socket.runOnConnect=RunOnScoket;
      return;
    }
    RunOnScoket()
    
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
  const [open, setOpen] = React.useState(false);
  const [Locations_, setLocations_] = React.useState([]);
  const [selLoc, setSelLoc] = React.useState(null);
  const [requestAccepted, setRequestAccepted] = React.useState(false);
  const [requests, setRequests] = React.useState(null);

  const [heading, setHeading] = React.useState('');
  const [mainText, setMainText] = React.useState('');

  CLocation.listener=useCallback((cid)=>{
    setLocations_([...Locations_,{lat:AllLocations[cid].lat,lng:AllLocations[cid].lng}])
    console.log(Locations_)
  },[Locations_])

  CLocation.requestListener=(data)=>{
        setRequests(data)
  }
  CLocation.requestAcceptListener=(data)=>{
    drawPath()
  }




  function drawPath(){

    if (!mapRef.current) return;
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(mapRef.current);
    directionsService.route(
      {
        origin: { lat , lng: long },
        destination:selLoc,
        travelMode: window.google.maps.TravelMode.DRIVING,
        // waypoints: pathCoordinates.slice(1, -1).map((location) => ({
        //   location,
        //   stopover: false,
        // })),
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        }
        else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );


  }




  // functionality for popup


  const handleClickOpen = (loc) => {
    setHeading("Connect");
    setMainText("Do you want to continue with this user ?")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConnect = () => {
    setOpen(false);
    socket.send(JSON.stringify({type:'request',loc:{lat,lng:long},cid:selLoc.id}));
   
    //drawPath()
  }






  // Function to add a new location to the array

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

<div className="flex items-center justify-center">
        <Dialog onClose={handleClose} open={requests!=null}>
          <DialogTitle>Payment Request</DialogTitle>
          <DialogContent>
           Amount : {500} <br/> 
            Type : {requests?.type==1?"LIQUID":"CASH"} <br/>
            Is requested by a user from you.
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{
              socket.send(JSON.stringify({type:'accept',cid:requests.cid}));
              setRequests(null);
            }} >
              Agree
            </Button>
            <Button onClick={()=>setRequests(null)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
</div>




<div className="flex items-center justify-center">
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>{heading}</DialogTitle>
          <DialogContent>
            {mainText}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConnect} >
              Connect
            </Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
</div>



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
    {Locations_ && Locations_.map((location, index) =>
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
              <Marker key={index} position={location} onClick={()=>{
                setSelLoc(location)
                  handleClickOpen()
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