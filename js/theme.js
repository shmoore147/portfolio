/*
 *  Custom Javascript code for themesforever.com
 */

/********************************************************
*
*  QueryLoader2 : Pre loader go!
*
*******************************************************/
window.addEventListener('DOMContentLoaded', function() {
 new QueryLoader2(document.querySelector('body'), {
   barColor: '#fff',
   backgroundColor: '#131313',
   percentage: true,
   barHeight: 1,
   minimumTime: 1000,
   fadeOutTime: 1000
 });
});

$(function(){
/********************************************************
 *
 *  backstretch : background image pages
 *
 *******************************************************/
 // only pages with background image
 // http://srobbin.com/jquery-plugins/backstretch/
 // get image <img src=""> in html
 var background_image_page = $('#background-image-page').attr('src');
 // validate background_image_page != null
 if( background_image_page )
  $.backstretch(background_image_page);

//  important! for edition opacity review style

/********************************************************
 *
 *  WOW : Portfolio
 *
 *******************************************************/
  //  scroll animated with wow.js
  //  for configuration check http://mynameismatthieu.com/WOW/
  //  settings div wow
  wow = new WOW(
    {
      animateClass: 'animated fadeIn',
      offset:       50,
      mobile:       true,  // false
      callback: function(box){ }
    }
  );
  //  Go! div wow
  wow.init();

/********************************************************
 *
 *  Scrolling infitinte with waypoint
 *
 *******************************************************/

  var portfolio = $('#portfolio'),
      footer_portfolio = $('#footer-portfolio'),
      opts = {
        offset: '100%'
      };

  // show hover effect on mobile devices
  portfolio.on('click', '#portfolio figure', function (e) {
    e.addEventListener( 'click', function(ev) { ev.preventDefault(); } );
  });

  //  scrolling infinite with waypoint
  //  for use ajax is neccesary server
  footer_portfolio.waypoint(function(event, direction) {

    footer_portfolio.waypoint('remove');

    $.ajax({
      url: 'includes/items.php',
      type: 'post',
      data: { quantity : 6 },
    })
    .done(function(data) {
      //  load items portfolio
      portfolio.append(data);
      footer_portfolio.waypoint(opts);
    })
    .fail(function() {
      console.log('Error! Ajax is necessary to work from a server');
    });

  }, opts);

/********************************************************
 *
 *  Navbar by themesforever
 *
 *******************************************************/
  var navbar = $('#navbar');
  // run navbar is active
  var nav_switch = true;
  //  background color navbar
  var navbar_bg = navbar.css('background-color');
  //  button only desktop
  var nav_btn_close = $('#nav-btn-close');
  //  button icon only desktop
  var nav_btn_icon_desktop = $('.nav-btn-icon-desktop');
  //  button icon only movil
  var nav_btn_icon_movil = $('.nav-btn-icon-movil');

  //  only desktop : hide or show navbar with scroll
  $(window).scroll(function () {

    var ww = Math.max($(window).width(), window.innerWidth);
    //  if device is a desktop > 767
    if (ww > 767){
      if( $(window).scrollTop() > 50 ) {
        if( nav_switch ) {
          //  animation with animated.css
          animate( nav_btn_icon_desktop.children(),'rotateIn' );
          //  animation switch active icon close
          nav_btn_icon_desktop.children().toggleClass('fa-close fa-navicon');
          //  hide navbar
          navbar.animate({ opacity : 0 }, 'fast');
          // run navbar is inactive
          nav_switch = false;
        }
      }
    }
  });
  //  only desktop : button hide or show navbar
  nav_btn_close.on('click',function (e) {

    //  animation with animated.css
    animate(nav_btn_icon_desktop.children(), 'rotateIn');

    if( nav_switch ) {
      //  animation switch active icon close
      nav_btn_icon_desktop.children().toggleClass('fa-navicon fa-close');
      //  hide navbar
      navbar.animate({ opacity : 0 }, 'fast');
      // run navbar is inactive
      nav_switch = false;
    }
    else {
      //  animation switch active icon close
      nav_btn_icon_desktop.children().toggleClass('fa-close fa-navicon');
      //  show navbar
      navbar.animate({ opacity : 1 }, 'fast');
      // run navbar is active
      nav_switch = true;
    }
    e.preventDefault();

  });
  //  only movil : hide or show menu and switch icon
  navbar.on('click', 'button.navbar-toggle', function (e) {

    animate(nav_btn_icon_movil.children(), 'rotateIn');
    nav_btn_icon_movil.children().toggleClass('fa-close fa-navicon');

  })
  //  only movil : function reset configuration for movil
  var resetCollapseMovil = function (){

    var ww = Math.max($(window).width(), window.innerWidth);
    //  if device is a movil < 768
    if (ww < 768){
      //  show navbar
      if( !nav_switch ) {
        navbar.animate({ opacity : 1 }, 'fast');
        nav_switch = true;
        nav_btn_icon_desktop.children().toggleClass('fa-close fa-navicon');
      }
    }
  };

  //  for use smartload function is neccesary debouncer.js
  //  call resetCollapseMovil() when window is loaded.
  $(window).smartload(function(){
    resetCollapseMovil();
  });

  //  for use smartresize function is neccesary debouncer.js
  //  call resumeCollapse() when window is resized.
  $(window).smartresize(function(){
    resetCollapseMovil();
  });
  //  animate css function
  function animate(id, animation) {
    $(id).addClass(animation);
    var wait = window.setTimeout(
      function()
      {
        $(id).removeClass(animation)
      }, 500
    );
  }

});
