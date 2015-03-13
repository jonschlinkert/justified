/*!
 * justified <https://github.com/jonschlinkert/justified>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var repeat = require('repeat-string');
var longest = require('longest');
var wrap = require('word-wrap');

module.exports = justify;

function justify (str, opts) {
  opts = opts || {};
  str = wrap(str, opts);
  var indent = repeat(' ', opts.indent || 2);
  var lines = str.split(/[\r\n]/);
  var max = longest(lines).length;
  var len = lines.length, i = 0;
  var res = '';

  while (len--) {
    var line = trueUp(lines[i++].trim(), max) + '\n';
    if (len === 0) {
      line = line.split(' ').filter(Boolean).join(' ');
    }
    res += indent + line;
  }
  return res;
}

function trueUp(str, max) {
  var len = str.length;
  var diff = max - len;
  var segs = str.split(' ');

  while (diff--) {
    segs[random(0, segs.length - 2)] += ' ';
  }

  var res = segs.join(' ').trim();
  len = res.length;
  diff = max - len;

  if (diff > 0) {
    var i = res.indexOf(' ', 1);
    res = res.slice(0, i) + ' ' + res.slice(i);
  }
  return res;
}

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
