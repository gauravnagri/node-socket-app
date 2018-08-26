const express = require("express");
const Path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(Path.join(__dirname,"../public")));

io.on("connection",(socket) => {
   console.log("User connected...");

   socket.emit("newMessage",{
      from : "nagri.gaurav@gmail.com",
      text : "Hello user!",
      createdAt : 123
   });

   socket.on("createMessage",(data) => {
      console.log("Create Message",data);
   });

   socket.on("disconnect",()=>{
       console.log("User disconnected");
   });
});

server.listen(port,()=>{
    console.log(`The app is running on port ${port}`);
});