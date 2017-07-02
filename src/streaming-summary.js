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

// ### summary
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, `resultPE()`, and `reset()` functions.
 * Use `compute()` to continuously determine the basic **summary statistics** value of data items passed to it in real-time.
 * Probe the summary statistics anytime using `result()`, which may be reset via `reset()`. The `result()` returns
 * an object containing `stdev`, `variance`, `mean`, `size`, `min`, and `max` of data. Use `resultPE()` to
 * obtain the population estimate of variance and standard deviation. The computations are carried out using method pioneered
 * by B. P. Welford.
 *
 * @return {object} — containing `compute`, `result`, `resultPE`, and `reset` functions.

 *
 * @example
 * var sd = mean();
 * sd.compute( 2 );
 * sd.compute( 3 );
 * sd.compute( 5 );
 * sd.compute( 7 );
 * sd.result();
 * // returns { n: 4, min: 2, mean: 4.25, max: 7,
 * //   variance: 3.6874999999999996,
 * //   stdev: 1.920286436967152
 * // }
 */
var summary = function () {
  var mean = 0;
  var min = Infinity;
  var max = -Infinity;
  var varianceXn = 0;
  var items = 0;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    var prevMean;
    items += 1;
    prevMean = mean;
    mean += ( di - mean ) / items;
    min = ( min > di ) ? di : min;
    max = ( max < di ) ? di : max;
    varianceXn += ( di - prevMean ) * ( di - mean );
    return undefined;
  }; // compute()

  // This returns the sample's variance and standard deviation.
  methods.result = function () {
    var variance = varianceXn / items;
    var stdev = Math.sqrt( variance );
    return { size: items, min: min, mean: mean, max: max, variance: variance, stdev: stdev };
  }; // result()

  // This returns population estimate of variance and standard deviation.
  methods.resultPE = function () {
    var variance = ( items ) ? ( varianceXn / ( items - 1 ) ) : 0;
    var stdev = Math.sqrt( variance );
    return { size: items, min: min, mean: mean, max: max, variance: variance, stdev: stdev };
  }; // resultPE()

  methods.reset = function () {
    mean = 0;
    min = Infinity;
    max = -Infinity;
    varianceXn = 0;
    items = 0;
  }; // reset()

  return methods;
}; // summary()

module.exports = summary;
