'use strict';

/*!
 * justified <https://github.com/jonschlinkert/justified>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Licensed under the MIT License.
 */

require('mocha');
var assert = require('assert');
var justify = require('./');

var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('justified', function() {
  describe('default settings', function() {
    it('should justify text using default settings', function() {
      assert.equal(justify(text), [
        'Lorem  ipsum dolor  sit   amet, consectetur  adipiscing',
        'elit,  sed do eiusmod  tempor incididunt  ut  labore et',
        'dolore  magna  aliqua.  Ut  enim ad minim  veniam, quis',
        'nostrud exercitation ullamco laboris nisi ut aliquip ex',
        'ea  commodo consequat.  Duis    aute  irure    dolor in',
        'reprehenderit in voluptate  velit esse cillum dolore eu',
        'fugiat    nulla  pariatur.    Excepteur  sint  occaecat',
        'cupidatat  non proident,    sunt in culpa   qui officia',
        'deserunt mollit anim id est laborum.',
        ''
      ].join('\n'));
    });
  });

  describe('options.width', function() {
    it('should justify text to the specified width', function() {
      assert.equal(justify(text.slice(0, 26), {width: 15}), [
        'Lorem     ipsum',
        'dolor sit amet',
        ''
      ].join('\n'));

      assert.equal(justify(text.slice(0, 50), {width: 12}), [
        'Lorem  ipsum',
        'dolor    sit',
        'amet,',
        'consectetur',
        'adipiscing',
        ''
      ].join('\n'));

      assert.equal(justify(text.slice(0, 50), {width: 30}), [
        'Lorem  ipsum  dolor  sit amet,',
        'consectetur adipiscing',
        ''
      ].join('\n'));

      assert.equal(justify(text.slice(0, 75), {width: 30}), [
        'Lorem  ipsum  dolor  sit amet,',
        'consectetur adipiscing   elit,',
        'sed do eiusmod tem',
        ''
      ].join('\n'));

      assert.equal(justify(text.slice(0, 150), {width: 30}), [
        'Lorem  ipsum  dolor  sit amet,',
        'consectetur adipiscing   elit,',
        'sed     do    eiusmod   tempor',
        'incididunt ut labore et dolore',
        'magna aliqua. Ut enim ad minim',
        'veniam, q',
        ''
      ].join('\n'));

      assert.equal(justify(text.slice(0, 150), {width: 40}), [
        'Lorem  ipsum dolor sit amet, consectetur',
        'adipiscing elit, sed   do eiusmod tempor',
        'incididunt  ut labore  et  dolore  magna',
        'aliqua. Ut enim ad minim veniam, q',
        ''
      ].join('\n'));
    });
  });

  describe('options.justifyLastLine', function() {
    it('should force the last line to be justified', function() {
      assert.equal(justify(text.slice(0, 150), {width: 30, justifyLastLine: true}), [
        'Lorem  ipsum  dolor  sit amet,',
        'consectetur adipiscing   elit,',
        'sed     do    eiusmod   tempor',
        'incididunt ut labore et dolore',
        'magna aliqua. Ut enim ad minim',
        'veniam,                      q',
        ''
      ].join('\n'));
    });

    it('should allow justifyLastLine to be a function', function() {
      function justifyLastLine(line, maxWidth) {
        return line.length > (maxWidth / 2);
      }
      var opts = {width: 30, justifyLastLine: justifyLastLine};
      assert.equal(justify(text.slice(0, 150), opts), [
        'Lorem  ipsum  dolor  sit amet,',
        'consectetur adipiscing   elit,',
        'sed     do    eiusmod   tempor',
        'incididunt ut labore et dolore',
        'magna aliqua. Ut enim ad minim',
        'veniam, q',
        ''
      ].join('\n'));
    });

    it('should allow justifyLastLine to be a function', function() {
      function justifyLastLine(line, maxWidth) {
        return line.length > 5;
      }
      var opts = {width: 30, justifyLastLine: justifyLastLine};
      assert.equal(justify(text.slice(0, 150), opts), [
        'Lorem  ipsum  dolor  sit amet,',
        'consectetur adipiscing   elit,',
        'sed     do    eiusmod   tempor',
        'incididunt ut labore et dolore',
        'magna aliqua. Ut enim ad minim',
        'veniam,                      q',
        ''
      ].join('\n'));
    });
  });

  describe('options.indent', function() {
    it('should indent text the specified number of spaces', function() {
      assert.equal(justify(text, {indent: 4}), [
        '    Lorem  ipsum dolor  sit   amet, consectetur  adipiscing',
        '    elit,  sed do eiusmod  tempor incididunt  ut  labore et',
        '    dolore  magna  aliqua.  Ut  enim ad minim  veniam, quis',
        '    nostrud exercitation ullamco laboris nisi ut aliquip ex',
        '    ea  commodo consequat.  Duis    aute  irure    dolor in',
        '    reprehenderit in voluptate  velit esse cillum dolore eu',
        '    fugiat    nulla  pariatur.    Excepteur  sint  occaecat',
        '    cupidatat  non proident,    sunt in culpa   qui officia',
        '    deserunt mollit anim id est laborum.',
        ''
      ].join('\n'));
    });
  });

  describe('options.random', function() {
    it('should use a custom random function', function() {
      function random(max) {
        return Math.floor(Math.random() * (max + 1));
      }

      var res = justify(text, {random: random});

      // this will be randomly, by very infrequently, wrong :)
      assert(res !== justify(text));

      var lines = res.trim().split('\n');
      lines.slice(0, -1).forEach(function(line, i) {
        assert.equal(line.length, 55);
      });
    });
  });
});
