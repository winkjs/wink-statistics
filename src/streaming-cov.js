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

// ### cov (Covariance)
/**
 *
 * Covariance is computed incrementally with arrival of each pair of `x` and `y`
 * values from a stream of data.
 *
 * The [`compute()`](https://winkjs.org/wink-statistics/Stream.html#compute) requires
 * two numeric arguments `x` and `y`.
 *
 * The [`result()`](https://winkjs.org/wink-statistics/Stream.html#result) returns
 * an object containing sample covariance `cov`, along with
 * `meanX`, `meanY` and `size` of data i.e. number of x & y pairs. It also contains
 * population covariance `covp`.
 *
 * @memberof streaming#
 * @return {Stream} Object containing methods such as `compute()`, `result()` & `reset()`.
 * @example
 * var covariance = cov();
 * covariance.compute( 10, 80 );
 * covariance.compute( 15, 75 );
 * covariance.compute( 16, 65 );
 * covariance.compute( 18, 50 );
 * covariance.compute( 21, 45 );
 * covariance.compute( 30, 30 );
 * covariance.compute( 36, 18 );
 * covariance.compute( 40, 9 );
 * covariance.result();
 * // returns { size: 8,
 * //   meanX: 23.25,
 * //   meanY: 46.5,
 * //   cov: -275.8571,
 * //   covp: -241.375
 * // }
 */
var covariance = function () {
  var meanX = 0;
  var meanY = 0;
  var covXY = 0;
  var items = 0;
  // Returned!
  var methods = Object.create( null );

  methods.compute = function ( xi, yi ) {
    var dx, dy;
    items += 1;
    dx = xi - meanX;
    dy = yi - meanY;
    meanX += dx / items;
    meanY += dy / items;
    covXY += dx * ( yi - meanY );
    return undefined;
  }; // compute()

  // This returns the sample standard deviation.
  methods.value = function ( fractionDigits ) {
    var fd = getValidFD( fractionDigits );
    return ( items > 1 ) ? +( covXY / ( items - 1 ) ).toFixed( fd ) : 0;
  }; // value()

  // This returns the sample covariance along with host of other statistics.
  methods.result = function ( fractionDigits ) {
    var obj = Object.create( null );
    var fd = getValidFD( fractionDigits );
    var cov = ( items > 1 ) ? ( covXY / ( items - 1 ) ) : 0;
    var covp = ( items ) ? ( covXY / items ) : 0;

    obj.size = items;
    obj.meanX = +meanX.toFixed( fd );
    obj.meanY = +meanY.toFixed( fd );
    // Sample covariance.
    obj.cov = +cov.toFixed( fd );
    // Population covariance.
    obj.covp = +covp.toFixed( fd );

    return obj;
  }; // result()

  methods.reset = function () {
    meanX = 0;
    meanY = 0;
    covXY = 0;
    items = 0;
  }; // reset()

  return methods;
}; // covariance()

module.exports = covariance;
