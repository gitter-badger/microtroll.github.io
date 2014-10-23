(function() {
  'use strict';

  // get repos
  var getRepos = (function() {
    $.ajax({
      url: 'https://api.github.com/users/microtroll/repos?access_token=cf06312c14fbd9071f6806902db094032afcdd70',
      method: 'GET',
      success: function(resp) {
        var html = '';
        var repos = JSON.parse(resp);

        repos.forEach(function(repo) {
          if (repo.name !== 'microtroll.github.io') {
            html += '<li><a href="' + repo.html_url + '">' + repo.name + '</a></li>';
          }
        });

        $.id('repos').innerHTML = html;
        $.fadeIn($.id('repos'));
      },
      error: function() {
        $.id('repos').innerHTML = '';
      }
    });
  }).call(this);

  // get posts
  function getPosts() {
    $.ajax({
      url: 'public/posts.csv',
      method: 'GET',
      success: function(resp) {
        $.id('posts').innerHTML = tmpl.render($.id('tmpl').innerHTML, {
          entry: $.csv2json(resp)
        });
      },
      error: function() {
        $.id('content').innerHTML = 'Could not load posts...';
      }
    });
  }

  // load view
  var navigate = function() {
    $.fadeOut($.id('content'));

    var pathname = route.parse().hash;

    if (pathname.indexOf('#/') !== -1) {
      pathname = pathname.replace('#/', '');
    }

    // home page
    if (pathname === '' || pathname === 'posts') {
      pathname = 'posts';
    }

    $.ajax({
      url: '/views/' + pathname + '.html',
      method: 'GET',
      success: function(resp) {
        $.id('content').innerHTML = resp;
        $.fadeIn($.id('content'));
      },
      error: function() {
        $.id('content').innerHTML = 'Could not load view...';
      }
    });

    if (pathname === 'posts') {
      getPosts();
    }
  };

  // init
  window.addEventListener('hashchange', navigate);
  window.addEventListener('load', navigate);
  window.addEventListener('popstate', navigate);

})(tmpl, route, $);
