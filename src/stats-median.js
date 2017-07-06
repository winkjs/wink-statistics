// ## stats

// Load percentile.
var percentile = require( './stats-percentile.js' );


// ### median
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
 * median( [ 1, 1, 2, 2, 3, 3, 4, 4 ] );
 * // returns 2.5
*/
var median = function ( sortedData, accessor ) {
  return ( percentile( sortedData, 0.50, accessor ) );
}; // median()

module.exports = median;
