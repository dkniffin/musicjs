/*
This file will load the configured skin
*/

var fs = require('fs')
var skin = global.Settings.get('skin') || 'default'

// First, look in lib/css/skins/, then in ~/.musicjs/skins/
var included_skins_path = './lib/css/skins/';
var homedir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var home_skins_path = homedir + '/.musicjs/skins/'
var skin_file = skin + '.css'

fs.exists(included_skins_path + skin_file, function (exists) {
	if (exists) {
		global.Loader.loadCSS(included_skins_path + skin_file)
		
	} else {
		fs.exists(home_skins_path + skin_file, function (exists) {
			if (exists) {
				global.Loader.loadCSS(home_skins_path + skin_file)
			} else {
				console.log("Couldn't find skin: " + skin)
			}
		})
			
	}
})



