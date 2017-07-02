//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-utils”.
//
//     “wink-utils” is free software: you can redistribute it
//     and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-utils” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-utils”.
//     If not, see <http://www.gnu.org/licenses/>.

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
 * @param {number} successCount — observed count of successes out of
 * @param {number} totalCount — the total count.
 * @param {number} [zscore=1.645] — for the required level of CI.
 * @return {object} — containing `probability`, `min` and `max`.
 *
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
