(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	/*
		try {
			$('.lgx_app_item_link').tooltipster();
		} catch(e) {
			//console.log('not start');
		}
	*/

	jQuery(document).ready(function ($) {

		if ( $('.lgx_logo_carousel').length ) {
			$('.lgx_logo_carousel').each(function (index) {
				var lgx_logo_carousel_item 	= $(this);
				var lgxLogoCarouselDataAttr = lgx_logo_carousel_item.data();
				var lgx_logo_carousel_id 	= lgx_logo_carousel_item.attr('id');
				var lgxLogoCarousel 		= $('#' + lgx_logo_carousel_id + '.lgx_logo_carousel');
				//	console.log(lgxCarouselDataAttr);
				var lgxLogoPagination =lgxLogoCarouselDataAttr.pagination;
				var lgxLogoNavigation = lgxLogoCarouselDataAttr.nav;
				var lgxLogoAutoplay   = lgxLogoCarouselDataAttr.infinite;

				if (lgxLogoCarousel.length > 0) {
					var lgxLogoSwiper = new Swiper('#' + lgx_logo_carousel_id, {
						lazy:lgxLogoCarouselDataAttr.lazy,
						loop: lgxLogoCarouselDataAttr.infinite,
						speed: parseInt(lgxLogoCarouselDataAttr.speed),
						autoplay:
							lgxLogoAutoplay == true
								?{
									delay: parseInt(lgxLogoCarouselDataAttr.delay),
									disableOnInteraction:false,
									pauseOnMouseEnter:lgxLogoCarouselDataAttr.pause,
								}
								: false,
						spaceBetween: parseInt(lgxLogoCarouselDataAttr.space),
						slidesPerView: parseInt(lgxLogoCarouselDataAttr.item_mobile),
						allowTouchMove: lgxLogoCarouselDataAttr.move,
						simulateTouch: lgxLogoCarouselDataAttr.simulate,
						grabCursor: lgxLogoCarouselDataAttr.grab,
						mousewheel: lgxLogoCarouselDataAttr.wheel,
						autoHeight:lgxLogoCarouselDataAttr.height,
						//freeMode: true,
						effect: lgxLogoCarouselDataAttr.effect,
						coverflowEffect: {
							rotate: 30,
							slideShadows: false,
						},
						pagination:
							lgxLogoPagination == true
								? {
									el: '.swiper-pagination',
									type:'bullets',
									clickable: true,
									dynamicBullets: lgxLogoCarouselDataAttr.dynamic,
									dynamicMainBullets: parseInt(lgxLogoCarouselDataAttr.bullets_no),
								}
								: false,
						navigation:
							lgxLogoNavigation == true
								? {
									nextEl: '.lgx_lsw_nav_button_next',
									prevEl: '.lgx_lsw_nav_button_prev'
								}
								: false,

						breakpoints: {
							320: {
								slidesPerView:parseInt(lgxLogoCarouselDataAttr.item_mobile),
							},
							768: {
								slidesPerView: parseInt(lgxLogoCarouselDataAttr.item_tablet),
							},
							992: {
								slidesPerView: parseInt(lgxLogoCarouselDataAttr.item_desk),
							},
							1200: {
								slidesPerView: parseInt(lgxLogoCarouselDataAttr.item_large),
							},
						},
						loopFillGroupWithBlank: true,
						fadeEffect: {
							crossFade: true
						},
						keyboard: {
							enabled: true
						},
					})
					if (lgxLogoCarouselDataAttr.autoplay === false) {
						lgxLogoSwiper.autoplay.stop()
					}
					if (lgxLogoCarouselDataAttr.pause && lgxLogoCarouselDataAttr.autoplay) {
						$(lgxLogoCarousel).hover(
							function () {
								lgxLogoSwiper.autoplay.stop()
							},
							function () {
								lgxLogoSwiper.autoplay.start()
							}
						)
						$(lgxLogoCarousel).mouseenter(function () {
							lgxLogoSwiper.autoplay.stop();
						});
						$(lgxLogoCarousel).mouseleave(function () {
							lgxLogoSwiper.autoplay.start();
						});
					}
					/*Final End*/

					$(window).resize(function () {
						lgxLogoSwiper.update()
					})
					$(window).trigger("resize")
				}

			}); //Swiper Each
		}


		if ( $('.lgx_app_item_tooltip').length ) {
			$('.lgx_app_content_wrapper').each(function (index) {
				var lgx_ls_tt_item 		 = $(this);
				var lgx_showcase_id 	 = lgx_ls_tt_item.attr('id');
				var lgx_tooltip_data_row = $('#' + lgx_showcase_id + ' .lgx_app_item_row');
				var lgxTtDataAttr = lgx_tooltip_data_row.data();
				//console.log(lgxTtDataAttr);
				$('#' + lgx_showcase_id + ' .lgx_app_item_tooltip').tooltipster({
					//position:'top',
					side:lgxTtDataAttr.tt_position,
					animation: lgxTtDataAttr.tt_anim,
					animationDuration: lgxTtDataAttr.tt_duration,
					arrow: lgxTtDataAttr.tt_arrow,
					delay: lgxTtDataAttr.tt_delay,
					distance: lgxTtDataAttr.tt_distance,
					trigger: lgxTtDataAttr.tt_trigger,
					minIntersection: lgxTtDataAttr.tt_intersection,
					timer:lgxTtDataAttr.tt_timer,
					theme: 'lgx_lsw_tooltipster_'+ lgxTtDataAttr.tt_id,
				});
			}); //each
		}

	/*	$('.lgx_app_item_row').masonry({
			// options
			itemSelector: '.lgx_app_item',
		   columnWidth: 200,
			gutter: 10,
			//fitWidth: true
		});
*/


		if ( $('.lgx_lsw_preloader').length ) {
			$('body').find('.lgx_logo_slider_app').each(function () {
				var lgx_lsw_preloader_item = $(this).children('.lgx_lsw_preloader');
				$(document).ready(function() {
					//alert('yes');
					$(lgx_lsw_preloader_item).animate({ opacity: 0 }, 600).remove();
				})
			})
		}
	})//DOM

})( jQuery );
