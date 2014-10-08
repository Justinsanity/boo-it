//
// this script must be through login authentication server and sessionStorage
//
// this script uesd the jQuery technology
$(document).ready(function(){
    function debug(str){ $("#debug").append("<p>"+str+"</p>"); };
    ws = new WebSocket("ws://127.0.0.1:8080");
    ws.onmessage = function(evt) {
         var tmp = evt.data.split(",")
         //
         // need to design a friends list here!
         //
         // ***friendship list***
         if ((tmp[0] == u_name && tmp[1] == f_name) || (tmp[0] == f_name && tmp[1] == u_name)){
             // identify whose message . default: document.getElementById 
             //if(u_name == "test2" || u_name == "test"){
             //    $("#msg").append("<p>"+evt.data+"</p>");
             //}
             $("#msg").append("<p>"+evt.data+"</p>");
         }
         //$("#msg").append("<p>"+evt.data+"</p>");
    };
    ws.onclose = function() { debug("socket closed"); };
    ws.onopen = function() {
      debug("connected...");
      //ws.send("hi");
      //ws.send("hello server,I am client!");
      //ws.send("sshello server,I am client!");
      //ws.send(testNum);
    };
});

