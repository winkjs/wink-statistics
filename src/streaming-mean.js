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

// ## streaming

// ### mean
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, and `reset()` functions.
 * Use `compute()` to continuously determine the **mean** value of data items passed to it in real-time.
 * Probe the mean anytime using `result()`, which may be reset via `reset()`. The `result()` returns
 * an object containing `mean` along with `size` of data. The computations are carried out using method pioneered
 * by B. P. Welford.
 *
 * @return {object} — containing `compute`, `result`, and `reset` functions.

 *
 * @example
 * var avg = mean();
 * avg.compute( 2 );
 * avg.compute( 3 );
 * avg.compute( 5 );
 * avg.compute( 7 );
 * avg.result();
 * // returns { n: 4, mean: 4.25 }
 */
var mean = function () {
  var mean1 = 0;
  var items = 0;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    items += 1;
    mean1 += ( di - mean1 ) / items;
    return undefined;
  }; // compute()

  methods.result = function () {
    return { size: items, mean: mean1 };
  }; // result()

  methods.reset = function () {
    mean1 = 0;
    items = 0;
  }; // reset()

  return methods;
}; // mean()

module.exports = mean;
