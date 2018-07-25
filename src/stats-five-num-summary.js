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
// Load percentile.
var percentile = require( './stats-percentile.js' );


// ### fiveNumSummary
/**
 *
 * Returns the [five number summary](https://en.wikipedia.org/wiki/Five-number_summary) from the `sortedData`.
 *
 * @name stats.fiveNumSummary
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {(string|number|function)} [accessor=undefined] — required when elements of
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
