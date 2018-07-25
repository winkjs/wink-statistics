//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
//
//     This file is part of “wink-statistics”.
//
//     “wink-statistics” is free software: you can redistribute it
//     and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-statistics” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-statistics”.
//     If not, see <http://www.gnu.org/licenses/>.

// ## streaming

// Load accessor.
var value = require( './accessor.js' );
// Load wink helpers for validation.
var helpers = require( 'wink-helpers' );

// ### varianceXn
/**
 *
 * @private
 * Comuptes the population `variance * size` of numbers contained in the `x` array.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * @param {array} x — array containing 1 or more elements.
 * @param {(string|number|function)} [accessor=undefined] — required when elements of
 * `x` are objects or arrays instead of numbers.
 * For objects, use key (string) to access the value; in case of arrays, use
 * index (number) to access the value; or it could be a function
 * that extracts the value from the element passed to it.
 * @return {object} containing `varianceXn` and `size`.
 *
 * @example
 * varianceXN( [ 2, 3, 5, 7 ] );
 * // returns { varianceXn: 14.749999999999998, size: 4 }
 */
var varianceXn = function ( x, accessor ) {
  var mean = 0;
  var varianceXn1 = 0;
  var prevMean;
  var i, imax, xi;
  var obj = Object.create( null );

  if ( !helpers.array.isArray( x ) || !x.length ) {
    throw Error( 'stats-variance: x should be an array of length > 0, instead found: ' + JSON.stringify( x ) );
  }

  for ( i = 0, imax = x.length; i < imax; i += 1 ) {
    xi = value( x[ i ], accessor );
    prevMean = mean;
    mean += ( xi - mean ) / ( i + 1 );
    varianceXn1 += ( xi - prevMean ) * ( xi - mean );
  }

  obj.varianceXn = varianceXn1;
  obj.size = imax;
  return obj;
}; // varianceXn()

module.exports = varianceXn;
