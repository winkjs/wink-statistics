//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
//
//     This file is part of “wink-statistics”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

// ## probability

// ### range4CI
/**
 *
 * Computes probability from the **observed** count of successes (`successCount`) out of the total count (`totalCount`)
 * along with its **range** for required level of Confidence Interval (CI)  i.e. `zscore` .
 * The range is the minimum and maximum probability values for given `zscore` or CI.
 *
 * These computations are based on approach specified in the Wilson's *Notes on
 * Probable Inference, The Law of Succession, and Statistical Inference*
 * published in ASA's Journal.
 *
 * For quick reference, typical value of `zscore` for 90% and 95% CI is approximately
 * 1.645 and 1.960 respectively.
 *
 * @memberof probability
 * @param {number} successCount observed count of successes out of
 * @param {number} totalCount the total count.
 * @param {number} [zscore=1.645] for the required level of CI.
 * @return {object} containing `probability`, `min` and `max`.
 * @example
 * range4CI( 1, 10 );
 * // returns {
 * //   probability: 0.18518871952479238,
 * //   min: 0.02263232984000629,
 * //   max: 0.34774510920957846
 * // }
 * range4CI( 10, 100 );
 * // returns {
 * //   probability: 0.1105389143431459,
 * //   min: 0.06071598345043355,
 * //   max: 0.16036184523585828
 * // }
 */
var range4CI = function ( successCount, totalCount, zscore ) {
  if ( ( typeof successCount !== 'number' ) || ( successCount <= 0 ) ) {
    throw Error( 'probability-range4CI: successCount should be a number > 0, instead found: ' + JSON.stringify( successCount ) );
  }
  if ( ( typeof totalCount !== 'number' ) || ( totalCount <= 0 ) ) {
    throw Error( 'probability-range4CI: totalCount should be a number > 0, instead found: ' + JSON.stringify( totalCount ) );
  }
  if ( totalCount < successCount ) {
    throw Error( 'probability-range4CI: totalCount should be >= successCount, instead found: ' + JSON.stringify( totalCount ) );
  }
  var z = Math.abs( zscore || 1.645 );
  var t = ( z * z ) / totalCount;
  var p0 = successCount / totalCount;
  var q0 = 1 - p0;
  var delta = Math.sqrt( ( p0 * q0 * t ) + ( ( t * t ) / 4 ) );

  var min = ( p0 + ( t / 2 ) - delta ) / ( t + 1 );
  var max = ( p0 + ( t / 2 ) + delta ) / ( t + 1 );

  return {
    probability: ( p0 + ( t / 2 ) ) / ( t + 1 ),
    min: min,
    max: max
  };
}; // range4CI()

module.exports = range4CI;
