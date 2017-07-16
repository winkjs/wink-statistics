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

//
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var varianceXn = require( '../src/stats-varianceXn.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'stats-varianceXn normal behaviour', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ { x: 2 }, { x: 3 }, { x: 5 }, { x: 7 } ];

  it( 'should return minimum 6975.71/7 & 14.75/4 respectively with data1 & data2 respectively', function () {
    expect( +varianceXn( data1 ).varianceXn.toFixed( 2 ) ).to.equal( 6975.71 );
    expect( +varianceXn( data1 ).size ).to.equal( 7 );
    expect( +varianceXn( data2, 'x' ).varianceXn.toFixed( 2 ) ).to.equal( 14.75 );
    expect( +varianceXn( data2, ( e ) =>  e.x ).varianceXn.toFixed( 2 ) ).to.equal( 14.75 );
    expect( +varianceXn( data2, ( e ) =>  e.x ).size ).to.equal( 4 );
  } );
} );

describe( 'stats-varianceXn error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => varianceXn( 3 ) ).to.throw( 'stats-variance: x should be an array of length > 0, instead found' );
    expect( () => varianceXn( [] ) ).to.throw( 'stats-variance: x should be an array of length > 0, instead found' );
    expect( () => varianceXn( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
