// ## stats

// Load accessor.
var value = require( './accessor.js' );
// Load wink helpers for validation.
var helpers = require( 'wink-helpers' );

// ### Percentile
/**
 *
 * Returns the `q`<sup>th</sup> percentile from the `sortedData`. The computation is
 * based on Method 11 described in [Quartiles in Elementary Statistics](https://ww2.amstat.org/publications/jse/v14n3/langford.html)
 * by Eric Langford published in Journal of Statistics Education Volume 14, Number 3 (2006).
 *
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {number} q — should be between 0 and 1 indicating percentile;
 * for example, to get 25<sup>th</sup> percentile, it should be 0.25.
 * @param {(string|number|function)} [accessor=undefined] — Useful when each element of
 * `sortedData` is an object or an array instead of number. If it is an object
 * then it should be the property-name (string) to access the value; or if it is an array
 * then it should be the index (number) to access the value; or it should be a function
 * that extracts the value from the element passed to it.
 * @returns {number} — `q`<sup>th</sup> percentile of `sortedData`.
 * @example
 * percentile( [ 1, 1, 2, 2, 3, 3, 4, 4 ], 0.25 );
 * // returns 1.25
 * percentile( [ 1, 1, 2, 2, 3, 3, 4, 4 ], 0.75 );
 * // returns 3.75
*/
var percentile = function ( sortedData, q, accessor ) {
  if ( !helpers.array.isArray( sortedData ) || !sortedData.length ) {
    throw Error( 'stats-percentile: sortedData should be an array of length > 0, instead found: ' + ( typeof sortedData ) );
  }
  if ( ( typeof q !== 'number' ) || ( q <= 0 ) || ( q >= 1 ) ) {
    throw Error( 'stats-percentile: q should be a number between 0 & 1, instead found: ' + JSON.stringify( q ) );
  }
  // Temp variables to hold dec and int part of count*quartile respectively;
  // j_1 is `j - 1`.
  var g, j, j_1; // eslint-disable-line
  // Data length - n plus 1.
  var nP1 = sortedData.length + 1;
  // The np1 x quartile - for above computation.
  var nq = nP1 * q;
  // Compute percentile.
  j = Math.floor( nq );
  g = ( nq - j ).toFixed( 2 );
  j_1 = Math.max( 0, ( j - 1 ) ); // eslint-disable-line
  j = Math.min( j, ( sortedData.length - 1 ) );
  return ( ( ( 1 - g ) * value( sortedData[ j_1 ], accessor ) ) + ( g * value( sortedData[ j ], accessor ) ) );
}; // percentile()

module.exports = percentile;
