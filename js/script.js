var headerFixed = false;

$(window).scroll(function() {
  window.requestAnimationFrame(scrollHandler);
});

function scrollHandler() {
  var scroll = $(window).scrollTop();
  var introHeight = $('.intro-section').height();

  if (scroll >= introHeight) {
    if (!headerFixed) {
      headerFixed = true;

      $('header').addClass('fixed');

      $('header').css({ top: '-76px' });
      $('header').animate({
        top: '0px'
      }, 250, function() {
      });
    }
  } else {
    if (headerFixed) {
      headerFixed = false;

      $('header').animate({
        top: '-76px'
      }, 250, function() {
        $('header').removeClass('fixed');
        $('header').css({ top: '0px' });
      });
    }
  }

  var parallaxY = (scroll / 2).toFixed(0);

  // $('.intro-background').css({
  //   'background-position': 'center calc(100% + ' + scroll / 2 + 'px)'
  // });

  // $('.intro-background').animate({
  //   transform: 'translate3d(0px, -' + parallaxY + 'px, -1px)'
  // }, 250, function() {
  // });

  $('.intro-background').css({ // TODO: only call when on screen
    'transform': 'translate3d(0px, -' + parallaxY + 'px, -1px)'
  });
  console.log(parallaxY);
}
