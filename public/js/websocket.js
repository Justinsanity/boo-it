//
// this script must be through login authentication server and sessionStorage
//
// this script uesd the jQuery technology
$(document).ready(function(){
    function debug(str){ $("#debug").append("<p>"+str+"</p>"); };
    ws = new WebSocket("wss://boo-it.herokuapp.com");
    ws.onmessage = function(evt) {console.log(evt)
         var tmp = evt.data.split(",")
         u_name = document.getElementById("usr_name").innerHTML;
         f_name = $("#fri_name").html();
         if (tmp[0] == u_name && tmp[1] == f_name)
            $("#msg").append("<div align='right' style='color: #1abc9c'>"+ tmp[0] + ": "+ tmp[2] + "</div>");
         else if (tmp[0] == f_name && tmp[1] == u_name)
            $("#msg").append("<div align='left' style='color: #3498db'>"+ tmp[0] + ": "+ tmp[2] + "</div>");
         
    };
    ws.onclose = function() { debug("socket closed"); };
    ws.onopen = function() {
      debug("connected...");
      ws.send("hello server,I am client!");
    };
});

function booFunction() {
    u_name = document.getElementById("usr_name").innerHTML;
    f_name = $("#fri_name").html();
    dialog = $("#boo").val();
    ws.send(u_name + "," + f_name + "," + dialog);
}

