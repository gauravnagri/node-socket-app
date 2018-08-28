const express = require("express");
const Path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const {generateMessage,generateLocationMessage} = require("./utils/message");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(Path.join(__dirname,"../public")));

io.on("connection",(socket) => {
   console.log("User connected...");
   
   socket.emit("newMessage",generateMessage("Admin","Welcome to the chat app"));

   socket.broadcast.emit("newMessage",generateMessage("Admin","New user joined"));

   socket.on("createMessage",(data) => {
      io.emit("newMessage",generateMessage(data.from,data.text));
   });

   socket.on("sendLocationMessage",(position)=>{
       io.emit("newLocationMessage",
               generateLocationMessage("Admin",position.latitude,position.longitude));
   })

   socket.on("disconnect",()=>{
       console.log("User disconnected");
   });
});

server.listen(port,()=>{
    console.log(`The app is running on port ${port}`);
});