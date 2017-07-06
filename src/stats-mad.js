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
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {(string|number|function)} [accessor=undefined] — Useful when each element of
 * `sortedData` is an object or an array instead of number. If it is an object
 * then it should be the key (string) to access the value; or if it is an array
 * then it should be the index (number) to access the value; or it should be a function
 * that extracts the value from the element passed to it.
 * @returns {number} — median of the `sortedData`.
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
