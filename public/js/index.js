$(document).ready(function(){
    var socket = io();
    socket.on("connect",() => {
        console.log("Connected to server");
    });
    
    socket.on("newMessage",(data) => {
       var li = `<li>${data.from}:${data.text}</li>`;
       $("#messages").append(li);
    });

    socket.on("newLocationMessage",function(data){
       var li = $("<li></li>");
       var anchor = $("<a>My Location</a>");
       anchor.attr("target","_blank");
       anchor.attr("href",data.url);       
       li.text(`${data.from}:`);
       li.append(anchor)
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

    $("#send-location").on("click",function(){
       if(!navigator.geolocation){
          alert("Geolocation feature not supported on your browser");
          return false;
       }

       navigator.geolocation.getCurrentPosition(function(position){
         socket.emit("sendLocationMessage",{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
         });
       },function(error){
           alert("Permission not granted...");
       });
    });
});
