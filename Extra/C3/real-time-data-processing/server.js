const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log("Message received: " + message);
    socket.send("Server received just now: " + message);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("Server started on ws://localhost:8080/");
