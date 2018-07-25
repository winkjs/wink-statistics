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

// Load percentile.
var percentile = require( './stats-percentile.js' );
// Load accessor.
var value = require( './accessor.js' );
// Load wink helpers for sort helpers.
var helpers = require( 'wink-helpers' );


// ### mad
/**
 *
 * Returns the median of the `sortedData`.
 *
 * @name stats.mad
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {(string|number|function)} [accessor=undefined] — required when elements of
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
