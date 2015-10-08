 function lights (){
	$('#right_light').addClass("rightboom");
	console.log('adding picture')
	setTimeout( function () {
		console.log('remove picture')
		$('#right_light').removeClass('rightboom')
		}, 3000);
}