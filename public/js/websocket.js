//
// this script must be through login authentication server and sessionStorage
//
// this script uesd the jQuery technology
$(document).ready(function(){
    function debug(str){ $("#debug").append("<p>"+str+"</p>"); };
    ws = new WebSocket("ws://fancy.cs.nccu.edu.tw:8080");
    ws.onmessage = function(evt) {
         var tmp = evt.data.split(",")
         //
         // need to design a friends list here!
         //
         if (tmp[0] == u_name && tmp[1] == f_name)
            $("#msg").append("<div align='right' style='color: #1abc9c'>"+ tmp[0] + ": "+ tmp[2] + "</div>");
         else if (tmp[0] == f_name && tmp[1] == u_name)
            $("#msg").append("<div align='left' style='color: #3498db'>"+ tmp[0] + ": "+ tmp[2] + "</div>");
         
    };
    ws.onclose = function() { debug("socket closed"); };
    ws.onopen = function() {
      debug("connected...");
      //ws.send("hello server,I am client!");
    };
});
