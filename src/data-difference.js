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

// Load wink helpers for validation.
var helpers = require( 'wink-helpers' );

// ### Percentile

/**
 * Computes the difference between each n<sup>th</sup> successive element of the
 * input `data` array. The default value for n is `1`.
 *
 * @memberof data
 * @param  {number[]} data    input data array.
 * @param  {number}   [n=1]   defines the lag at which successive difference is computed.
 * @return {number[]}         array containing the differences; it will be empty
 *                            if lag =< data's length.
 * @example
 * difference( [ 1, 3, 5, 5, 9, 11, 11 ] );
 * // returns [ 2, 2, 0, 4, 2, 0 ]
 * difference( [ 1, 2, 4, 8, 16, 32, 64 ], 2 );
 * // returns [ 3, 6, 12, 24, 48 ]
 */
var difference = function ( data, n = 1 ) {
  if ( !helpers.validate.isArray( data ) || !data.length ) {
    throw Error( `data-difference: data should be an array of length > 0, instead found: ${typeof data}` );
  }

  if ( !helpers.validate.isFiniteInteger( n ) || n <= 0  ) {
    throw Error( `data-difference: lag should be an integer > 0, instead found: ${typeof n} of value ${n}` );
  }

  var size = data.length;
  var diffData = [];

  for ( let t = size - 1; t >= n; t -= 1 ) {
    diffData[ t - n ] = ( data[ t ] - data[ t - n ] );
  }
  return diffData;
}; // difference()

module.exports = difference;
