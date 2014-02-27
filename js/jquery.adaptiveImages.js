
/**
 * By Siili 2014
 * 
 * JS example:
 *  
 *    var imagesMap = {0: 'src-xs', 
 *                    360: 'src-s', 
 *                    680: 'src-m', 
 *                    1280: 'src-l', 
 *                    1680: 'src-xl'};
 *                    
 *    $(document).adaptiveImages({ 
 *      imgs:'img.lazy, 
 *      imageSizesMap: imagesMap
 *     });
 *
 *
 * HTML markup example: 
 *   
 *       <img class="adaptive" 
 *        data-src-l="http://placehold.it/1280x768" 
 *        data-src-m="http://placehold.it/640x480" 
 *        data-src-s="http://placehold.it/360x200" 
 *        data-src-xl="http://placehold.it/1680x1200" 
 *        src="http://placehold.it/640x480">
 *
 *
 *  requires 
 *   - $.debounce
 *   - $.debounceScroll
 *
 *  TODO's
 *  - should work without jquery
 *  
 */

/* global $, viewport*/

$.fn.adaptiveImages = function(options) {
  
  'use strict';

  var _this = this,
    defaults = {
      imgs: 'img',
      imageSizesMap: {},
      imageBuffer: 150 // as 150%
    };
    
  options = $.extend(defaults, options); // extend defalu options with given ones
  
  this.initImages = function() {
     _this.images = $(options.imgs);
  };

   /**
   * Function checks where scroll position is and update img src if it's close to viewport 
   * 
   * @return {undefined}
   */
  this.loadLazyImages = function () {
     
    var loadImagesBefore = viewport().height + $(window).scrollTop() + viewport().height * (options.imageBuffer / 100),
        img,
        images = _this.images.filter('.lazy');

    for (var i = 0, len = images.length; i < len; i++) {
      img = $(images[i]);
      if(img.offset().top < loadImagesBefore) { // if image is inside viewport with given buffer, load it
        _this.updateImageSource(img);
      }
    }
  };

  /**
   * Function get's image and check which kind if image it should have.
   * 
   * @param  {HTML Image} img to be updated
   * @return {undefined}
   */
  this.updateImageSource = function (img) {
    var $img = $(img),
        imgWidth = $img.width(),
        keys = Object.keys(options.imageSizesMap);
       
    if (imgWidth > keys[keys.length-1]) { // if images is bigger that biggest image 
     _this.useBiggestImage($img);
  
    } else { // otherwise get image src from map
      _this.useImageSizeByWidth($img);
    }
  };

  /**
   * Function update image src based on img width.
   * 
   * @param  {jQuery object} $img
   * @return {undefined}
   */
  this.useImageSizeByWidth = function ($img) {
    var imgWidth = $img.width(),
        keys = Object.keys(options.imageSizesMap),
        size;

    for (var i = 0, len = keys.length; i < len ; i++) { // loop imageSizesMap so we find img this is wider that container
      size = keys[i];
      if (size > imgWidth) { // when image found
        _this.updateSrcAttribute($img, options.imageSizesMap[keys[i]]); // update src
        break; // end cause needed image already found
      }
    }
  };

  /**
   * Set biggest available src for image
   * 
   * @param  {jQuery object} $img
   * @return {undefiend}
   */
  this.useBiggestImage = function ($img) {
    var keys = Object.keys(options.imageSizesMap);
    
    $img.attr('src', $img.data( options.imageSizesMap[ keys[keys.length-1] ] ));
  };

  /**
   * Update image attribute if needed
   * 
   * @param  {jQuery object} $img
   * @param  {String} from_attr data attribute that should be used
   * @return {undefined}
   */
  this.updateSrcAttribute = function ($img, from_attr) {
    var src = $img.attr('src'),
        new_src = $img.data(from_attr);
    
    if (new_src && src != new_src) {
      $img.attr('src', new_src); // update new size for image
      $img.removeClass('lazy'); // remove class so on future we wont handle this on scroll
    }
  };

  /**
   * Just sort map that contains all image sizes
   * 
   * @return {undefined}
   */
  this.sortSizesMap = function () {
    var sorted = {},
        keys = Object.keys(options.imageSizesMap).sort();

    for (var i = keys.length - 1; i >= 0; i--) {
      sorted[keys[i]] = options.imageSizesMap[keys[i]];
    }

    options.imageSizesMap = sorted;
  };

  /**
   * Window resixe handler
   * 
   * @return {undefined}
   */
  this.handleResize = function () {
    $.map(_this.images.filter(':not(.lazy)'), _this.updateImageSource);
    _this.loadLazyImages();
  };

  /**
   * Window scroll handler
   * 
   * @return {undefined}
   */
  this.handleScroll = function () {
    _this.loadLazyImages();
  };

  /**
   * Make all neede bindings
   * 
   * @return {[type]}
   */
  this.bind = function () {
    $(window).on('resize', debounce(this.handleResize, 500));
    $(window).on('scroll', debounceScroll(this.handleScroll, 300));
  };


  function debounce (callback, delay) {
    var timeout;
    return function() {
      var self = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        callback.apply(self, args);
      }, delay);
    };
  }

  function debounceScroll (callback, delay) {
    var timeout;
    return function() {
      if (timeout) return;

      var self = this, args = arguments;

      timeout = setTimeout(function() {
        timeout = null;
        callback.apply(self, args);
      }, delay);
    };
  }


  /**
   * Bind and collect needed elements
   * 
   * @return {[type]}
   */
  this.init = function(){
    this.sortSizesMap();
    this.initImages();
    this.bind();
    this.loadLazyImages();
  };

  _this.init();

  return this.each(function () {
  });
};
