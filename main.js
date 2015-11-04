// wait for DOM to load before running JS
$(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  //functions to use
  	function convertDuration(num) {
    	num = (num / 1000).toFixed(0);
    	return Math.floor(num/60) + ":" + num % 60;
	}
  // your code here
  	$('#search').on('submit', function(event){
  		event.preventDefault();
  		$('#results').empty();
  		$('#loadingPic').css("display","block");
  		var song = $('#song').val();
  		$('#song').val('');
  		setTimeout(function (){
  			$('#loadingPic').hide();
  		$.get('https://api.spotify.com/v1/search?q=' + song + '&type=track' ,function (data) {
			var songNames = data.tracks.items;
			songNames.forEach(function(song){
				console.log(song);
				//will append img to left column, text to right, right and left to row, row to results 
				var row = $("<div class='row'></div>");
  				var leftCol = $("<div class='col-md-4' id='left'></div>");
  				var rightCol = $("<div class='col-md-8' id='right'></div>");	
				$(leftCol).append("<img src='" + song.album.images[1].url + "'>");
				$(rightCol).append("<p><b>Song Name:</b> " + song.name + "</p>");
				$(rightCol).append("<p><b>Duration:</b> " + convertDuration(song.duration_ms) + "</p>");
				song.artists.forEach(function(artist){
					$(rightCol).append("<p><b>Artist:</b> " + artist.name + "</p>");
				});
				$(rightCol).append("<p><b>Album:</b> " + song.album.name + "</p>");
				if (song.preview_url === null) {
					$(rightCol).append("<p><i>No Song Preview Available</i><p>");
				} else { 
					$(rightCol).append("<audio controls><source src='" + song.preview_url +"' type='audio/mpeg'></audio><p><i>Click Play to Listen</i></p>");
					console.log(song.preview_url);
				}
				$(row).append(leftCol);
				$(row).append(rightCol);
				$('#results').append(row);
			});
		});
		}, 500);
		
	});

});