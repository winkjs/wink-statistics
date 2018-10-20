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

// ### sum
/**
 *
 * It is a higher order function that returns a {@link Stream}.
 *
 * The `result()` returns an object containing `sum`.
 *
 * @memberof streaming
 * @return {Stream} A stream object to compute values and obtain results
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
