
// Replace 'localhost:8000' with the actual WebSocket server URL.
const serverUrl = 'ws://35.203.92.18:8000';
const audio = new Audio('https://storage.cloud.google.com/chemb/notification.wav');
// Create a WebSocket connection
const socket = new WebSocket(serverUrl);


class CLocation{
    static listener=null;
    static requestListener=null;
    static requestAcceptListener=null;
}


// Event handler for when the connection is established
socket.addEventListener('open', (event) => {
  console.log('WebSocket connection is open.');
});

// Event handler for receiving messages from the server
socket.addEventListener('message', (event) => {
    console.log('Received message from server:', event.data);
    const data = JSON.parse(event.data);
    if(data.type == 'init'){
        socket.cid = data.cid;
        socket.runOnConnect()
        console.log(socket.cid," Conneted");
        return
    }
    if(data.type == 'newlocation'){
        if(CLocation.listener) CLocation.listener(data.cid);
        return
    }
    if(data.type == 'request'){
        if(CLocation.requestListener) CLocation.requestListener(data);
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const notification = new Notification("P2P-ATM", {
              body: "New monet transfer request",
             // icon: "path/to/icon.png", // Optional
            });
          
            setTimeout(() => {
              notification.close();
            }, 5000);
            audio.play();
          }
        });
        
        
        console.log("playing sound");
        return
    }
    if(data.type == 'accept'){
        if(CLocation.requestAcceptListener) CLocation.requestAcceptListener(data);
        return
    }
});

// Event handler for handling errors
socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

// Event handler for when the connection is closed
socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
  } else {
    console.error('WebSocket connection abruptly closed.');
  }
});



export {socket,CLocation};



