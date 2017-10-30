/*!
 * justified <https://github.com/jonschlinkert/justified>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var repeat = require('repeat-string');
var longest = require('longest');
var wrap = require('word-wrap');
var lastRandomIndex = 0;

module.exports = function(str, options) {
  var opts = Object.assign({random: random, width: 55}, options);
  lastRandomIndex = 0;

  str = wrap(str, opts);
  var indent = opts.indent ? repeat(' ', opts.indent) : '';
  var lines = str.split(/\r?\n/);
  var longestLength = longest(lines).length;
  var max = Math.min(opts.width, longestLength);
  var len = lines.length;
  var res = '';

  for (var i = 0; i < len; i++) {
    var line = lines[i].trim();
    var justify = i !== len - 1 || opts.justifyLastLine === true;
    if (i === len - 1 && typeof opts.justifyLastLine === 'function') {
      justify = opts.justifyLastLine(line, max);
    }
    if (justify) {
      line = toMaxLength(line, max, opts);
    }
    res += indent + line + '\n';
  }
  return res;
};

function toMaxLength(str, max, opts) {
  var len = str.length;
  var diff = max - len;
  var words = str.split(' ');

  var n = words.length;
  while (diff-- > 0) {
    words[opts.random(n - 2)] += ' ';
  }

  return words.join(' ').trim();
}

/**
 * Default randomization logic. The main point of this is to
 * have enough of an appearance of randomization to ensure
 * that whitespace isn't aligned in columns on the left or right
 * side of the text, whilst also making the result technically
 * predictable so that you're not getting a different result
 * every time you call the "justified" function.
 */

function random(max) {
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

  var multiplier = randomTable[lastRandomIndex % randomTable.length];

  // halt index when it hits 1000, no need to let it grow
  if (lastRandomIndex > 1000) {
    lastRandomIndex = 0;
  } else {
    lastRandomIndex++;
  }

  return Math.floor(multiplier * (max + 1));
}
