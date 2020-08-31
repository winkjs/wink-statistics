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

// Load wink helpers for object to array conversion & sorting.
var helpers = require( 'wink-helpers' );
var getValidFD = require( './get-valid-fd.js' );

// ### freqTable
/**
 *
 * Frequency table is built incrementally with arrival of each value from the
 * stream of data.
 *
 * The [`build()`](http://winkjs.org/wink-statistics/Stream.html#build) requires
 * a single argument, which could be either a string or numeric value.
 *
 * The [`result()`](http://winkjs.org/wink-statistics/Stream.html#result) returns
 * an object containing the frequency `table` sorted in descending order of
 * category frequency, along with table `size`, `sum` of frequencies,
 * `x2` — chi-squared statistic, `df` — degree of freedom, and the
 * `entropy`.
 *
 * The `x2` along with the `df` can be used to test the hypothesis, "the distribution is uniform". The
 * `percentage` in `table` represents %age of a category share in the `sum`; and `expected` count
 * assuming uniform distribution.
 *
 * @memberof streaming#
 * @return {Stream} Object containing methods such as `build()`, `result()` & `reset()`.
 * @example
 * var ft = freqTable();
 * ft.build( 'Tea' );
 * ft.build( 'Tea' );
 * ft.build( 'Tea' );
 * ft.build( 'Pepsi' );
 * ft.build( 'Pepsi' );
 * ft.build( 'Gin' );
 * ft.build( 'Coke' );
 * ft.build( 'Coke' );
 * ft.value();
 * // returns { Tea: 3, Pepsi: 2, Gin: 1, Coke: 2 }
 * ft.result();
 * // returns {
 * //   table: [
 * //     { category: 'Tea', observed: 3, percentage: 37.5, expected: 2 },
 * //     { category: 'Pepsi', observed: 2, percentage: 25, expected: 2 },
 * //     { category: 'Coke', observed: 2, percentage: 25, expected: 2 },
 * //     { category: 'Gin', observed: 1, percentage: 12.5, expected: 2 }
 * //   ],
 * //   size: 4,
 * //   sum: 8,
 * //   x2: 1,
 * //   df: 3,
 * //   entropy: 1.9056
 * // }
 */
var freqTable = function () {
  var obj = Object.create( null );
  var methods = Object.create( null );
  var sum = 0;

  methods.build = function ( x ) {
    obj[ x ] = 1 + ( obj[ x ] || 0 );
    sum += 1;
    return undefined;
  }; // compute()

  methods.value = function () {
    return obj;
  }; // value()

  methods.result = function ( fractionDigits ) {
    var fd = getValidFD( fractionDigits );
    var t = helpers.object.table( obj );
    var imax = t.length;
    var table = new Array( imax );
    var expectedVal = sum / imax;
    var x2 = 0;
    var entropy = 0;
    var p;
    var diff;
    var ft = Object.create( null );

    t.sort( helpers.array.descendingOnValue );
    for ( var i = 0;  i < imax; i += 1 ) {
      table[ i ] = Object.create( null );
      table[ i ].category = t[ i ][ 0 ];
      table[ i ].observed = t[ i ][ 1 ];
      p = t[ i ][ 1 ] / sum;
      table[ i ].percentage = +( p * 100 ).toFixed( fd );
      table[ i ].expected = +expectedVal.toFixed( fd );
      diff = ( t[ i ][ 1 ] - expectedVal );
      x2 += ( diff * ( diff / expectedVal ) );
      entropy += -p * Math.log2( p );
    }

    ft.table = table;
    ft.size = imax;
    ft.sum = sum;
    ft.x2 = +x2.toFixed( fd );
    ft.df = ( imax - 1 );
    ft.entropy = +entropy.toFixed( fd );

    return ft;
  }; // result()

  methods.reset = function () {
    obj = Object.create( null );
    sum = 0;
  }; // reset()

  methods.compute = methods.build;
  return methods;
}; // freqTable()

module.exports = freqTable;
