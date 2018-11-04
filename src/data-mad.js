//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
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

// Load percentile.
var percentile = require( './data-percentile.js' );
// Load accessor.
var value = require( './accessor.js' );
// Load wink helpers for sort helpers.
var helpers = require( 'wink-helpers' );


// ### mad
/**
 *
 * Returns the median of the `sortedData`.
 *
 * @memberof data
 * @param {array} sortedData sorted in ascending order of value.
 * @param {(string|number|function)} [accessor=undefined] required when elements of
 * `x` are objects or arrays instead of numbers.
 * For objects, use key (string) to access the value; in case of arrays, use
 * index (number) to access the value; or it could be a function
 * that extracts the value from the element passed to it.
 * @returns {number} median of the `sortedData`.
 * @example
 * mad( [ 1, 1, 2, 2, 3, 3, 4, 4 ] );
 * // returns 1
*/
var mad = function ( sortedData, accessor ) {
  var median = percentile( sortedData, 0.5, accessor );
  // Absolute Difference From Median.
  var adfm = new Array( sortedData.length );
  var di;
  for ( var i = 0, imax = sortedData.length; i < imax; i += 1 ) {
      di = value( sortedData[ i ], accessor );
      adfm[ i ] = Math.abs( di - median );
  }
  adfm.sort( helpers.array.ascending );
  // Compute mad from the median of adfm now and return the same. Note, no accessor
  // is required for `adfm`.
  return ( percentile( adfm, 0.50 ) );
}; // mad()

module.exports = mad;
