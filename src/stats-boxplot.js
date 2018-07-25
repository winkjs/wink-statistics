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

// Load five number summary.
var fiveNumSummary = require( './stats-five-num-summary.js' );
// Load accessor.
var value = require( './accessor.js' );

// ### Boxplot

/**
 *
 * Performs complete [boxplot](https://en.wikipedia.org/wiki/Box_plot) analysis
 * including computation of notches and outliers.
 *
 * @name stats.boxplot
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {number} [coeff=1.5] — used for outliers computation.
 * @param {(string|number|function)} [accessor=undefined] — required when elements of
 * `sortedData` are objects or arrays instead of numbers.
 * For objects, use key (string) to access the value; in case of arrays, use
 * index (number) to access the value; or it could be a function
 * that extracts the value from the element passed to it.
 * @returns {object} consisting of `min`, `q1`, `median`, `q3`,
 * `max`, `iqr`, `range`, `size` along with `leftNotch`, and `rightNotch`.
 * The `leftOutliers/rightOutliers` (object), if present, contains the `count`, `fence`
 * and `begin/end` indexes to `sortedData` for easy extraction of exact values.
 * @example
 * var data = [
 *   -12, 14, 14, 14, 16, 18, 20, 20, 21, 23, 27, 27, 27, 29, 31,
 *   31, 32, 32, 34, 36, 40, 40, 40, 40, 40, 42, 51, 56, 60, 88
 * ];
 * boxplot( data );
 * returns {
 * //   min: -12, q1: 20, median: 31, q3: 40, max: 88,
 * //   iqr: 20, range: 100, size: 30,
 * //   leftOutliers: { begin: 0, end: 0, count: 1, fence: 14 },
 * //   rightOutliers: { begin: 29, end: 29, count: 1, fence: 60 },
 * //   leftNotch: 25.230655727612252,
 * //   rightNotch: 36.76934427238775
 * // }
*/
var boxplot = function ( sortedData, coeff, accessor ) {
  var fns = fiveNumSummary( sortedData, accessor );
  var coef = Math.abs( coeff || 1.5 );
  var i;
  var iqrXcoef = fns.iqr * coef;
  var leftFence = fns.q1 - iqrXcoef;
  var leftOutliers, rightOutliers;
  var rightFence = fns.q3 + iqrXcoef;

  var ci = ( 1.58 * fns.iqr ) / ( Math.sqrt( fns.size ) );
  // Compute outliers only and only if `iqrXcoef` is greater than `0`, because
  // with `iqrXcoef` as `0`, fences will become `q1` and `q3` respectively!
  if ( iqrXcoef > 0 ) {
    // Compute Left outliers, if any.
    for ( i = 0; value( sortedData[ i ], accessor ) < leftFence; i += 1 ) ;
    leftOutliers = { begin: 0, end: ( i - 1 ), count: i, fence: value( sortedData[ i ], accessor ) };
    // Compute right outliers, if any.
    for ( i = fns.size - 1; value( sortedData[ i ], accessor ) > rightFence; i -= 1 ) ;
    rightOutliers = { begin: ( i + 1 ), end: ( fns.size - 1 ), count: ( fns.size - i - 1 ), fence: value( sortedData[ i ], accessor ) };
    // Add left and/or right outliers to `rs`.
    if ( leftOutliers.count ) fns.leftOutliers = leftOutliers;
    if ( rightOutliers.count ) fns.rightOutliers = rightOutliers;
  }
  // Add notches.
  fns.leftNotch = fns.median - ci;
  fns.rightNotch = fns.median + ci;
  return ( fns );
}; // boxplot()

module.exports = boxplot;
