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

//
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var max = require( '../src/stats-max.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'stats-max normal behaviour', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ { x: 3 }, { x: 6 } ];

  it( 'should return maximum 90 respectively with data1', function () {
    expect( max( data1 ) ).to.equal( 90 );
    expect( max( data2, 'x' ) ).to.equal( 6 );
    expect( max( data2, ( e ) =>  e.x ) ).to.equal( 6 );
  } );
} );

describe( 'stats-max error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => max( 3 ) ).to.throw( 'stats-max: x should be an array of length > 0, instead found' );
    expect( () => max( [] ) ).to.throw( 'stats-max: x should be an array of length > 0, instead found' );
    expect( () => max( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
