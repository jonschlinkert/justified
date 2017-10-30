/*!
 * justified <https://github.com/jonschlinkert/justified>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var repeat = require('repeat-string');
var longest = require('longest');
var wrap = require('word-wrap');

var randomTable = [
  0.14975434898516649,
  0.48920102670502064,
  0.5460856891554375,
  0.843156677246687,
  0.5339584048702419,
  0.6557222579529927,
  0.025277961886063904,
  0.7906919328816282,
  0.39547316726978843,
  0.8046447313481258,
  0.40539968121122616,
  0.3240593946801942,
  0.04700841115323562
];

var lastUsedRandom = 0;

function pseudoRandom() {
  var ret = randomTable[lastUsedRandom % randomTable.length];
  lastUsedRandom = lastUsedRandom > 1000 ? 0 : lastUsedRandom + 1;
  return ret;
}
module.exports = justify;

function justify (str, opts) {
  lastUsedRandom = 0;
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
  return min + Math.floor(pseudoRandom() * (max - min + 1));
}
