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
      host: url.host
    };
  };

}(window.route = {}));
