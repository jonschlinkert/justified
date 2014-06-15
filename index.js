/*!
 * justify <https://github.com/jonschlinkert/justify>
 *
 * Copyright (c) 2014, Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */


var repeat = require('repeat-string');
var randomize = require('randomatic');
var _ = require('lodash');
var utils = require('./lib/utils');

var replaceAt = function(options) {
  options = options || {};

  var pattern = options.pattern;
  var replacement = options.replacement;
  var str = options.str;
  var num = options.num;

  var i = 0;
  return str.replace(pattern, function (match) {
    i++;
    return new RegExp(num).test(i) ? replacement : match;
  });
};

function trueUp(line, longest) {
  var diff = longest - line.length - 1;
  var indices = String(randomize('0', diff)).split('');
  if (indices.length) {
    var re = indices.join('|');
    var opts = {
      pattern: / /g,
      replacement: '  ',
      str: line,
      num: '^' + re + '$'
    };
    line = replaceAt(opts);
  }
  return line;
}

module.exports = function justify(str, width) {
  var arr = utils.lineArray(str, width);
  var longest = utils.charsLongest(arr);
  var last = arr.length - 1;
  var stack = [];

  arr.forEach(function(line, i) {
    line = utils.justified(longest, line).replace(/\s+$/, '');
    if(longest > line.length) {
      line = trueUp(line, longest);
    }

    if (i === last) {
      line = line.replace(/\s+/, ' ');
    }
    stack = stack.concat(line);
  });
  return stack.join('\n');
};