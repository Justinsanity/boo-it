
$(document).ready(function(){
	$left = $('.left');
	$left.mouseenter(function(){
		$(this).animate({ width: '41%' });
	});

	$left.mouseleave(function(){
		$(this).animate({ width: '40%' });
	});
});