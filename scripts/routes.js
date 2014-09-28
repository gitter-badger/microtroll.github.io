(function(route) {
  'use strict';

  // parse the url
  route.parse = function() {
    var url = window.location;

    return {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      hash: url.hash,
      host: url.host,
      search: url.search
    };
  };

  // parse the parameters
  route.search = function(query) {
    var obj = {};
    var str = route.parse().hash;

    str.replace(new RegExp(/([^?=&]+)(=([^&]*))?/g), function($0, $1, $2, $3) {
      obj[$1] = $3;
    });

    return obj[query];
  };

}(window.route = {}));
