const express = require("express");
const { createServer } = require("http");
const app = express();
const http = require("http").createServer(app);
const port = process.env.port || 7000;
const path = require("path");

http.listen(port, () => {
  console.log(` sever running on ${port}`);
});
// app.use(express.static(path.join(__dirname + "/public")));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket

const io = require("socket.io")(http);

// anyperson wil be add than this function will be call

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("new user", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
    console.log(name);
  });

  socket.on("send", (message) => {
    console.log(message);
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
});
