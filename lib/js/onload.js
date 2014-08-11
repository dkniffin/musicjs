var walk = require('fs-walk')
	, path = require('path')
	, id3 = require('id3js')



$(document).ready(function() {
	var folders = global.Settings.get('music_folders')
	folders.forEach(function(folder){
		walk.walkSync(folder,function(basedir, filename, stat, next){
			var file = path.join(basedir, filename)
			console.log(file)
			if (file.match(/.mp3$/)) {
				id3({ file: file, type: id3.OPEN_LOCAL }, function(err,tags){

					$('#songlist > tbody:last').append('<tr><td>'+tags.title+'</td><td>'+tags.artist+'</td><td>'+tags.album+'</td><td>'+file+'</td></tr>');	
				})				
			}
		}, function(err) {
		    if (err) console.log(err);
		})
	})

	$('#songlist').tablesorter()
	/*
	$("#songlist").DataTable({
		paging: false
	});*/


	

});