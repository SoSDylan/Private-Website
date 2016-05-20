var headerFixed = false;

$('.body').scroll(function() {
  var introHeight = $('.intro-section').height();

  if ($(this).scrollTop() >= introHeight) {
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
});
