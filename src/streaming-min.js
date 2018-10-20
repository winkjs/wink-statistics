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

// ### min
/**
 *
 * It is a higher order function that returns a {@link Stream}.
 *
 * The `result()` returns an object containing `min`.
 *
 * @memberof streaming
 * @return {Stream} A stream object to compute values and obtain results
 * @example
 * var minimum = min();
 * minimum.compute( 3 );
 * minimum.compute( 6 );
 * minimum.value();
 * // returns 3
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

  methods.value = function () {
    return minimum;
  }; // value()

  methods.result = function () {
    var obj = Object.create( null );
    obj.min = minimum;
    return obj;
  }; // result()

  methods.reset = function () {
    minimum = Infinity;
  }; // reset()

  return methods;
}; // min()

module.exports = min;
