//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) GRAYPE Systems Private Limited
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

// ### summary
/**
 *
 * Summary Statistics is computed incrementally with arrival of each value from the data stream.
 *
 * The [`compute()`](http://winkjs.org/wink-statistics/Stream.html#compute) requires
 * a single numeric value as argument.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * The [`result()`](http://winkjs.org/wink-statistics/Stream.html#result) returns
 * an object containing `size`, `min`, `mean`, `max`, sample `stdev` along with
 * sample `variance` of data; it also
 * contains population standard deviation and variance as `stdevp` and `variancep`.
 *
 * @memberof streaming#
 * @return {Stream} Object containing methods such as `compute()`, `result()` & `reset()`.
 * @example
 * var ss = summary();
 * ss.compute( 2 );
 * ss.compute( 3 );
 * ss.compute( 5 );
 * ss.compute( 7 );
 * ss.result();
 * // returns { size: 4, min: 2, mean: 4.25, max: 7,
 * //   variance: 4.9167,
 * //   stdev: 2.2174,
 * //   3.6875,
 * //   stdevp: 1.9203
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
  methods.result = function ( fractionDigits ) {
    var fd = getValidFD( fractionDigits );
    var smmry = Object.create( null );
    var variance = ( items > 1 ) ? ( varianceXn / ( items - 1 ) ) : 0;
    var variancep = ( items ) ? ( varianceXn / items ) : 0;

    smmry.size = items;
    smmry.min = min;
    smmry.max = max;
    // Round off only for the following; it was not required for the above 3.
    smmry.mean = +mean.toFixed( fd );
    smmry.variance = +variance.toFixed( fd );
    smmry.stdev = +( Math.sqrt( variance ) ).toFixed( fd );
    smmry.variancep = +variancep.toFixed( fd );
    smmry.stdevp = +( Math.sqrt( variancep ) ).toFixed( fd );

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
