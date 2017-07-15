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
var mean = require( '../src/stats-mean.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'stats-mean normal behaviour', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ { x: 2 }, { x: 3 }, { x: 5 }, { x: 7 } ];

  it( 'should return minimum 16.43 & 4.25 respectively with data1 & data2 respectively', function () {
    expect( +mean( data1 ).toFixed( 2 ) ).to.equal( 16.43 );
    expect( mean( data2, 'x' ) ).to.equal( 4.25 );
    expect( mean( data2, ( e ) =>  e.x ) ).to.equal( 4.25 );
  } );
} );

describe( 'stats-max error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => mean( 3 ) ).to.throw( 'stats-mean: x should be an array of length > 0, instead found' );
    expect( () => mean( [] ) ).to.throw( 'stats-mean: x should be an array of length > 0, instead found' );
    expect( () => mean( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
