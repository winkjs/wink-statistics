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

// ## streaming

// ### mean
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `value()`, `result()`, and `reset()` functions.
 *
 * Use `compute()` to continuously determine the **mean** aka average value of data items passed to it in real-time.
 * Probe the mean anytime using `value()`, which may be reset via `reset()`.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * The `result()` returns an object containing sample `mean` along with `size` of data.
 *
 * @name streaming.mean
 * @return {object} containing `compute`, `value`, `result`, and `reset` functions.
 * @example
 * var avg = mean();
 * avg.compute( 2 );
 * avg.compute( 3 );
 * avg.compute( 5 );
 * avg.compute( 7 );
 * avg.value();
 * // returns 4.25
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

  methods.value = function () {
    return mean1;
  }; // value()

  methods.result = function () {
    var obj = Object.create( null );
    obj.size = items;
    obj.mean = mean1;
    return obj;
  }; // result()

  methods.reset = function () {
    mean1 = 0;
    items = 0;
  }; // reset()

  return methods;
}; // mean()

module.exports = mean;
