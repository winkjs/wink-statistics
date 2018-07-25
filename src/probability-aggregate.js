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

// ## probability

// ### aggregate
/**
 *
 * Aggregates two probability estimates from independent sources about the occurrence of
 * a **single** event **a**. It returns the aggregated probability of occurrence
 * of the event **a**. The assumption here is that the two probabilities
 * (estimates) are not correlated with each other and the **common prior**
 * probability of **a** is **0.5**.
 *
 * For a detailed explanation, refer to the paper titled
 * *[Bayesian Group Belief by Franz Dietrich](http://link.springer.com/article/10.1007/s00355-010-0453-x)*
 * published in Social Choice and Welfare October 2010, Volume 35, Issue 4, pp 595–626.
 *
 * @name probability.aggregate
 * @param {number} pa1 — first estimate of probability of occurrence of event **a**.
 * @param {number} pa2 — second estimate of probability of occurrence of event **a**.
 * @return {number} the aggregated probability.
 * @example
 * aggregate( 0.5, 0.6 );
 * // returns 0.6
 * aggregate( 0.5, 0.4 );
 * // returns 0.4
 * aggregate( 0.6, 0.6 );
 * // returns 0.6923076923076923
 * aggregate( 0.4, 0.6 );
 * // returns 0.5
 */
var aggregate = function ( pa1, pa2 ) {
  if ( ( typeof pa1 !== 'number' ) || ( pa1 < 0 ) || ( pa1 > 1 ) ) {
    throw Error( 'probability-aggregate: pa1 should be a number between 0 & 1, instead found: ' + JSON.stringify( pa1 ) );
  }
  if ( ( typeof pa2 !== 'number' ) || ( pa2 < 0 ) || ( pa2 > 1 ) ) {
    throw Error( 'probability-aggregate: pa2 should be a number between 0 & 1, instead found: ' + JSON.stringify( pa2 ) );
  }
  return ( ( pa1 * pa2 ) / ( ( pa1 * pa2 ) + ( ( 1 - pa1 ) * ( 1 - pa2 ) ) ) );
}; // aggregate()

module.exports = aggregate;
