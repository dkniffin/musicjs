// JavaScript Document
/*************************************************
Star Rating System
First Version: 21 November, 2006
Second Version: 17 May, 2007
Author: Ritesh Agrawal (http://php.scripts.psu.edu/rja171/widgets/rating.php)
        email: ragrawal [at] gmail (dot) com
Inspiration: Will Stuckey's star rating system (http://sandbox.wilstuckey.com/jquery-ratings/)
Half-Star Addition: Karl Swedberg
Demonstration: http://examples.learningjquery.com/rating/
Usage: $('#rating').rating('url-to-post.php', {maxvalue:5, curvalue:0});

arguments
url : required -- post changes to 
options
  increment : 1, // value to increment by
	maxvalue: number of stars
	curvalue: number of selected stars
	

************************************************/

jQuery.fn.rating = function(options) {
	
	var settings = {
    increment : 1, // value to increment by
    maxvalue  : 5,   // max number of stars
    curvalue  : 0,    // number of selected stars
    change    : function(value){},
    cancel    : true
  };
	
  if(options) {
    jQuery.extend(settings, options);
  };
   
   
  var container = jQuery(this);
	
	jQuery.extend(container, {
    averageRating: settings.curvalue
  });
  settings.increment = (settings.increment < .75) ? .5 : 1;
  var i = (settings.cancel) ? 0 : 1;
  var inc = settings.increment;
  var s = 0;
	for(var i= 0; i <= settings.maxvalue ; i += inc){
    if (i == 0) {
      var div = '<div class="cancel ratingBtn"><a href="#0" title="Cancel Rating">Cancel Rating</a></div>';
      container.empty().append(div);
    } else {
      var $div = $('<div class="star ratingBtn"></div>')
        .append('<a href="#'+i+'" title="Give it '+i+'/'+settings.maxvalue+'">'+i+'</a>')
        .appendTo(container);
      if (settings.increment == .5) {
        if (s%2) {
          $div.addClass('star-left');
        } else {
          $div.addClass('star-right');
        }
      }
    }
    s++;
  }
	
	var stars = jQuery(container).children('.star');
  var cancel = jQuery(container).children('.cancel');
	var ratingBtns = jQuery(container).children('.ratingBtn')

  ratingBtns
    .mouseover(function(){
      event.drain();
      event.fill(this);
    })
    .mouseout(function(){
      event.drain();
      event.reset();
    })
    .focus(function(){
      event.drain();
      event.fill(this);
    })
    .blur(function(){
      event.drain();
      event.reset();
    });

  ratingBtns.click(function(){
      settings.curvalue = (ratingBtns.index(this) * settings.increment) + settings.increment;
      settings.change(settings.curvalue);
			return false;
  });
        
	var event = {
		fill: function(el){ // fill to the current mouse position.
			var index = stars.index(el) + 1;
			stars
				.children('a').css('width', '100%').end()
				.slice(0,index).addClass('hover').end();
		},
		drain: function() { // drain all the stars.
			stars
				.filter('.on').removeClass('on').end()
				.filter('.hover').removeClass('hover').end();
		},
		reset: function(){ // Reset the stars to the default index.
			stars.slice(0,settings.curvalue / settings.increment).addClass('on').end();
		}
	};    
	event.reset();
	
	return(this);	

};