
// Replace 'localhost:8000' with the actual WebSocket server URL.
const serverUrl = 'ws://35.203.92.18:8000';

// Create a WebSocket connection
const socket = new WebSocket(serverUrl);

// Event handler for when the connection is established
socket.addEventListener('open', (event) => {
  console.log('WebSocket connection is open.');
  socket.send('hello');
});

// Event handler for receiving messages from the server
socket.addEventListener('message', (event) => {
  console.log('Received message from server:', event.data);

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



export default socket;



