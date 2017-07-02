//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-utils”.
//
//     “wink-utils” is free software: you can redistribute it
//     and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-utils” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-utils”.
//     If not, see <http://www.gnu.org/licenses/>.

// ## streaming

// ### sum
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, and `reset()` functions.
 * Use `compute()` to continuously determine the **minimum** value of data items passed to it in real-time.
 * Probe the sum anytime using `result()`, which may be reset via `reset()`.  The `result()` returns
 * an object containing `sum` of data, which has been compensated for floating point errors using Neumaier Method.
 *
 * @return {object} — containing `compute`, `result`, and `reset` functions.

 *
 * @example
 * var addition = sum();
 * addition.compute( 1 );
 * addition.compute( 10e+100 );
 * addition.compute( 1 );
 * addition.compute( -10e+100 );
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

  methods.result = function () {
   return { sum: total + compensation };
  }; // result()

  methods.reset = function () {
    items = false;
    total = 0;
    compensation = 0;
  }; // reset()

  return methods;
}; // sum()

module.exports = sum;
