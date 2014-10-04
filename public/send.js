function booFunction() {
    u_name = document.getElementById("usr_name").innerHTML;
    f_name = $("#fri_name").html();
    dialog = $("#boo").val();
    //f_name = document.getElementById("fri_name").innerHTML;
    //alert(document.getElementById("boo").value);
    //ws.send(u_name + "," + f_name + "," + $("boo").val());
    //ws.send(u_name + "," + f_name + "," + document.getElementById("boo").value);
    ws.send(u_name + "," + f_name + "," + dialog);
}

