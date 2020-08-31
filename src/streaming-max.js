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

// ### max
/**
 *
 * Maximum value is determined incrementally with arrival of each value from the data stream.
 *
 * The [`compute()`](http://winkjs.org/wink-statistics/Stream.html#compute) requires
 * a single numeric value as argument.
 *
 * The [`result()`](http://winkjs.org/wink-statistics/Stream.html#result) returns
 * an object containing `max`.
 *
 * @memberof streaming#
 * @return {Stream} Object containing methods such as `compute()`, `result()` & `reset()`.
 * @example
 * var maximum = max();
 * maximum.compute( 3 );
 * maximum.compute( 6 );
 * maximum.value();
 * // returns 6
 * maximum.result();
 * // returns { max: 6 }
 */
var max = function () {
  var maximum = -Infinity;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    maximum = ( maximum < di ) ? di : maximum;
    return undefined;
  }; // compute()

  methods.value = function () {
    return maximum;
  }; // value()

  methods.result = function () {
    var obj = Object.create( null );
    obj.max = maximum;
    return obj;
  }; // result()

  methods.reset = function () {
    maximum = -Infinity;
  }; // reset()

  return methods;
}; // max()

module.exports = max;
