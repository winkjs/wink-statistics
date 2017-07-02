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

// ## Private

// ### accessor
/**
 *
 * Returns the value from `data` that is accessed via `accessor`.
 *
 * @private
 * @param {number} data — from where a value is extracted using `accessor`.
 * @param {(string|function)} [accessor=undefined] — It should be a property-name
 * contained in `data` or function; `undefined` means the `data` is returned as-is.
 * @return {number} — value from `data` according to `accessor`.
 *
*/
var value = function ( data, accessor ) {
  return (
    ( accessor === undefined ) ? data :
      ( typeof accessor === 'function' ) ? accessor( data ) : data[ accessor ]
  );
}; // accessor()

module.exports = value;
