var async = require('async')
	, rec = require('recursive-readdir')
	, id3 = require('id3js')


	
	

$(document).ready(function() {
	// SlickGrid column definitions
	var columns = [
		{id: "title", name: "Title", field: "title"},
		{id: "artist", name: "Artist", field: "artist"},
		{id: "album", name: "Album", field: "album"},
		{id: "file", name: "File", field: "file"}
	]
	
	var dataView = new Slick.Data.DataView();

	var grid = new Slick.Grid("#songlist", dataView, columns, {});

	// Make the grid respond to DataView change events.
	dataView.onRowCountChanged.subscribe(function (e, args) {
		grid.updateRowCount();
		grid.resizeCanvas();
		grid.render();
	});

	dataView.onRowsChanged.subscribe(function (e, args) {
		grid.invalidateRows(args.rows);
		grid.resizeCanvas();
		grid.render();
	});

	var folders = global.Settings.get('music_folders')
	var id = 0;
	// First, recursively get all files in the music folders
	async.concat(folders, function(folder, callback) {
		rec(folder, function(err,files){callback(null,files)})
	}, function(err,files){
		// Next, filter out any non-mp3s
		// TODO: Support more file formats
		async.filter(files, function(file, callback){
			callback(file.match(/.mp3$/))
		}, function(mp3s) {
			// Next, get the id3 tagset object for the file and append it to the grid

			// TODO: need an async.each here 
			async.concat(mp3s, function(file, callback) {
				id3({file: file, type: id3.OPEN_LOCAL }, function(err, tags) {
					var tagsetObj = {
						id: id,
						title: tags.title, 
						artist: tags.artist, 
						album: tags.album, 
						file: file
					}
					id++
					dataView.addItem(tagsetObj)
					callback(null, tagsetObj)
				})
			}, function(err, tagsetObjs){
				//console.log(tagsetObjs)
			})
		})
	})

	$(window).resize(grid.resizeCanvas);
	
	
});