var socket = io();
socket.on("connect",() => {
    console.log("Connected to server");
});

socket.on("newMessage",(data) => {
   console.log("New Message",data);
});

socket.on("disconnect",()=>{
    console.log("Server disconnected...");
});