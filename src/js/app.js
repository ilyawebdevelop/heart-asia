import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import "./modules/fslightbox.js";
import "./modules/bootstrap.bundle.min.js";
import './components.js';

flsFunctions.isWebp();

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);

// Инициализация слайдера introSlider
const introSlider = document.querySelector('.introSlider');
var mySwiperIntro = new Swiper(introSlider, {
  slidesPerView: 1,
  speed: 800,
  spaceBetween: 10,
  effect: 'fade',
  autoplay: {
    delay: 3000,
  },
  fadeEffect: {
    crossFade: true
  },
  navigation: {
    prevEl: document.querySelector('.introSlider .navArrowPrev'),
    nextEl: document.querySelector('.introSlider .navArrowNext'),
  },
  pagination: {
    el: document.querySelector('.introSlider .swiper-pagination'),
    clickable: true,
    type: 'bullets',
  },
});


let buttonActionTextArray = document.querySelectorAll('.button-action-text');
buttonActionTextArray.forEach(el => {
  el.addEventListener('click', () => {
    let contentHidden = el.closest('.newsCardAction').querySelector('.content--hidden');
    contentHidden.classList.add('active');
    el.style.display = 'none';
  });
});

let searchBtnClearArray = document.querySelectorAll('.searchBtnClear');
searchBtnClearArray.forEach(el => {
  el.addEventListener('click', () => {
    let input = el.closest('.searchW').querySelector('.searchInput');
    input.value = '';
    input.focus();
  });
});

let headerSearchBtn = document.querySelector('.headerSearchBtn');
let searchInputHeader = document.querySelector('.searchW--header')
headerSearchBtn.addEventListener('click', () => {
  searchInputHeader.classList.add('active');
});


document.addEventListener('click', e => {
  let target = e.target;
  let its_search = target == searchInputHeader || searchInputHeader.contains(target);
  let its_search_btn = target == headerSearchBtn || headerSearchBtn.contains(target);
  // let overlay_is_active = mobMenuOverlay.classList.contains('active');

  if (!its_search && !its_search_btn) {

    searchInputHeader.classList.remove('active');
  }
});

const mediaMinQuery992 = window.matchMedia('(min-width: 992px)');

var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

function fixHeader() {
  if ($(document).scrollTop() > $('.header').offset().top + $('.header').outerHeight()) {
    $('.headerB').addClass('_fixed');
    setTimeout(function () {
      $('.headerB').addClass('_show');
    }, 50);
  } else {
    $('.headerB').removeClass('_fixed _show');
  }
}

$(window).on('load scroll', function () {
  if (mediaMinQuery992.matches) {
    if ($('.headerB').length > 0) fixHeader();
  }
});

// Burger
const btnMenu = document.querySelector('.hamburger');
const menu = document.querySelector('.headerNav');
const bodyEl = document.querySelector('body');
const btnClose = document.querySelector('.headerNavClose');

const toggleMenu = function () {
  menu.classList.toggle('active');
}
const toggleBurger = function () {
  btnMenu.classList.toggle('active');
}
const bodyOverflow = function () {
  bodyEl.classList.toggle('hidden');
  bodyEl.classList.toggle('hide-scrollbar');
}

btnMenu?.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu();
  toggleBurger();
  bodyOverflow();
});
const menuClose = function () {
  toggleBurger();
  bodyOverflow();
  toggleMenu();
  overlayToggle();
}

btnClose?.addEventListener('click', function (e) {
  menuClose();
});

