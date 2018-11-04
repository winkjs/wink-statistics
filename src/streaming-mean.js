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

// ### mean
/**
 *
 * Mean is computed incrementally with arrival of each value from the data stream.
 *
 * The [`compute()`](http://winkjs.org/wink-statistics/Stream.html#compute) requires
 * a single numeric value as argument.
 * The computations are inspired by the method proposed by [B. P. Welford](http://dx.doi.org/10.1080/00401706.1962.10490022).
 *
 * The [`result()`](http://winkjs.org/wink-statistics/Stream.html#result) returns
 * an object containing sample `mean` along with `size` of data.
 *
 * @memberof streaming#
 * @return {Stream} Object containing methods such as `compute()`, `result()` & `reset()`.
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

  methods.value = function ( fractionDigits ) {
    var fd = getValidFD( fractionDigits );
    return +mean1.toFixed( fd );
  }; // value()

  methods.result = function ( fractionDigits ) {
    var fd = getValidFD( fractionDigits );
    var obj = Object.create( null );
    obj.size = items;
    obj.mean = +mean1.toFixed( fd );
    return obj;
  }; // result()

  methods.reset = function () {
    mean1 = 0;
    items = 0;
  }; // reset()

  return methods;
}; // mean()

module.exports = mean;
