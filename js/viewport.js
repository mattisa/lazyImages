var viewport = function () {
  'use strict';
  
  // vreate cached object
  var current_size;

  // function that returns current viewport size
  function getCurrentViewportSize() {
    var e = window,
      a = 'inner',
      current_size;

    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }

    return {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    };
  }

  // bind resize
  $(window).on('resize', function () {
    current_size = getCurrentViewportSize();
  });

  // init sizes if not defined
  if (!current_size)
    current_size = getCurrentViewportSize();

  // new function that returns cached value. 
  return function () {
    return current_size;
  };
}();
