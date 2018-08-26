var socket = io();
socket.on("connect",() => {
    console.log("Connected to server");
    socket.emit("createMessage",{
       to : "andrew.mead@gmail.com",
       text : "We need to review the code today"
    });
});

socket.on("newMessage",(data) => {
   console.log("New Message",data);
});

socket.on("disconnect",()=>{
    console.log("Server disconnected...");
});