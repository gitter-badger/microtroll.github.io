(function ($) {
  'use strict';

  // getElementById
  $.id = function(id) {
    return document.getElementById(id);
  };

  // ajax call
  /*
  $.ajax = function(o) {
    var request = new XMLHttpRequest();
    request.open(o.method, o.url, true);
    request.onload = o.success(this.response);
    request.onerror = o.error();
    request.send();
  };
  */

  // fadein effect
  $.fadeIn = function (el) {
    el.classList.add('show');
    el.classList.remove('hide');
  };

}(window.$ = {}));
