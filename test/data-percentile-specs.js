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
var percentile = require( '../src/data-percentile.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-percentile normal behaviour', function () {
  var data1 = [ 1, 1, 2, 2, 3, 3, 4, 4 ];
  var data2 = [ { x: 2 }, { x: 3 }, { x: 5 }, { x: 7 } ];

  it( 'should return minimum 16.43 & 4.25 respectively with data1 & data2 respectively', function () {
    expect( +percentile( data1, 0.25 ).toFixed( 2 ) ).to.equal( 1.25 );
    expect( +percentile( data1, 0.75 ).toFixed( 2 ) ).to.equal( 3.75 );
    expect( percentile( data2, 0.5, 'x' ) ).to.equal( 4 );
    expect( percentile( data2, 0.5, ( e ) =>  e.x ) ).to.equal( 4 );
  } );
} );

describe( 'data-max error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => percentile( 3 ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => percentile( [] ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => percentile( [ 1, 2, 3 ], -1 ) ).to.throw( 'data-percentile: q should be a number between 0 & 1, instead found:' );
    expect( () => percentile( [ 1, 2, 3 ], 0 ) ).to.throw( 'data-percentile: q should be a number between 0 & 1, instead found:' );
    expect( () => percentile( [ 1, 2, 3 ], 1 ) ).to.throw( 'data-percentile: q should be a number between 0 & 1, instead found:' );
    expect( () => percentile( [ 1, 2, 3 ], 2 ) ).to.throw( 'data-percentile: q should be a number between 0 & 1, instead found:' );
    expect( () => percentile( [ { x: 3 } ], 0.5, {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
