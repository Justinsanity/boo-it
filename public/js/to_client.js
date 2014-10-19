$(document).ready(function(){
    $(".table tr td").dblclick(function(){
        $("#chat_f").val($(this).text());
        $("#form").submit();
    });
});
