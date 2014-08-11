/*
This file sets up global helper functions
*/

// Settings
global.Settings = function () {}
global.Settings.get = function (key) { 
	return this.getAll()[key] || ''
}
global.Settings.set = function (key, value) {
	var settings = this.getAll()
	settings[key] = value
	localStorage.setItem('settings', JSON.stringify(settings))
}
global.Settings.getAll = function () {
	return JSON.parse(localStorage.getItem('settings')) || {}
}


// Loader
global.Loader = function() {}
global.Loader.loadCSS = function(cssfile) {
	fs.exists(cssfile, function (exists) {
		if (exists) {
			$('head').append('<link rel="stylesheet" type="text/css" href="'+cssfile+'">')
		}
	});
}
global.Loader.loadJS = function(jsfile) {
	fs.exists(jsfile, function (exists) {
		if (exists) {
			$('head').append('<script src="'+jsfile+'"></script>')
		}
	});
}