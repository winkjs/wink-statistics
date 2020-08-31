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
var varianceXn = require( './data-varianceXn.js' );

// ### stdev
/**
 *
 * Comuptes the sample standard deviation of numbers contained in the `x` array.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * @memberof data
 * @param {array} x array containing 1 or more elements.
 * @param {(string|number|function)} [accessor=undefined] required when elements of
 * `x` are objects or arrays instead of numbers.
 * For objects, use key (string) to access the value; in case of arrays, use
 * index (number) to access the value; or it could be a function
 * that extracts the value from the element passed to it.
 * @return {number} standard deviation of sample.
 * @example
 * stdev( [ 2, 3, 5, 7 ] )
 * // returns 2.217355782608345
 * stdev( [ { x: 2 }, { x: 3 }, { x: 5 }, { x: 7 } ], 'x' )
 * // returns 2.217355782608345
 */
var stdev = function ( x, accessor ) {
  var vXn = varianceXn( x, accessor );
  return ( vXn.size > 1 ) ? Math.sqrt( vXn.varianceXn / ( vXn.size - 1 ) ) : 0;
}; // stdev()

module.exports = stdev;
