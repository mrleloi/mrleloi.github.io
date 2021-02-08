(function ($) {
"use strict";

function gg_isotope_init() {

	if($('.el-grid:not(.gg-slick-carousel):not([data-layout-mode="list"])').length > 0){
	    var layout_modes = {
	        fitrows: 'fitRows',
	        masonry: 'masonry'
	    }
	    jQuery('.gg_posts_grid').each(function(){
	        var $container = jQuery(this);
	        var $thumbs = $container.find('.el-grid:not(.gg-slick-carousel):not([data-layout-mode="list"])');
	        var layout_mode = $thumbs.attr('data-layout-mode');
	        
	        $thumbs.isotope({
	            // options
	            itemSelector : '.isotope-item',
	            layoutMode : (layout_modes[layout_mode]==undefined ? 'fitRows' : layout_modes[layout_mode]),
	        });


			//Isotope filter
	        if($container.find('.gg_filter:not(.gg-slick-carousel)').length > 0){
		        $container.find('.gg_filter:not(.gg-slick-carousel) a').data('isotope', $thumbs).click(function(e){
		            e.preventDefault();
		            var $thumbs = jQuery(this).data('isotope');
		            jQuery(this).parent().parent().find('.active').removeClass('active');
		            jQuery(this).parent().addClass('active');
		            $thumbs.isotope({filter: jQuery(this).attr('data-filter')});
		        });
	    	}

	        jQuery(window).bind('load resize', function() {
				
				$thumbs.imagesLoaded( function() {
				 	$thumbs.isotope('layout');
				});

	        });

	    });
	}
}

/* Magnific */
function gg_magnific_init() {
	if($('.el-grid:not(.no_magnific), .gg-slick-carousel.has_magnific, .wpb_image_grid.has_magnific, .wpb_single_image.has_magnific, .post-thumbnail.has_magnific, .doctor-contact').length > 0){
		$( '.el-grid:not(.no_magnific), .gg-slick-carousel.has_magnific, .wpb_image_grid.has_magnific, .wpb_single_image.has_magnific, .post-thumbnail.has_magnific, .doctor-contact' ).each(function(){
			$(this).magnificPopup({
				delegate: 'a.lightbox-el',
				type: 'image',
				gallery: {
		            enabled: true
		        },
				callbacks: {
				    elementParse: function(item) {
				      if(item.el.context.className == 'lightbox-el link-wrapper lightbox-video') {
				         item.type = 'iframe';
				    	} else if(item.el.context.className == 'lightbox-el gg-popup') {
				         item.type = 'inline';
				      } else {
				         item.type = 'image';
				      }
				    }
				}
			});
		});
	}

	if($('.doctor-contact').length > 0){
		$( '.doctor-contact' ).each(function(){
			$(this).magnificPopup({
				delegate: 'a.lightbox-el',
				type: 'inline',
				callbacks: {
				    beforeOpen: function() {
				    	this.st.mainClass = this.st.el.attr('data-effect');
					}
				},
				midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			});
		});
	}
}

/* SlickCarousel */
function gg_slickcarousel_init() {
	if($('.gg-slick-carousel:not(.gg_filter)').length > 0){
		$( '.gg-slick-carousel:not(.gg_filter)' ).each(function(){

			var $this = $(this);
			
		  	if ($this.attr('data-mousewheel') == "true") {
			  	$this.on('mousewheel', function (e) {

				    if (e.deltaY>0) {
				        $(this).slick('slickNext');
				    } else {
				        $(this).slick('slickPrev');
				        
				    }
				    e.preventDefault();
				});
			}

			var filtered = false;

			$('.gg_filter.gg-slick-carousel a').on('click', function(e){

			  e.preventDefault();
			  $(this).parent().parent().find('.active').removeClass('active');
		      $(this).parent().addClass('active');

		      if ($(this).attr('data-filter') == '*') {
		      	$( '.el-grid.gg-slick-carousel' ).slick('slickUnfilter');
		      	$( '.el-grid.gg-slick-carousel' ).slick('slickGoTo',0);
			    filtered = false;
			  } else {
			  	$( '.el-grid.gg-slick-carousel' ).slick('slickFilter',$(this).attr('data-filter'));
			  	$( '.el-grid.gg-slick-carousel' ).slick('slickGoTo',0);
			    filtered = true;

			  } 

			});

			

		});

	}
}

/* SlickCarousel */
function gg_vc_rtl_row() {
	
}

/* Counter */
function gg_counter_init(){
	if($('.counter').length > 0){
		jQuery('.counter-holder').waypoint(function() {
			$('.counter').each(function() {
				if(!$(this).hasClass('initialized')){
					$(this).addClass('initialized');
					var $this = $(this),
					countToNumber = $this.attr('data-number'),
					refreshInt = $this.attr('data-interval'),
					speedInt = $this.attr('data-speed');

					$(this).countTo({
						from: 0,
						to: countToNumber,
						speed: speedInt,
						refreshInterval: refreshInt
					});
				}
			});
		}, { offset: '85%' });
	}
}

$(document).ready(function () {

	gg_slickcarousel_init();
    gg_magnific_init();
    gg_counter_init();
    gg_isotope_init();
 
	// here for the submit button of the comment reply form
	$( '#submit, input[type="button"], input[type="reset"], input[type="submit"], a.checkout-button' ).addClass( 'btn btn-primary' );	
	
	$( 'table' ).not('.variations').addClass( 'table');

	$( 'form' ).not('.header-search form, .variations_form').addClass( 'table');

	$('form').attr('role', 'form');

	var inputs = $('input, textarea')
            .not(':input[type=button], :input[type=submit], :input[type=reset]');

	$(inputs).each(function() {
	    $(this).addClass('form-control');
	});

	if($('body.gg-theme-is-mobile').length > 0) {
		$("a.product-image-overlay").click(function(event){
		    event.preventDefault();
		});
	}

	//Fullscreen search form
	if($('li.search_form').length > 0) {
	    $('a[href="#fullscreen-searchform"]').on('click', function(event) {
	        event.preventDefault();
	        $('#fullscreen-searchform').addClass('open');
	        $('#fullscreen-searchform > form > input[type="search"]').focus();
	    });
	    
	    $('#fullscreen-searchform, #fullscreen-searchform button.close').on('click keyup', function(event) {
	        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
	            $(this).removeClass('open');
	        }
	    });
    }

    //Currency switcher
	if($('.site-header .gg-currency-switcher').length > 0) {
	    $('.gg-currency-switcher ul.wcml_currency_switcher').addClass('dropdown-menu');
    }

    

});

})(jQuery);