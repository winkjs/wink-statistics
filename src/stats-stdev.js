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

// ## stats

// Load accessor.
var varianceXn = require( './stats-varianceXn.js' );

// ### stdev
/**
 *
 * Comuptes the sample standard deviation of numbers contained in the `x` array.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * @name stats.stdev
 * @param {array} x — array containing 1 or more elements.
 * @param {(string|number|function)} [accessor=undefined] — required when elements of
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
