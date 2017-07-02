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

// ### max
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, and `reset()` functions.
 * Use `compute()` to continuously determine the **maximum** value of data items passed to it in real-time.
 * Probe the maximum value anytime using `result()`, which may be reset via `reset()`.  The `result()` returns
 * an object containing `max` of data.
 *
 * @return {object} — containing `compute`, `result`, and `reset` functions.

 *
 * @example
 * var maximum = max();
 * maximum.compute( 3 );
 * maximum.compute( 6 );
 * maximum.result();
 * // returns { min: 6 }
 */
var max = function () {
  var maximum = -Infinity;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    maximum = ( maximum < di ) ? di : maximum;
    return undefined;
  }; // compute()

  methods.result = function () {
    return { max: maximum };
  }; // result()

  methods.reset = function () {
    maximum = -Infinity;
  }; // reset()

  return methods;
}; // max()

 module.exports = max;
