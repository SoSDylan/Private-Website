var navFixed = false;
var removedNavFixed = false;

$(function() {
  $('.load-animation-start').each(function(i, v) {
    var self = this
    setTimeout(function () {
      $(self).removeClass('load-animation-start');
    }, i * 70);
  });
});

$(window).scroll(function() {
  window.requestAnimationFrame(scrollHandler);
});

$(window).resize(function() {
  window.requestAnimationFrame(scrollHandler);
});

function scrollHandler() {
  var scroll = $(window).scrollTop();
  var height = $(window).height();
  var width = $(window).width();
  var introHeight = $('.intro-section').height();

  if (scroll >= introHeight - ($(window).width() <= 680 ? 52 : 76)) { // 53 for small screens
    if (!navFixed) {
      navFixed = true;
      removedNavFixed = true;

      $('nav').addClass('fixed');

      $('nav').css({ top: '-76px' });
      $('nav').animate({
        top: '0px'
      }, 400, "easeOutCubic");
    }
  } else {
    if (navFixed) {
      navFixed = false;
      removedNavFixed = false;

      $('nav').animate({
        top: '-76px'
      }, 400, "easeOutCubic", function() {
        if (!removedNavFixed) {
          $('nav').removeClass('fixed');
          $('nav').css({ top: '0px' });
        }
      });
    }
  }

  var navSections = [ [ $('#intro'), $('#intro-nav') ], [ $('#about'), $('#about-nav') ], [ $('#images'), $('#images-nav') ]/*, [ $('#portfolio'), $('#portfolio-nav') ], [ $('#contact'), $('#contact-nav') ]*/ ];
  for (var i = 0; i < navSections.length; i++) {
    if (scroll + 76 >= navSections[i][0].offset().top && scroll + 76 < navSections[i][0].offset().top + navSections[i][0].height()) {
      navSections[i][1].addClass('selected');
    } else {
      navSections[i][1].removeClass('selected');
    }
  }

  var parallaxY = (scroll / 1.6).toFixed(0);

  // if (scroll <= introHeight) {
  //   $('#intro-parallax').css({ // TODO: only call when on screen
  //     'transform': 'translate3d(0px, -' + parallaxY + 'px, -1px)'
  //   });
  // }

  var parallaxTop = 0;
  var parallaxBottom = -$(window).height();

  var parallaxSections = [ [ $('#intro'), $('#intro-parallax') ], [ $('#about'), null ], [ $('#images'), $('#images-parallax') ] ];
  for (var i = 0; i < parallaxSections.length; i++) {
    parallaxTop += parallaxSections[i][0].height();
    if (parallaxSections[i][1] != null && scroll <= parallaxTop && scroll >= parallaxBottom) {
      var parallaxValue = -(parallaxBottom - 100) > 0 ? -(parallaxY) : -(parallaxY - parallaxBottom - 100);
      parallaxSections[i][1].css({
        'transform': 'translate3d(0px, ' + (parallaxValue) + 'px, -1px)'
      });
    }
    parallaxBottom += parallaxSections[i][0].height();
  }

  if (scroll + $(window).height() <= $(document).height() - 200) {
    $('.footer-content').addClass('hidden');
  } else {
    $('.footer-content').removeClass('hidden');
  }

  $('.parallax-landing-hidden').each(function(i, v) {
    if ($(v).offset().top < scroll + height - 40) {
      $(v).removeClass('parallax-landing-hidden');
    }
  });
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
  var pos = $(id).offset().top < 76 ? 0 : $(id).offset().top - 76;
  var time = 800;//Math.abs(($(id).offset().top - 76 - $(window).scrollTop()).toFixed(0));
  console.log(time);
  // animated top scrolling
  $('body, html').animate({ scrollTop: pos }, time, "easeOutQuart");
});
