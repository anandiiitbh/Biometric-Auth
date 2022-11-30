const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;
const CONN_PORT = "chat message";
const CONN_PORT_INIT = "user joined";

app.get("/", (req, res) => {
  res.send("Hey, Hi TODOers");
});

io.on("connection", (socket) => {
  socket.on(CONN_PORT, (msg) => {
    io.emit(CONN_PORT, msg);
  });

  socket.on(CONN_PORT_INIT, (msg) => {
    console.log("New User: " + msg.name + " Joined");
  });
});

server.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});
