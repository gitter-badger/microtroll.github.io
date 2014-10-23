(function($) {
  'use strict';

  // getElementById
  $.id = function(id) {
    return document.getElementById(id);
  };

  // ajax call
  $.ajax = function(obj) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 || xhr.status == 200) {
        obj.success(xhr.responseText);
      } else {
        obj.error(xhr.status);
      }
    };
    xhr.open(obj.method, obj.url, true);
    xhr.send(obj.data);
  };

  // fadein effect
  $.fadeIn = function(el) {
    el.classList.add('show');
    el.classList.remove('hide');
  };

  // fadeout effect
  $.fadeOut = function(el) {
    el.classList.add('hide');
    el.classList.remove('show');
  };

  // CSV to JSON
  $.csv2json = function(csv) {
    var ln = csv.split('\n');
    var result = [];
    var head = ln[0].split('|');

    for (var i = 1; i < ln.length; i++) {
      var obj = {};
      var cur = ln[i].split('|');

      for (var j = 0; j < head.length; j++) {
        obj[head[j]] = cur[j];
      }

      result.push(obj);
    }

    return result;
  };

}(window.$ = {}));
