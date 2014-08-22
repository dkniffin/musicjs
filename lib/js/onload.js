var async = require('async')
	, rec = require('recursive-readdir')
	, id3 = require('id3js')
	, atry = require('atry')


/*
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err);
});*/
	

$(document).ready(function() {
	// SlickGrid column definitions
	var columns = [
		{id: "title", name: "Title", field: "title", editor: Slick.Editors.Text},
		{id: "artist", name: "Artist", field: "artist", editor: Slick.Editors.Text},
		{id: "album", name: "Album", field: "album", editor: Slick.Editors.Text},
		{id: "file", name: "File", field: "file"}
	]
	
	var dataView = new Slick.Data.DataView({inlineFilters: true});
	var options = {
		asyncEditorLoading: true,
		enableCellNavigation: true
	}

	var grid = new Slick.Grid("#songlist", dataView, columns, options);

	grid.setSelectionModel(new Slick.RowSelectionModel());

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

	var folders = global.Settings.get('music_folders') || []
	var id = 0;
	// First, recursively get all files in the music folders
	async.concat(folders, function(folder, callback) {
		rec(folder, function(err,files){callback(null,files)})
	}, function(err,files){
		// Next, filter out any non-mp3s
		async.filter(files, function(file, callback){
			// TODO: Support more file formats
			callback(file.match(/.mp3$/))
		}, function(mp3s) {
			// Next, get the id3 tagset object for the file and append it to the grid

			// TODO: need an async.each here 
			async.eachLimit(mp3s, 10, function(file, callback) {

				atry(function(){
					id3({file: file, type: id3.OPEN_LOCAL }, function(err, tags) {
						if (err) {console.error(err)}
						var tagsetObj = {
							id: id,
							title: tags.title, 
							artist: tags.artist, 
							album: tags.album, 
							file: file
						}
						id++
						dataView.addItem(tagsetObj)
						callback(null, null)
					})
				}).catch(function(err){
					console.log(file)
					console.error(err.stack)
				})
			})
		})
	})

	$(window).resize(function() {
		grid.resizeCanvas()
		grid.autosizeColumns()
	});
	

	// =========== Control panel ===========
	// Volume Slider
	$('#controls #volumeSlider').slider({
		orientation: "horizontal",
		range: "min",
		min: 0, 
		max: 100,
		change: function(event, ui) {
			// TODO: Change the volume
			// NOTE: ui.value has the current value
		}
	});
	// Play Progress
	var playPosition = $('#controls #playPosition').slider({
		orientation: "horizontal",
		range: "min",
		min: 0, 
		max: 100,
		slide: function(event, ui) {
			var player = $('#audioPlayer');
			var src = player.prop('src')
			if (src != undefined && src != '') {
				var newPosition = (ui.value / 100) * player.prop('duration');
				player.prop('currentTime', newPosition)
			} else {
				return false;
			}
		}
	});
	
	// Play button
	$('#playBtn').on('click', function(){
		var currentlySelectedSong = dataView.getItem(grid.getSelectedRows()[0]);
		var player = $('#audioPlayer')
		player.prop('src', currentlySelectedSong.file);
		player.trigger('load');
		player.trigger('play');

		player.on('timeupdate', function(){
			var percentage = player.prop('currentTime')/player.prop('duration')*100;
			console.log(percentage);
			playPosition.slider( "value", percentage);
		})
	});

	// Rating Control
	// TODO: We'll probably need to have some logic adding one of these for each song
	$('#ratingControl :radio.ratingStar').rating({
		cancelValue: '0.0', // doesn't work
		callback: function(value, link) {
			if (value == undefined) { // Rating of 0

			} else { // Rating of value

			}
		}
	});
	
});