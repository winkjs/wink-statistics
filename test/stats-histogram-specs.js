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
var bp = require( '../src/stats-histogram.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'stats-histogram normal behaviour', function () {
  var data1 = [
    12, 14, 14, 14, 16, 18, 20, 20, 21, 23, 27, 27, 27, 29, 31,
    31, 32, 32, 34, 36, 40, 40, 40, 40, 40, 42, 51, 56, 60, 65
  ];
  var classes1 = [
    { min: 12, mid: 19, max: 25 },
    { min: 25, mid: 32, max: 38 },
    { min: 38, mid: 45, max: 51 },
    { min: 51, mid: 58, max: 64 },
    { min: 64, mid: 71, max: 77 }
  ];
  var frequencies1 = [ 10, 10, 7, 2, 1 ];
  var data2 = [ [ -100 ], [ 1 ], [ 2 ], [ 2 ], [ 3 ], [ 3 ], [ 4 ], [ 400 ] ];
  var data3 = [ 1, 2, 2, 2, 2, 2, 3 ];
  var data4 = [ 9, 9.19, 9.29, 9.39, 9.49, 9.5, 9.6, 9.7, 9.8, 9.9 ];

  it( 'should return minimum boxplot analysis with data1, data2, data3 respectively', function () {
    expect( +bp( data1 ).q1.toFixed( 2 ) ).to.equal( 20 );
    expect( +bp( data1 ).iqr.toFixed( 2 ) ).to.equal( 20 );
    expect( +bp( data1 ).q3.toFixed( 2 ) ).to.equal( 40 );
    expect( +bp( data1 ).size.toFixed( 2 ) ).to.equal( 30 );
    expect( +bp( data1 ).min.toFixed( 2 ) ).to.equal( 12 );
    expect( +bp( data1 ).max.toFixed( 2 ) ).to.equal( 65 );
    expect( +bp( data1 ).range.toFixed( 2 ) ).to.equal( 53 );
    expect( bp( data1 ).classes ).to.deep.equal( classes1 );
    expect( bp( data1 ).frequencies ).to.deep.equal( frequencies1 );
    // expect( +bp( data1 ).leftNotch.toFixed( 2 ) ).to.equal( 1.1 );
    // expect( +bp( data1 ).rightNotch.toFixed( 2 ) ).to.equal( 3.9 );
    // expect( bp( data1 ).leftOutliers ).to.equal( undefined );
    // expect( bp( data1 ).rightOutliers ).to.equal( undefined );
    expect( bp( data2, 1, 0 ).iqr ).to.equal( 2.5 );
    expect( +bp( data4, 0 ).iqr.toFixed( 4 ) ).to.equal( 0.46 );
    // expect( bp( data2, 1.5, 0 ).min ).to.equal( -100 );
    // expect( bp( data2, 1.5, ( e ) =>  e[ 0 ] ).q3 ).to.equal( 3.75 );
    // expect( bp( data2, 1.5, ( e ) =>  e[ 0 ] ).min ).to.equal( -100 );
    // expect( bp( data2, 1.5, ( e ) =>  e[ 0 ] ).leftOutliers ).to.deep.equal( { begin: 0, end: 0, count: 1, fence: 1 } );
    // expect( bp( data2, 1.5, ( e ) =>  e[ 0 ] ).rightOutliers ).to.deep.equal( { begin: 7, end: 7, count: 1, fence: 4 } );
    expect( +bp( data3 ).iqr.toFixed( 2 ) ).to.equal( 0 );
  } );
} );

describe( 'stats-histogram error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => bp( 3 ) ).to.throw( 'stats-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => bp( [] ) ).to.throw( 'stats-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => bp( [ { x: 3 } ], 1.5, {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
