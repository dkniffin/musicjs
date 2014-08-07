/*

This file sets up an object for interfacing with settings

*/

global.Settings = function () {}


global.Settings.get = function (key) { 
	return this.getAll()[key]
}

global.Settings.set = function (key, value) {
	var settings = this.getAll()
	settings[key] = value
	localStorage.setItem('settings', JSON.stringify(settings))
}
	
global.Settings.getAll = function () {
	return JSON.parse(localStorage.getItem('settings')) || {}
}