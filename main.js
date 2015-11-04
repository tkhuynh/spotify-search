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
  		var song = $('#song').val();
  		$('#song').val('');
  		$.get('https://api.spotify.com/v1/search?q=' + song + '&type=track' ,function (data) {
			var songNames = data.tracks.items;
			songNames.forEach(function(song){
				console.log(song);
				//will append img to left column, text to right, right and left to row, row to results 
				var row = $("<div class='row'></div>");
  				var leftCol = $("<div class='col-md-5' id='left'></div>");
  				var rightCol = $("<div class='col-md-7' id='right'></div>");	
				$(leftCol).append("<img src='" + song.album.images[1].url + "'>");
				$(rightCol).append("<p>Song Name: " + song.name + "</p>");
				$(rightCol).append("<p>Duration: " + convertDuration(song.duration_ms) + "</p>");
				song.artists.forEach(function(artist){
					$(rightCol).append("<p>Artist: " + artist.name + "</p>");
				});
				$(rightCol).append("<p>Album: " + song.album.name + "</p>");
				$(row).append(leftCol);
				$(row).append(rightCol);
				$('#results').append(row);
			});
		});
	});

});