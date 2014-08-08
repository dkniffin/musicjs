$(document).ready(function(){
	$('.sectionLink').click(function(e){
		// Parse out the section
		var pref_section = e.target.id.replace('_link','')
		// Load the html for the section
		$('#prefsMainPane').load('lib/html/preferences/'+pref_section+'.html')
		// Remove the active class from all sectionLinks
		$('.sectionLink').removeClass('active')
		
		console.log(e.target)
		$(e.target).addClass('active')
	});
	$('#general_link').click();
})