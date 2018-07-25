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

// ## Private

// ### accessor
/**
 *
 * @private
 * Returns the value from `data` that is accessed via `accessor`.
 *
 * @param {number} data — from where a value is extracted using `accessor`.
 * @param {(string|function)} [accessor=undefined] — It should be a property-name
 * contained in `data` or function; `undefined` means the `data` is returned as-is.
 * @return {number} — value from `data` according to `accessor`.
 *
*/
var value = function ( data, accessor ) {
  if ( accessor === undefined ) return data;
  if ( typeof accessor === 'string' || typeof accessor === 'number' ) return data[ accessor ];
  if ( typeof accessor === 'function' ) return accessor( data );
  throw Error( 'accessor: expecting undefined, string, number, or function, instead found: ' + ( typeof accessor ) );
}; // accessor()

module.exports = value;
