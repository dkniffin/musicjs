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