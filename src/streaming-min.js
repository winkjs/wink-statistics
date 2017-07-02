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

// ### min
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, and `reset()` functions.
 * Use `compute()` to continuously determine the **minimum** value of data items passed to it in real-time.
 * Probe the minimum value anytime using `result()`, which may be reset via `reset()`.  The `result()` returns
 * an object containing `min` of data.
 *
 * @return {object} — containing `compute`, `result`, and `reset` functions.

 *
 * @example
 * var minimum = min();
 * minimum.compute( 3 );
 * minimum.compute( 6 );
 * minimum.result();
 * // returns { min: 3 }
 */
var min = function () {
  var minimum = Infinity;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    minimum = ( minimum > di ) ? di : minimum;
    return undefined;
  }; // compute()

  methods.result = function () {
    return { min: minimum };
  }; // result()

  methods.reset = function () {
    minimum = Infinity;
  }; // reset()

  return methods;
}; // min()

module.exports = min;
