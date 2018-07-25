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

// ### summary
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `value()`, `result()`, and `reset()` functions.
 *
 * Use `compute()` to continuously determine the **summary statistics** of data items passed to it in real-time.
 * Probe the sample summary statistics anytime using `value()`, which may be reset via `reset()`. The
 * `result()` is also an alias of `value()`.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * The summary statistics is an object containing `size`, `min`, `mean`, `max`, sample `stdev` along with
 * sample `variance` of data; it also
 * contains population standard deviation and variance as `stdevp` and `variancep`.
 *
 * @name streaming.summary
 * @return {object} containing `compute`, `value`, `result`, and `reset` functions.
 * @example
 * var ss = summary();
 * ss.compute( 2 );
 * ss.compute( 3 );
 * ss.compute( 5 );
 * ss.compute( 7 );
 * ss.result();
 * // returns { size: 4, min: 2, mean: 4.25, max: 7,
 * //   variance: 4.916666666666666,
 * //   stdev: 2.217355782608345,
 * //   variancep: 3.6874999999999996,
 * //   stdevp: 1.920286436967152
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
    var smmry = Object.create( null );
    var variance = ( items > 1 ) ? ( varianceXn / ( items - 1 ) ) : 0;
    var variancep = ( items ) ? ( varianceXn / items ) : 0;

    smmry.size = items;
    smmry.min = min;
    smmry.mean = mean;
    smmry.max = max;
    smmry.variance = variance;
    smmry.stdev = Math.sqrt( variance );
    smmry.variancep = variancep;
    smmry.stdevp = Math.sqrt( variancep );

    return smmry;
  }; // result()

  // There is no single summary value; create an alias!
  methods.value = methods.result;

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
