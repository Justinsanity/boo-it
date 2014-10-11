$(document).ready(function(){
    $(".friends").dblclick(function(){
        $("#chat_f").val($(this).text());
        $("#form").submit();
    });
});
