const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["get", "post"],
  },
});
const PORT = 3000;
const CONN_PORT = "new-connection";

app.get("/", (req, res) => {
  res.send("Hey, Hi TODOers");
});

io.on("connection", (socket) => {
  socket.on(CONN_PORT, (msg) => {
    io.emit(CONN_PORT, { key: "good" });
    console.log("hi", msg);
  });
});

server.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});
