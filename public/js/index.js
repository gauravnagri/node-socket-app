$(document).ready(function(){
    var socket = io();
    socket.on("connect",() => {
        console.log("Connected to server");
    });
    
    socket.on("newMessage",(data) => {
       var li = `<li>${data.from}:${data.text}</li>`;
       $("#messages").append(li);
    });
    
    socket.on("disconnect",()=>{
        console.log("Server disconnected...");
    });

    $("#messageForm").on("submit",function(event){
      event.preventDefault();

      socket.emit("createMessage",{
         from : "User",
         text : $("#message").val()
      });
    });
});
