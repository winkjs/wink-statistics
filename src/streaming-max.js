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

// ### max
/**
 *
 * It is a higher order function that returns a {@link Stream}.
 *
 * The `result()` returns an object containing `max`.
 *
 * @memberof streaming
 * @return {Stream} A stream object to compute values and obtain results
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
