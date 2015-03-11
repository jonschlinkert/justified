/*!
 * justify <https://github.com/jonschlinkert/justify>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var expect = require('chai').expect;
var justified = require('../');
var utils = require('../lib/utils');

var text = 'A project without documentation is like a project that doesn\'t exist. Verb solves this by making it dead simple to generate project documentation, using simple markdown templates, with zero configuration required.';

// describe('when foo is passed:', function () {
//   it('should convert foo to bar.', function () {
//     var fixture = 'foo';
//     var actual = 'bar';
//     var expected = 'bar';
//     expect(justified(actual)).to.eql(expected);
//   });
// });



// var obj = JSON.stringify(justified(text), null, 2);
// console.log(obj);


var result = justified(text);
console.log(result)

