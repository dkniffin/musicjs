var walk = require('fs-walk')
	, path = require('path')



$(document).ready(function() {
	var folders = global.Settings.get('music_folders')
	folders.forEach(function(folder){
		walk.walkSync(folder,function(basedir, filename, stat, next){
			var file = path.join(basedir, filename)
			console.log(file)
			if (file.match(/.mp3$/)) {
				$('#songlist > tbody:last').append('<tr><td>'+file+'</td></tr>');
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