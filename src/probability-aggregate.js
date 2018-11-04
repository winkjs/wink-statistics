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
 * @memberof probability
 * @param {number} pa1 first estimate of probability of occurrence of event **a**.
 * @param {number} pa2 second estimate of probability of occurrence of event **a**.
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
