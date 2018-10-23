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

var getValidFD = require( './get-valid-fd.js' );

// ### stdev
/**
 *
 * Standard Deviation is computed incrementally with arrival of each value from the data stream.
 *
 * The [`compute()`](http://winkjs.org/wink-statistics/Stream.html#compute) requires
 * a single numeric value as argument.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * The [`result()`](http://winkjs.org/wink-statistics/Stream.html#result) returns
 * returns an object containing sample `stdev` and
 * `variance`, along with `mean`, `size` of data; it also
 * contains population standard deviation and variance as `stdevp` and `variancep`.
 *
 * @memberof streaming#
 * @return {Stream} Object containing methods such as `compute()`, `result()` & `reset()`.
 * @example
 * var sd = stdev();
 * sd.compute( 2 );
 * sd.compute( 3 );
 * sd.compute( 5 );
 * sd.compute( 7 );
 * sd.value();
 * // returns 2.2174
 * sd.result();
 * // returns { size: 4, mean: 4.25,
 * //   variance:  4.9167,
 * //   stdev: 2.2174,
 * //   variancep: 3.6875,
 * //   stdevp: 1.9203
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
  methods.value = function ( fractionDigits ) {
    var fd = getValidFD( fractionDigits );
    return ( items > 1 ) ? +( Math.sqrt( varianceXn / ( items - 1 ) ) ).toFixed( fd ) : 0;
  }; // value()

  // This returns the sample standard deviation along with host of other statistics.
  methods.result = function ( fractionDigits ) {
    var fd = getValidFD( fractionDigits );
    var obj = Object.create( null );
    var variance = ( items > 1 ) ? ( varianceXn / ( items - 1 ) ) : 0;
    var variancep = ( items ) ? ( varianceXn / items ) : 0;

    obj.size = items;
    obj.mean = +mean.toFixed( fd );
    // Sample variance & standard deviation.
    obj.variance = +variance.toFixed( fd );
    obj.stdev = +( Math.sqrt( variance ) ).toFixed( fd );
    // Population variance & standard deviation.
    obj.variancep = +variancep.toFixed( fd );
    obj.stdevp = +( Math.sqrt( variancep ) ).toFixed( fd );

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
