

//YOUTUBE AUTHORIZATION
function init( ) {
	gapi.client.setApiKey( 'AIzaSyBLT46OdmqPHt6lweLKQ4VtddKUsEFjvK4' ); //sets up key for authorization
	gapi.client.load( "youtube", "v3", function( ) { //loads API

	} );
}

//PULLING FROM THE SEARCH FUNCTION
$( function( ) {
	$( "form" ).on( "submit" , function( e ) { //taking submission from search bar
		e.preventDefault( ); //preventing from sending too quickly
		console.log( "got here 1" )		

		//SORTING OUT RESULTS
		var request = gapi.client.youtube.search.list( { //defining parameters
			part: "snippet",
			type: "video",
			q: encodeURIComponent( $( "#response" ).val( ) ).replace( /%20/g, "+" ), //defines search term by response
			maxResults: 1, //number of results 
			orderBy: "relevance", //how video will be organized
			publishedAfter: "2015-01-01T00:00:00Z", //keeping videos current
		} );

		//EXECUTES SEARCH
		request.execute( function( response ) {
			var results = response.result;
			$.each( results[ 'items' ], function( index, item ) { //how jQUERY should sort through said results
				var test = results[ 'items' ][ 0 ].id.videoId //chooses first video based on relevance
				console.log( test )
				$( '#results' ).append( '<iframe class="video w100 animated fadeIn" width=640 height=360 src="https://www.youtube.com/embed/'+test+ '?autoplay=1" frameborder="0" ></iframe>' ) //defines iframe size and source

			} );

		} );
		lights( ) //executes lights function at the end of youtube search results
	} );

} );

//DEFINES SYTLING OF VIDEO
function resetVideoHeight( ) {
    $( ".video" ).css( "height", $( "#results" ).width( ) * 9/16 );
}

