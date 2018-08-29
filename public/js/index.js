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
      var messageInput = $("#message");
      socket.emit("createMessage",{
         from : "User",
         text : messageInput.val()
      },function(){
         messageInput.val('');
      });
    });

    var sendLocationBtn = $("#send-location");
     sendLocationBtn.on("click",function(){
       if(!navigator.geolocation){
          alert("Geolocation feature not supported on your browser");
          return false;
       }

       sendLocationBtn.attr("disabled","disabled").text("Sending location...");

       navigator.geolocation.getCurrentPosition(function(position){
         sendLocationBtn.removeAttr("disabled").text("Send location");
         socket.emit("sendLocationMessage",{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
         });
       },function(error){
        sendLocationBtn.removeAttr("disabled").text("Send location");
           alert("Permission not granted...");
       });
    });
});
