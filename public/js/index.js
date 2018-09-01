$(document).ready(function(){
    var socket = io();
    socket.on("connect",() => {
        console.log("Connected to server");
    });

    function scrollToBottom(){
      var selector = $("#messages");
      var newMessage = selector.children("li:last-child");
      var scrollHeight = selector.prop("scrollHeight");
      var clientHeight = selector.prop("clientHeight");
      var scrollTop = selector.prop("scrollTop");
      var newItemHeight = newMessage.innerHeight();
      var prevItemHeight = newMessage.prev().innerHeight();
      if(clientHeight + scrollTop + newItemHeight + prevItemHeight >= scrollHeight){
          selector.scrollTop(scrollHeight);
      }
    }
    
    socket.on("newMessage",(data) => {
       var formatTime = moment(data.createdAt).format("h:mm A");
       var template = $("#template-script").html();
       var html = Mustache.render(template,{
           from : data.from,
           text : data.text,
           createdAt : formatTime
       });
       $("#messages").append(html);
       scrollToBottom();
    });

    socket.on("newLocationMessage",function(data){
       var formatTime = moment(data.createdAt).format("h:mm A");
       var template = $("#template-script-location").html();
       var html = Mustache.render(template,{
        from : data.from,
        url : data.url,
        createdAt : formatTime
    });
       $("#messages").append(html);
       scrollToBottom();
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
