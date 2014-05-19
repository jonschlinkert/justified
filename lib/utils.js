/*!
 * word-wrap <https://github.com/jonschlinkert/word-wrap>
 *
 * Copyright (c) 2014, Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

var repeat = require('repeat-string');
var _ = require('lodash');


// Wrap the text to the specified length
var wrap = exports.wrap = require('word-wrap');

// Utility method for adding numbers in an array
var sumArray = exports.sumArray = function(arr) {
  return arr.reduce(function(a, b) {
    return a + b;
  });
};

// Split the newly wrapped lines
var lineArray = exports.lineArray = function(str) {
  return wrap(str).split('\n')
};

// Split the text into an array of words
var wordArray = exports.wordArray = function (str) {
  return str.split(/[\s]+/).filter(Boolean);
  // return str.split(/\s/).filter(Boolean);
};

// Count the characters in a line
var countChars = exports.countChars = function (str) {
  return str.replace(/^\s+/, '').length;
};
var lineLength = countChars;

// Count the words in a line
var countWords = exports.countWords = function (str) {
  return wordArray(str).length;
};

// Count the spaces in a line
var countSpaces = exports.countSpaces = function (str) {
  return countWords(str) - 1;
};

// Total number of lines
var totalLines = exports.totalLines = function(lines) {
  return lines.length;
};

// Sum of all characters from all lines
var totalChars = exports.totalChars = function(lines) {
  return sumArray(lines.map(countChars));
};

// Sum of all words from all lines
var totalWords = exports.totalWords = function(lines) {
  return sumArray(lines.map(countWords));
};

// Sum of all whitespaces from all lines
var totalSpaces = exports.totalSpaces = function(lines) {
  return sumArray(lines.map(countSpaces));
};

// Average number of characters per line
var avgChars = exports.avgChars = function(lines) {
  return totalChars(lines) / lines.length;
};

// Average number of spaces per line
var avgSpaces = exports.avgSpaces = function(lines) {
  return totalSpaces(lines) / lines.length;
};

// Average number of words per line
var avgWords = exports.avgWords = function(lines) {
  return totalWords(lines) / lines.length;
};

var avgLength = exports.avgLength = function(lines) {
  return totalChars(lines) / totalLines(lines);
};

// Floored averaged number of spaces per line
var floorSpaces = exports.floorSpaces = function(lines) {
  return Math.floor(avgSpaces(lines));
};

// Return the length of the longest line
var charsLongest = exports.charsLongest = function(lines) {
  return _.last(lines.map(countChars).sort());
};

// Return the length of the shortest line
var charsShortest = exports.charsShortest = function(lines) {
  return _.first(lines.map(countChars).sort());
};

var charsDelta = exports.charsDelta = function(longest, line) {
  return longest - countChars(line);
};

// Return the difference in length between longest and shortest
var lengthDiff = exports.lengthDiff = function(lines) {
  return charsLongest(lines) - charsShortest(lines);
};

var justify = exports.justify = function(avg, line, ratio) {
  ratio = Number(ratio || 0.66);
  return Math.floor(avg * ratio) <= lineLength(line);
};

var spacesNeeded = exports.spacesNeeded = function(longest, line) {
  var delta = charsDelta(longest, line);
  var spaces = countSpaces(line);
  return Math.ceil(delta / spaces);
};

var filler = exports.filler = function(longest, line) {
  var spacesToAdd = spacesNeeded(longest, line);
  spacesToAdd = spacesToAdd > 1 ? spacesToAdd : 1;
  return repeat(' ', spacesToAdd);
};

var justified = exports.justified = function(longest, line) {
  return wordArray(line).join(filler(longest, line))
};