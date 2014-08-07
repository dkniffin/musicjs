var gui = require('nw.gui');
var win = gui.Window.get();

// Build main menu
var menu = new gui.Menu({ type: 'menubar'});


// Build file menu
var file = new gui.MenuItem({ label: 'File'});
menu.append(file);

file.submenu = new gui.Menu();
file.submenu.append(new gui.MenuItem({
	label: 'Preferences',
	click: function() {
		gui.Window.open('preferences.html')
	}
}))
file.submenu.append(new gui.MenuItem({
	label: 'Quit',
	click: function() {
		win.close();
	}
}))


// Add main menu to window
gui.Window.get().menu = menu;