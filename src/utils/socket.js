const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); //import socket.io

const app = express();
const server = http.createServer(app); //create server
const io = new Server(server); //create socket.io server

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


module.exports = { io, server };
