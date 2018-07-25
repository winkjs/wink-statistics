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

// ### stdev
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `value()`, `result()`, and `reset()` functions.
 *
 * Use `compute()` to continuously determine the **standard deviation** value of data items passed to it in real-time.
 * Probe the sample standard deviation anytime using `value()`, which may be reset via `reset()`.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * The `result()` returns an object containing sample `stdev` and
 * `variance`, along with `mean`, `size` of data; it also
 * contains population standard deviation and variance as `stdevp` and `variancep`.
 *
 * @name streaming.stdev
 * @return {object} containing `compute`, `value`, `result`, and `reset` functions.
 * @example
 * var sd = stdev();
 * sd.compute( 2 );
 * sd.compute( 3 );
 * sd.compute( 5 );
 * sd.compute( 7 );
 * sd.value();
 * // returns 2.217355782608345
 * sd.result();
 * // returns { size: 4, mean: 4.25,
 * //   variance: 4.916666666666666,
 * //   stdev: 2.217355782608345,
 * //   variancep: 3.6874999999999996,
 * //   stdevp: 1.920286436967152
 * // }
 */
var stdev = function () {
  var mean = 0;
  var varianceXn = 0;
  var items = 0;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    var prevMean;
    items += 1;
    prevMean = mean;
    mean += ( di - mean ) / items;
    varianceXn += ( di - prevMean ) * ( di - mean );
    return undefined;
  }; // compute()

  // This returns the sample standard deviation.
  methods.value = function () {
    return ( items > 1 ) ? Math.sqrt( varianceXn / ( items - 1 ) ) : 0;
  }; // value()

  // This returns the sample standard deviation along with host of other statistics.
  methods.result = function () {
    var obj = Object.create( null );
    var variance = ( items > 1 ) ? ( varianceXn / ( items - 1 ) ) : 0;
    var variancep = ( items ) ? ( varianceXn / items ) : 0;

    obj.size = items;
    obj.mean = mean;
    // Sample variance & standard deviation.
    obj.variance = variance;
    obj.stdev = Math.sqrt( variance );
    // Population variance & standard deviation.
    obj.variancep = variancep;
    obj.stdevp = Math.sqrt( variancep );

    return obj;
  }; // result()

  methods.reset = function () {
    mean = 0;
    varianceXn = 0;
    items = 0;
  }; // reset()

  return methods;
}; // stdev()

module.exports = stdev;
