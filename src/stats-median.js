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


// ### median
/**
 *
 * Returns the median of the `sortedData`.
 *
 * @name stats.median
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {(string|number|function)} [accessor=undefined] — Useful when each element of
 * `sortedData` is an object or an array instead of number. If it is an object
 * then it should be the key (string) to access the value; or if it is an array
 * then it should be the index (number) to access the value; or it should be a function
 * that extracts the value from the element passed to it.
 * @returns {number} median of the `sortedData`.
 * @example
 * median( [ 1, 1, 2, 2, 3, 3, 4, 4 ] );
 * // returns 2.5
*/
var median = function ( sortedData, accessor ) {
  return ( percentile( sortedData, 0.50, accessor ) );
}; // median()

module.exports = median;
