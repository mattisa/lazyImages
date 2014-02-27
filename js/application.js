
$(function() {

  // create conf for image sizes
  var imagesMap = {0: 'src-xs', 360: 'src-s', 680: 'src-m', 1280: 'src-l', 1680: 'src-xl'};

  // init adaptive images
  // 
  // You should run this qithout window.load callback 
  // cause normally you have some other content on page that pushes images out of viewport. 
  // 
  // This way images out of viewport wont be loaded to soon. 
  //  
  $(window).load(function () {
    $(document).adaptiveImages({ imgs:'img.lazy, img.adaptive', imageSizesMap: imagesMap });
  });

});

