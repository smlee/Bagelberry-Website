$(function() {
	var sw = document.body.clientWidth, breakpoint = 900, mobile = true;
	var checkMobile = function() {
		mobile = (sw > breakpoint) ? false : true;
		movenavtoside();
	};
	jQuery(window).resize(function(){
		sw = document.body.clientWidth;	
		checkMobile();
	});

	function movenavtoside() {
		if (mobile) {
			jQuery('#placeholdernav').append(jQuery(".navelement"));
		} else {
			jQuery('#mainnav ul').append(jQuery(".navelement"));
		}
	}

	checkMobile();

	jQuery("#nav-open").click(function(){
		if (jQuery("body.opennavpanel").length > 0) {
			jQuery("body").removeClass("opennavpanel");
			jQuery("#maincontent, #footer, #header").animate({ left: -50 }, 500, function(){
				jQuery("#maincontent, #footer, #header").animate({ left: 0 }, 400);
			});
			jQuery("#navpanel").fadeOut();
		} else {
			jQuery("body").addClass("opennavpanel");
			jQuery("#maincontent, #footer, #header").animate({ left: '250px' }, 300);
			jQuery("#navpanel").css("width", "250px");
			jQuery("#navpanel").fadeIn();
		}
	});

	jQuery(window).on("scroll", function(event){
		var windowScroll = jQuery(window).scrollTop();
		var windowHeight = jQuery(window).height();

		if (!mobile) {
			if (windowScroll > 40) {
				//jQuery("body").addClass("headermounted");
			} else {
				//jQuery("body").removeClass("headermounted");
			}
		}


		var distance = jQuery(window).scrollTop();
		var amount = 1 - (distance / 300);

		if (distance < jQuery("#feature").height()) {
			if (amount > .2) {
				jQuery("#feature img.slideimage" ).css('opacity', amount);
			}
			event.stopPropagation();
			event.preventDefault();
		}

		if (distance -300 > jQuery("#feature").height()) {
			jQuery("#uparrow").fadeIn();
			event.stopPropagation();
		} else {
			jQuery("#uparrow").fadeOut();
			event.stopPropagation();
		}

		// Custom Scrollspy
		if (jQuery("#mainnav li a.bbanchor").length > 0) {
			mount();
		}

		// Bread anchor
		if ($("#bagel").length > 0) {
			breadmount();
		}

		// Tag mount
		if ($("#tag").length > 0) {
			tagmount();
		}

		// Job mount
		if (jQuery(".jobtable").length > 0) {
			jobmount();
		}
	});

	function mount() {
		var a,b,c;
		jQuery("li.navelement a.bbanchor").each(function(){
			a = jQuery(jQuery(this).attr("href")).offset().top - 150;
			b = jQuery(jQuery(this).attr("href")).offset().top + jQuery(jQuery(this).attr("href")).next(".contentsection").height();
			c = jQuery(window).scrollTop();

			if (c >= a && c <= b) {
				jQuery("li.navelement a").removeClass("active");
				jQuery(this).addClass("active");
			} else {
				jQuery(this).removeClass("active");
			}
		});
	}


	var ypos = [60, 611, 1142, 1670, 2161, 2640, 3130];

	function breadmount() {
		var x = $($("#bagel").parent().parent()).offset().top + $($("#bagel").parent().parent()).outerHeight() -900;
		var z = $(window).scrollTop();
		var acdifference = x-z;
		if (x <= z) {
			//console.log(acdifference);
			if (acdifference < 0 && acdifference > -69) {
				$("#bagel").css({backgroundPosition: "-"+ypos[0]+"px 0px"});
			} else if (acdifference <= -69 && acdifference >= -126) {
				$("#bagel").css({backgroundPosition: "-"+ypos[1]+"px 0px"});
			} else if (acdifference <= -126 && acdifference >= -174) {
				$("#bagel").css({backgroundPosition: "-"+ypos[2]+"px 0px"});
			} else if (acdifference <= -174 && acdifference >= -229) {
				$("#bagel").css({backgroundPosition: "-"+ypos[3]+"px 0px"});
			} else if (acdifference <= -229 && acdifference >= -290) {
				$("#bagel").css({backgroundPosition: "-"+ypos[4]+"px 0px"});
			} else if (acdifference <= -290 && acdifference >= -330) {
				$("#bagel").css({backgroundPosition: "-"+ypos[5]+"px 0px"});
			} else if (acdifference <= -330 && acdifference >= -370) {
				$("#bagel").css({backgroundPosition: "-"+ypos[6]+"px 0px"});
			} else if (acdifference <= -370 && acdifference >= -410) {
				$("#bagel").css({backgroundPosition: "-"+ypos[7]+"px 0px"});
			} else if (acdifference > -410) {
				$("#bagel").css({backgroundPosition: "-"+ypos[0]+"px 0px"});
			}
		} else {
			$("#bagel").css({backgroundPosition: "-"+ypos[0]+"px 0px"});
		}
	}

	function tagmount() {
		// Distance from top
		var x = jQuery("#menunav").offset().top +200;
		// Height of tag
		var z = jQuery("#menunav").height();
		// Distance scrolled from top
		y = jQuery(window).scrollTop();
		acdifference = Math.round(x-z);

		// Increment starting from 1 when section is visible
		current = Math.round((y - x));

		if (y <= x +2 && y >= acdifference) {
			jQuery("#tag").css("top", current);
		} else {
			jQuery("#tag").css("top", "0");
		}
	}

	function jobmount() {
		// Distance from top
		var x = jQuery(".jobtable").parent().offset().top;
		// Height of tag
		var z = jQuery(".jobtable").height();
		// Distance scrolled from top
		y = jQuery(window).scrollTop();
		acdifference = Math.round(x-z);

		// Increment starting from 1 when section is visible
		current = Math.round((y - x));

		if (y <= x +2 && y >= acdifference -100) {
			jQuery(".jobtable").each(function(){
				jQuery(this).addClass("goto"+jQuery(this).data("menu"));
			});
		} else {
			jQuery(".jobtable").each(function(){
				jQuery(this).removeClass("goto"+jQuery(this).data("menu"));
			});
		}
	}

	jQuery('a.bbanchor, #mainnav .logoanchor').click(function(){
		jQuery('html, body').stop().animate({
			scrollTop: jQuery( jQuery(this).attr('href') ).offset().top - 80
		}, 1000, "easeInOutCirc");
		return false;
	});

	jQuery("#chooselocation").click(function(event){
		event.preventDefault();
		jQuery(".locationlist").slideToggle();
	});

	var marker, map;

	function initialize() {
		var mapOptions = {
			zoom: jQuery(".bbmap").data("zoom"),
			scrollwheel: false,
			mapTypeControl: false,
			disableDoubleClickZoom: false,
			disableDefaultUI: true,
			draggable: false,
			center: new google.maps.LatLng(jQuery(".bbmap").data("lat"), jQuery(".bbmap").data("long")),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementsByClassName('bbmap')[0], mapOptions);

		jQuery(".locationitem").each(function(){
			marker = new google.maps.Marker({
				map:map,
				draggable:false,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng(jQuery(this).data("lat"), jQuery(this).data("long"))
			});
		});
	}

	if (jQuery(".bbmap").length > 0) {
		initialize();
	}

	jQuery("."+jQuery("#menunav li a.active").data("menu")).show();

	jQuery("#menunav a").not(".menuheader >").click(function(event){
		event.preventDefault();
		jQuery("#menunav .active").removeClass("active");
		jQuery(this).addClass("active");
		clockreset();
		jQuery(".menusection").hide();
		jQuery("."+jQuery(this).data("menu")).show();
		// Scroll to top of menu
		jQuery('html, body').stop().animate({
			scrollTop: jQuery("#menunav").offset().top - 160
		}, 1000, "easeInOutCirc");
		return false;
	});

	function clockreset() {
		jQuery(".gotobreakfast").removeClass("gotobreakfast");
		jQuery(".gotolunch").removeClass("gotolunch");
		jQuery(".gotodinner").removeClass("gotodinner");
	}

	// Feature slideshow loads immediately
	jQuery('#feature.flexslider').flexslider({
        animation: "fade",
		controlsContainer: ".controls",
        start: function(slider){
          jQuery('body').removeClass('loading');
        }
    });

    // Lifestyle slideshow loads at very end
	jQuery(window).load(function(){
      jQuery('#imagegallery .flexslider').flexslider({
        animation: "slide",        
        directionNav: true,
        prevText: "&lsaquo;",
        nextText: "&rsaquo;",
      });
    });

	// Set all events to the same height
	jQuery(".eventitem").each(function(){

	});

	var maxHeight = -1;
	var totalcols = jQuery(".eventcaption h2").length;

	function resetheights () {
		// Reset the heights to auto
		jQuery('.eventcaption h2').each(function() {
			jQuery(this).height("auto");
		});

		maxHeight = 0;
		// Look through all elements and track the heights based on their position in their stack and apply to others in similar positions.
		for (var i=0; i < totalcols + 1; i++) {
			// Set our height tracker to zero


			jQuery('.eventcaption h2:nth-child('+i+')').each(function() {
			     maxHeight = maxHeight > jQuery(this).height() ? maxHeight : jQuery(this).height();
			});

			jQuery('.eventcaption h2:nth-child('+i+')').each(function() {
				jQuery(this).height(maxHeight);
			});
		}
	}

	resetheights();

});