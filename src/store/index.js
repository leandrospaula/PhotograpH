import '@babel/polyfill';
import './index.scss';

// VENDOR CS
import '../assets/css/_reset.scss';
import '../assets/css/materialize/materialize.scss';
import '../assets/css/_animista.scss';
import '../assets/js/jquery.countdown.js';
import '../assets/css/_theme.scss';

// VENDOR JS
import '../assets/js/jquery.countdown.js';
import '../assets/js/newsletter';
import '../assets/js/newsletter-data';
import 'slick-carousel';
import '../assets/js/materialize';

import numeral from 'numeral';


import Rol from './Rol';
import Header from './Header';
import Footer from './Footer';


Main();

function Main() {
    Header();
    Footer();
    Rol();

    const $body = $('body');
    // $body.find('.prateleira').length && Shelf();

    // $body.hasClass('home') && Home();

    RefreshSlick();
}

function RefreshSlick() {
    window.onresize = function () {
        $('.slick-initialized').each(function () {
            $(this)[0].slick.refresh();
        });
    };
}


var btn = $('#returnToTop');

$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});
