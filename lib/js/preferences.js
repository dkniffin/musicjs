var gui = require('nw.gui')



$(document).ready(function(){
	var contentChanged = false

	function saveSettings() {
		$('#prefsMainPane :input').each(function(){
			var key = this.id.replace('setting_','')
			var value = this.value
			global.Settings.set(key,value)
			contentChanged = false
			
			
		})
	}


	// Make the section links work
	$('.sectionLink').click(function(e){

		if (contentChanged) {
			var save = confirm("You've made changes to your preferences. \n\nWould you like to save them?")
			if (save) { saveSettings() }
		}
		

		// Parse out the section
		var pref_section = e.target.id.replace('_link','')
		// Load the html for the section
		$('#prefsMainPane').load('lib/html/preferences/'+pref_section+'.html', function(){
			// Watch for changes to inputs
			$('#prefsMainPane :input').each(function(){
				$(this).on('change',function() { 
					contentChanged = true ; 
				})
			})

			// Every time we load a section, reset contentChanged value
			contentChanged = false

			// Remove the active class from all sectionLinks
			$('.sectionLink').removeClass('active')
			// Add it to the one just clicked
			$(e.target).addClass('active')


			// Fill in the input fields with existing values
			$('#prefsMainPane :input').each(function(){
				this.value = global.Settings.get(this.id.replace('setting_',''))
			})
		})
	})

	// Make the cancel and save buttons work
	$('#cancelBtn').click(function(){
		gui.Window.get().close()
	})

	$('#saveBtn').click(function(){
		saveSettings()
		gui.Window.get().close()
	})

	// Open the general section
	$('#general_link').click();
})