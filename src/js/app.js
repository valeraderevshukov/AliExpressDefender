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

	BTN_CHANGE_IMG.click( (e)=> {
		IMAGES.toggleClass('is-animate');
		e.preventDefault();
	});

});
