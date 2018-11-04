//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
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

// ## Private

// ### accessor
/**
 * Returns the value from `data` that is accessed via `accessor`.
 *
 * @private
 *
 * @param {number} data from where a value is extracted using `accessor`.
 * @param {(string|function)} [accessor=undefined] It should be a property-name
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
