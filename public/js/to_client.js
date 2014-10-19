$(document).ready(function(){
    $(".table tr td").click(function(){
        $("#chat_f").val($(this).text());
        $("#form").submit();
    });
});
