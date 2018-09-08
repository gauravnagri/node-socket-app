const express = require("express");
const Path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const {generateMessage,generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var users = new Users();

const io = socketIO(server);

app.use(express.static(Path.join(__dirname,"../public")));

io.on("connection",(socket) => {
   console.log("User connected...");     

   socket.on("join",(params,callback) => {
     if(!isRealString(params.name) || !isRealString(params.room)){
        return callback("Name and room details are required...");
     }
     socket.join(params.room);
     users.addUser(socket.id,params.name,params.room);
     socket.emit("newMessage",generateMessage("Admin","Welcome to the chat app"));
     io.to(params.room).emit("updateUserList",users.getUsersList(params.room));
     socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} joined...`));
     callback();
   });

   socket.on("createMessage",(data,callback) => {
    if(isRealString(data.text)){
      var user = users.getUser(socket.id);
      if(user){
        io.to(user.room).emit("newMessage",generateMessage(user.name,data.text));        
      } 
    } 
    callback();  
   });

   socket.on("sendLocationMessage",(position)=>{
    var user = users.getUser(socket.id);
    if(user){
       io.to(user.room).emit("newLocationMessage",
               generateLocationMessage(user.name,position.latitude,position.longitude));
     }
   })

   socket.on("disconnect",()=>{
       console.log("User disconnected");
       var user = users.removeUser(socket.id);
       if(user){
           io.to(user.room).emit("newMessage",generateMessage("Admin",`${user.name} has left the group`));
           io.to(user.room).emit("updateUserList",users.getUsersList(user.room));
        }
   });
});

server.listen(port,()=>{
    console.log(`The app is running on port ${port}`);
});