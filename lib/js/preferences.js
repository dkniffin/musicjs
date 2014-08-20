var gui = require('nw.gui')

$(document).ready(function(){
	// Add jQuery UI tabs
	$('#prefsTopPane').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
	$('#prefsTopPane li').removeClass('ui-corner-top').addClass('ui-corner-left');

	function saveSettings() {
		$('#prefsTopPane :input').each(function(){
			var key = this.id.replace('setting_','')
			var value = ''
			if ($(this).hasClass('allValues')) {
				value = $(this).children().map(function() {return $(this).val();}).get();
			} else {
				value = this.value
			}
			global.Settings.set(key,value)
		})
	}

	// Fill in the input fields with existing values
	$("#prefsTopPane :input[type!='file']").each(function(){
		if ($(this).hasClass('allValues')) {
			var values = global.Settings.get(this.id.replace('setting_','')) || []
			var element = this
			values.forEach(function(val){
				$(element).append('<option value='+val+'>'+val+'</option')
			})
		} else {
			this.value = global.Settings.get(this.id.replace('setting_',''))
		}
	})
	// Make the cancel and save buttons work
	$('#cancelBtn').click(function(){ gui.Window.get().close() })
	$('#saveBtn').click(function(){saveSettings(); gui.Window.get().close() })

	// == Library ==
	// Make the Add/Remove Library folders work
	$('#add_music_folder').click(function(){
	    var chooser = $('#fileDialog');
	    chooser.change(function(evt) {
	      $('#setting_music_folders').append('<option value='+$(this).val()+'>'+$(this).val()+'</option>')
	    });

	    chooser.trigger('click');
	})
	$('#remove_music_folder').click(function(){
		$('#setting_music_folders option:selected').remove()
	})
	
})