function booFunction() {
    u_name = document.getElementById("usr_name").innerHTML;
    f_name = $("#fri_name").html();
    dialog = $("#boo").val();
    ws.send(u_name + "," + f_name + "," + dialog);
}

