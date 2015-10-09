 function lights( ) {
	$( '#right_light' ).addClass( "rightboom" ); //adds lightning bolt flash when searching
	console.log( 'adding picture' )
	setTimeout( function ( ) {
		console.log( 'remove picture' )
		$( '#right_light' ).removeClass( 'rightboom' ) //removes lightning flash
		}, 3000 ); //time before bolt image fades out
}