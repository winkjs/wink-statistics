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
var value = require( './accessor.js' );
// Load wink helpers for validation.
var helpers = require( 'wink-helpers' );

// ### max
/**
 *
 * Finds the maximum value in the `x` array.
 *
 * @name stats.max
 * @param {array} x — array containing 1 or more elements.
 * @param {(string|number|function)} [accessor=undefined] — required when elements of
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
    throw Error( 'stats-max: x should be an array of length > 0, instead found: ' + JSON.stringify( x ) );
  }

  for ( var i = 0, imax = x.length; i < imax; i += 1 ) {
    xi = value( x[ i ], accessor );
    maximum = ( maximum < xi ) ? xi : maximum;
  }

  return maximum;
}; // max()

module.exports = max;
