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

// ### sum
/**
 *
 * Sum is computed incrementally with arrival of each value from the data stream.
 *
 * The [`compute()`](https://winkjs.org/wink-statistics/Stream.html#compute) requires
 * a single numeric value as argument.
 *
 * The [`result()`](https://winkjs.org/wink-statistics/Stream.html#result) returns
 * an object containing `sum`.
 *
 * @memberof streaming#
 * @return {Stream} Object containing methods such as `compute()`, `result()` & `reset()`.
 * @example
 * var addition = sum();
 * addition.compute( 1 );
 * addition.compute( 10e+100 );
 * addition.compute( 1 );
 * addition.compute( -10e+100 );
 * addition.value();
 * // returns 2
 * addition.result();
 * // returns { sum: 2 }
 */
var sum = function () {
  var items = false;
  var total = 0;
  var compensation = 0;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
  var t;
  if ( items ) {
    t = total + di;
    compensation += ( Math.abs( total ) >= Math.abs( di ) ) ?
                    ( ( total - t ) + di ) :
                    ( ( di - t ) + total );
    total = t;
  } else {
    total = di;
    items = true;
  }
  return undefined;
  }; // compute()

  methods.value = function ( fractionDigits ) {
    var fd = getValidFD( fractionDigits );
   return +( total + compensation ).toFixed( fd );
  }; // value()

  methods.result = function ( fractionDigits ) {
   var fd = getValidFD( fractionDigits );
   return { sum: +( total + compensation ).toFixed( fd ) };
  }; // result()

  methods.reset = function () {
    items = false;
    total = 0;
    compensation = 0;
  }; // reset()

  return methods;
}; // sum()

module.exports = sum;
