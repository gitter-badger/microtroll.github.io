(function () {
  'use strict';

  // load blog posts
  var loadArticles = function(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
      $.id('posts').innerHTML = tmpl.render($.id('tmpl').innerHTML, JSON.parse(this.response));
    };
    request.onerror = function () {
      $.id('content').innerHTML = 'Could not load posts...';
    };
    request.send();
  };

  // load view
  var navigate = function() {
    var pathname = route.parse().hash;

    if (pathname.indexOf('#/') !== -1) {
      pathname = pathname.replace('#/', '');
    }

    if (pathname === '') {
      pathname = 'posts';
      loadArticles('https://spreadsheets.google.com/feeds/list/13KlXP8NZ7f_g8y-uVOGzo65WIy3pggwod3LFXA75Tew/od6/public/basic?hl=en_US&alt=json');
    }

    pathname = '/views/' + pathname + '.html';

    var request = new XMLHttpRequest();
    request.open('GET', pathname, true);
    request.onload = function () {
      $.id('content').innerHTML = this.response;
      $.fadeIn($.id('content'));
    };
    request.onerror = function () {
      $.id('content').innerHTML = 'Could not load view...';
    };
    request.send();
  };

  // get repos
  var loadRepos = function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users/microtroll/repos?access_token=cf06312c14fbd9071f6806902db094032afcdd70', true);
    request.onload = function () {
      var html = '';
      var resp = JSON.parse(this.response);

      for(var i in resp) {
        html += '<li><a href="' + resp[i].html_url + '">' + resp[i].name + '</a></li>';
      }

      $.id('repos').innerHTML = html;
      $.fadeIn($.id('repos'));
    };
    request.onerror = function () {
      $.id('repos').innerHTML = '';
    };
    request.send();
  };

  // init
  window.addEventListener('hashchange', navigate);
  window.addEventListener('load', navigate);

  loadRepos();

})(tmpl, route, $);
