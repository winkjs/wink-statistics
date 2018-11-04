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

// Load accessor.
var value = require( './accessor.js' );
// Load wink helpers for validation.
var helpers = require( 'wink-helpers' );

// ### max
/**
 *
 * Finds the maximum value in the `x` array.
 *
 * @memberof data
 * @param {array} x array containing 1 or more elements.
 * @param {(string|number|function)} [accessor=undefined] required when elements of
 * `x` are objects or arrays instead of numbers.
 * For objects, use key (string) to access the value; in case of arrays, use
 * index (number) to access the value; or it could be a function
 * that extracts the value from the element passed to it.
 * @return {object} maximum value from array `x`.
 * @example
 * max( [ 99, 1, -1, +222, 0, -99 ] )
 * // returns 222
 * max( [ { x: 33 }, { x: 11 }, { x:44 } ], 'x' )
 * // returns 44
 */
var max = function ( x, accessor ) {
  var maximum = -Infinity;
  var xi;

  if ( !helpers.array.isArray( x ) || !x.length ) {
    throw Error( 'data-max: x should be an array of length > 0, instead found: ' + JSON.stringify( x ) );
  }

  for ( var i = 0, imax = x.length; i < imax; i += 1 ) {
    xi = value( x[ i ], accessor );
    maximum = ( maximum < xi ) ? xi : maximum;
  }

  return maximum;
}; // max()

module.exports = max;
