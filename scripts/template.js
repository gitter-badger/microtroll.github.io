(function(tmpl) {
  'use strict';

  var re = /<%(.+?)%>/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = 'var r=[];\n',
    cursor = 0,
    match;

  var compile = function(line, js) {
    js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
      (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
    return compile;
  };

  tmpl.render = function(html, data) {
    while (match = re.exec(html)) {
      compile(html.slice(cursor, match.index))(match[1], true);
      cursor = match.index + match[0].length;
    }

    compile(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
  };

}(window.tmpl = {}));
