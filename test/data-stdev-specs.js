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
var stdev = require( '../src/data-stdev.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-stdv normal behaviour', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ { x: 2 }, { x: 3 }, { x: 5 }, { x: 7 } ];

  it( 'should return minimum 34.1, 2.22, 0 respectively with data1, data2, [ 99 ] respectively', function () {
    expect( +stdev( data1 ).toFixed( 2 ) ).to.equal( 34.1 );
    expect( +stdev( data2, 'x' ).toFixed( 2 ) ).to.equal( 2.22 );
    expect( +stdev( data2, ( e ) =>  e.x ).toFixed( 2 ) ).to.equal( 2.22 );
    expect( +stdev( [ 99 ] ) ).to.equal( 0 );
  } );
} );

describe( 'data-varianceXn error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => stdev( 3 ) ).to.throw( 'data-variance: x should be an array of length > 0, instead found' );
    expect( () => stdev( [] ) ).to.throw( 'data-variance: x should be an array of length > 0, instead found' );
    expect( () => stdev( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
