//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-statistics”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

// ## data

// Load accessor.
var value = require( './accessor.js' );
// Load percentile.
var percentile = require( './data-percentile.js' );


// ### fiveNumSummary
/**
 *
 * Returns the [five number summary](https://en.wikipedia.org/wiki/Five-number_summary) from the `sortedData`.
 *
 * @memberof data
 * @param {array} sortedData sorted in ascending order of value.
 * @param {(string|number|function)} [accessor=undefined] required when elements of
 * `x` are objects or arrays instead of numbers.
 * For objects, use key (string) to access the value; in case of arrays, use
 * index (number) to access the value; or it could be a function
 * that extracts the value from the element passed to it.
 * @returns {number} 5-number summary consisting of `min`, `q1`, `median`, `q3`,
 * `max` along with `iqr`, `range`, and `size`.
 * @example
 * fiveNumSummary( [ 1, 1, 2, 2, 3, 3, 4, 4 ] );
 * // returns {
 * //   q1: 1.25, median: 2.5, q3: 3.75, iqr: 2.5,
 * //   size: 8, min: 1, max: 4, range: 3
 * // }
*/
var fiveNumSummary = function ( sortedData, accessor ) {
  var fns = Object.create( null );
  fns.q1 = percentile( sortedData, 0.25, accessor );
  fns.median = percentile( sortedData, 0.50, accessor );
  fns.q3 = percentile( sortedData, 0.75, accessor );
  fns.iqr = fns.q3 - fns.q1;
  fns.size = sortedData.length;
  fns.min = value( sortedData[ 0 ], accessor );
  fns.max = value( sortedData[ fns.size - 1 ], accessor );
  fns.range = fns.max - fns.min;

  return ( fns );
}; // fiveNumSummary()

module.exports = fiveNumSummary;
