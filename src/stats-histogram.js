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
// Load mad.
var mad = require( './stats-mad.js' );


// ### distribution
/**
 *
 * Internal function to compute distribution from `bin` and `binWidth`.
 *
 * @param {number} bins — number of bins as computed by `histogram()`.
 * @param {number} binWidth — width of each bin.
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {object} rs — robust stats containing `min`, `size`, etc.
 * @param {number} precision — of the data.
 * @param {(string|number|function)} [accessor=undefined] — required when elements of
 * `x` are objects or arrays instead of numbers.
 * For objects, use key (string) to access the value; in case of arrays, use
 * index (number) to access the value; or it could be a function
 * that extracts the value from the element passed to it.
 * @returns {object} histogram conatining arrays `classes` and corresponding `frequencies`.
 * Each element of `classes` array is an object having `min/mid/max` values.
 * @private
*/
var distribution = function ( bins, binWidth, sortedData, rs, precision, accessor ) {
  // Helpers.
  var cutoff, i, k, limit, mid, min;
  // Hold x axis and y axis values.
  var x, y;
  // Distribution object.
  var dist = Object.create( null );

  // Find distribution now.
  x = new Array( bins );
  y = new Array( bins );
  cutoff = new Array( bins );
  limit = +( rs.min + binWidth ).toFixed( precision );
  min = +( rs.min ).toFixed( precision );
  for ( i = 0; i < bins; i += 1 ) {
   y[ i ] = 0;
   mid = +( limit - ( binWidth / 2 ) ).toFixed( precision );
   x[ i ] = { min: min, mid: mid, max: limit };
   cutoff[ i ] = limit;
   min = +( min + binWidth).toFixed( precision );
   limit = +( limit + binWidth).toFixed( precision );
  }
  i = 0;
  for ( k = 0; k < bins; k += 1 ) {
    // > REVIEW: Make it faster by deploying binary search approach.
    for ( ; ( ( i < rs.size ) && ( value( sortedData[ i ], accessor ) <= cutoff[ k ] ) ); i += 1 ) {
      y[ k ] += 1;
    }
  }

  dist.classes = x;
  dist.frequencies = y;
  return ( dist );
}; // distribution()


// ### histogram
/**
 *
 * Generates histogram using Freedman–Diaconis method.
 * If both IQR and MAD are `0` then it automatically
 * switches to Sturges' Rule while ensuring minimum of 5 bins.
 * It attempts to reduce excessive sparsity of distribution,
 * if any, by adjusting the number of bins using Sturges' Rule.
 *
 * @name stats.histogram
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {number} [dataPrecision=0] — typically the minumum number of
 * decimal places observed in the `sortedData`.
 * @param {(string|number|function)} [accessor=undefined] — required when elements of
 * `x` are objects or arrays instead of numbers.
 * For objects, use key (string) to access the value; in case of arrays, use
 * index (number) to access the value; or it could be a function
 * that extracts the value from the element passed to it.
 * @returns {object} conatining arrays `classes` and the corresponding `frequencies`.
 * Each element of `classes` array is an object with values for `min/max (class intervals)`
 * and `mid` point of a class. <br/><br/>In addition, the returned object
 * contains useful statistics like `q1`, `q3`, `iqr`, `min`, `max`, and `range`.
 * @example
 * var data = [
 *   12, 14, 14, 14, 16, 18, 20, 20, 21, 23, 27, 27, 27, 29, 31,
 *   31, 32, 32, 34, 36, 40, 40, 40, 40, 40, 42, 51, 56, 60, 65
 * ];
 * histogram( data );
 * // returns {
 * //   classes: [
 * //     { min: 12, mid: 19, max: 25 },
 * //     { min: 25, mid: 32, max: 38 },
 * //     { min: 38, mid: 45, max: 51 },
 * //     { min: 51, mid: 58, max: 64 },
 * //     { min: 64, mid: 71, max: 77 } ],
 * //   frequencies: [ 10, 10, 7, 2, 1 ],
 * //   q1: 20,  q3: 40, iqr: 20, size: 30, min: 12, max: 65,range: 53
 * // }
*/
var histogram = function ( sortedData, dataPrecision, accessor ) {
  var rs = Object.create( null );
  rs.q1 = percentile( sortedData, 0.25, accessor );
  rs.q3 = percentile( sortedData, 0.75, accessor );
  rs.iqr = ( rs.q3 - rs.q1 );
  rs.size = sortedData.length;
  rs.min = value( sortedData[ 0 ], accessor );
  rs.max = value( sortedData[ rs.size - 1 ], accessor );
  rs.range = ( rs.max - rs.min );
  // The histogram.
  var histo;
  // Number of bins.
  var bins;
  // Class interval or bin width.
  var binWidth = rs.iqr;
  // The `precision` is extremely important to get a quality histogram - in terms
  // of number of classes and counting data points in a class interval.
  var precision = Math.round( Math.abs( dataPrecision || 0 ) );
  // Compute `bins` and `binWidth`.
  if ( ( binWidth === 0 ) ) {
    rs.mad = mad( sortedData, accessor );
    binWidth = 2 * rs.mad;
  }

  if ( binWidth > 0 ) {
    // Apply Freedman–Diaconis formula.
    binWidth = 2 * binWidth * Math.pow( rs.size, -( 1 / 3 ) );
    // Adjust `binWidth` according to the `precision`.
    binWidth = +binWidth.toFixed( precision );
    if ( binWidth === 0 ) binWidth = 1;
    bins = Math.ceil( rs.range / binWidth );
    histo = distribution( bins, binWidth, sortedData, rs, precision, accessor );
    // Check how sparse is the distribution - # of 0s > 20% of the total frequencies.
    // If yes then attempt its reduction by using the Sturges' Rule (as above).
    if ( histo.frequencies.filter( function ( e ) { return ( e === 0 ); } ).length > histo.frequencies.length * 0.20 ) { // eslint-disable-line
      // Sparse! Apply Sturge's Rule now.
      bins = Math.max( Math.ceil( Math.log2( rs.size ) + 1 ), 5 );
      binWidth = rs.range /  bins;
      binWidth = +binWidth.toFixed( precision );
      if ( binWidth === 0 ) binWidth = 1;
      bins = Math.ceil( rs.range / binWidth );
      histo = distribution( bins, binWidth, sortedData, rs, precision, accessor );
    }
  } else {
    // Nothing is working out, downgrade to Sturges' Rule, but ensure minimum 5 bins.
    bins = Math.max( Math.ceil( Math.log2( rs.size ) + 1 ), 5 );
    binWidth = rs.range /  bins;
    // Adjust `binWidth` according to `precision` and recompute everything.
    binWidth = +binWidth.toFixed( precision );
    if ( binWidth === 0 ) binWidth = 1;
    bins = Math.ceil( rs.range / binWidth );
    histo = distribution( bins, binWidth, sortedData, rs, precision, accessor );
  }

  return ( Object.assign( histo, rs ) );
}; // histogram()

module.exports = histogram;
