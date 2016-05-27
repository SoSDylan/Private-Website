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

  if (scroll >= introHeight - 76) {
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

  var navSections = [ [ $('#intro'), $('#intro-nav') ], [ $('#about'), $('#about-nav') ], [ $('#images'), $('#images-nav') ]/*, [ $('#portfolio'), $('#portfolio-nav') ], [ $('#contact'), $('#contact-nav') ]*/ ];
  for (var i = 0, l = navSections.length; i < l; i++) {
    if (scroll + 76 >= navSections[i][0].offset().top && scroll + 76 < navSections[i][0].offset().top + navSections[i][0].height()) {
      navSections[i][1].addClass('selected');
    } else {
      navSections[i][1].removeClass('selected');
    }
  }

  var parallaxY = (scroll / 1.6).toFixed(0);

  if (scroll <= introHeight) {
    $('#intro-parallax').css({ // TODO: only call when on screen
      'transform': 'translate3d(0px, -' + parallaxY + 'px, -1px)'
    });
  }

  // if (scroll <= introHeight) {
  var imagesParallax = -(parallaxY - 400);
  // console.log(parallaxY - $('#intro').height() + $('#about').height() - $(window).height());
  $('#images-parallax').css({ // TODO: only call when on screen
    'transform': 'translate3d(0px, ' + (imagesParallax) + 'px, -1px)'
  });
  // }
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
