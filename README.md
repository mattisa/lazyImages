lazyImages
==========


 JS example:
  
    var imagesMap = {0: 'src-xs', 
                    360: 'src-s', 
                    680: 'src-m', 
                    1280: 'src-l', 
                    1680: 'src-xl'};
                    
    $(document).adaptiveImages({ 
      imgs:'img.lazy, 
      imageSizesMap: imagesMap
     });


 HTML markup example: 
   
       <img class="adaptive" 
        data-src-l="http://placehold.it/1280x768" 
        data-src-m="http://placehold.it/640x480" 
        data-src-s="http://placehold.it/360x200" 
        data-src-xl="http://placehold.it/1680x1200" 
        src="http://placehold.it/640x480">


  TODO's
  - should work without jquery


