$(document).ready(function(){
    $(".table").dblclick(function(){
        $("#chat_f").val($(this).text());
        $("#form").submit();
    });
});
