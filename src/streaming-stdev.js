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
