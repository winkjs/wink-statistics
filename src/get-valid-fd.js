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

var isFiniteInteger = require( 'wink-helpers' ).validate.isFiniteInteger;

// ### getValidatFD
/**
 * Returns valid fraction digits: either `fractionDigits` if it is a valid is a
 * valid finite integer, or **4** — default fraction digits.
 *
 * @private
 *
 * @param {number} fractionDigits i.e. number of digits to round in a fraction.
 * @return {number} — valid fraction digits.
 *
*/
var getValidFD = function ( fractionDigits ) {
  return ( isFiniteInteger( fractionDigits ) ) ? fractionDigits : 4;
};

module.exports = getValidFD;
