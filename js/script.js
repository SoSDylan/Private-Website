var navFixed = false;

$(window).scroll(function() {
  window.requestAnimationFrame(scrollHandler);
});

$(window).resize(function() {
  window.requestAnimationFrame(scrollHandler);
});

function scrollHandler() {
  var scroll = $(window).scrollTop();
  var introHeight = $('.intro-section').height();

  if (scroll >= introHeight) {
    if (!navFixed) {
      navFixed = true;

      $('nav').addClass('fixed');

      $('nav').css({ top: '-76px' });
      $('nav').animate({
        top: '0px'
      }, 250, function() {
      });
    }
  } else {
    if (navFixed) {
      navFixed = false;

      $('nav').animate({
        top: '-76px'
      }, 250, function() {
        $('nav').removeClass('fixed');
        $('nav').css({ top: '0px' });
      });
    }
  }

  var parallaxY = (scroll / 1.6).toFixed(0);

  if (scroll <= introHeight) {
    $('.intro-background').css({ // TODO: only call when on screen
      'transform': 'translate3d(0px, -' + parallaxY + 'px, -1px)'
    });
  }
}

// function scrollTo(element) {
//   $('html, body').animate({ scrollTop: $("#" + element).offset().top }, 750);
// }

$(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    // top position relative to the document
    var pos = $(id).offset().top;
    // animated top scrolling
    $('body, html').animate({ scrollTop: pos }, 750, "easeOutCubic");
});
