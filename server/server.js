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
      from : "admin",
      text : "Welcome user",
      createdAt : new Date().getTime()
   });

   socket.broadcast.emit("newMessage",{
    from : "admin",
    text : "New user joined",
    createdAt : new Date().getTime()
   });

   socket.on("createMessage",(data) => {
      io.emit("newMessage",{
         from : data.from,
         text : data.text,
         createdAt : new Date().getTime()
      });
   });

   socket.on("disconnect",()=>{
       console.log("User disconnected");
   });
});

server.listen(port,()=>{
    console.log(`The app is running on port ${port}`);
});