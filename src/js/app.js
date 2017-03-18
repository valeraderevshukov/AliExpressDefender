//POLYFILL SVGXUSE
// import svg4everybody from 'svg4everybody';
import fullpage from 'fullpage.js';
window.$ = require('jquery');
window.jQuery = require('jquery');

export
	const {
		DOCUMENT,
		BODY,
		FULLPAGE,
		FULLPAGE_DELAY,
		SLIDE,
		MOUSE,
		IMAGES,
		BTN_CHANGE_IMG,

		ACTIVE,

		touch
	} = {
		DOCUMENT: $(document),
		BODY: $('body'),
		FULLPAGE: $('.js-fullpage'),
		FULLPAGE_DELAY: 900,
		SLIDE: $('.js-section'),
		MOUSE: $('.js-mouse'),
		IMAGES: $('.js-images'),
		BTN_CHANGE_IMG: $('.js-change-img'),

		ACTIVE: 'is-active',

		//detect functions
		touch() {
			return 'ontouchstart' in window;
		}
	};

// svg4everybody();

//detect
if (!touch()) BODY.addClass('no-touch');

function detectBrowser() {
    let ua = window.navigator.userAgent,
        firefox = ua.indexOf('Firefox/'),
        opera = ua.indexOf('Opera/'),
        opr = ua.indexOf('OPR/'),
        chrome = ua.indexOf('Chrome/'),
        ya = ua.indexOf('YaBrowser/');

    if ( chrome > 0 ) {
        BODY.addClass('chrome');
    }
    if ( opera > 0 || opr > 0) {
        BODY.addClass('opera');
        if ( chrome > 0 ) {
            BODY.removeClass('chrome');
        }
    }
    if ( firefox > 0 ) {
        BODY.addClass('firefox');
    }
    if ( ya > 0 ) {
        BODY.addClass('yaBrowser');
        if ( chrome > 0 ) {
            BODY.removeClass('chrome');
        }
    }
    return false;
}
detectBrowser();

$(document).ready( () => {

	FULLPAGE.fullpage({
		scrollingSpeed: FULLPAGE_DELAY,
		sectionSelector: SLIDE,
		verticalCentered: false
	});

	BODY.addClass('is-loaded');

	MOUSE.click( () => {
		$.fn.fullpage.moveSectionDown();
	});

	BTN_CHANGE_IMG.click( function(e) {
		let _this = $(this),
			dataId = $(this).data('img-id'),
			img = $('.js-images-item'),
			actveImg = $('[data-images-item="'+dataId+'"]');

		BTN_CHANGE_IMG.removeClass(ACTIVE);
		_this.addClass(ACTIVE);
		
		img.removeClass(ACTIVE);
		actveImg.addClass(ACTIVE);

		e.preventDefault();
	});

	let triggerImg = () => {
		let imgLast = $('.js-images-item:last'),
			imgFirst = $('.js-images-item:first'),
			delay = 5000;

		imgFirst.addClass(ACTIVE);

		let imgActive = $('.js-images-item.is-active'),
			dataActive = imgActive.data('images-item'),
			linkActive = $('[data-img-id="'+dataActive+'"]');

		linkActive.addClass(ACTIVE);

		setInterval(function() {
			let imgActive = $('.js-images-item.is-active');
			BTN_CHANGE_IMG.removeClass(ACTIVE);
			if ($('.js-images-item:last').hasClass(ACTIVE)) {
				imgLast.removeClass(ACTIVE);
				imgFirst.addClass(ACTIVE);
			} else {
				imgActive
				.removeClass(ACTIVE)
				.next().addClass(ACTIVE);
			}
			imgActive = $('.js-images-item.is-active'),
			dataActive = imgActive.data('images-item'),
			linkActive = $('[data-img-id="'+dataActive+'"]');
			linkActive.addClass(ACTIVE);
		}, delay);
	} 
	triggerImg();

});
