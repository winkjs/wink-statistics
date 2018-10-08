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
var fns = require( '../src/data-five-num-summary.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-five-num-summary normal behaviour', function () {
  var data1 = [ 1, 1, 2, 2, 3, 3, 4, 4 ];
  var data2 = [ [ 1 ], [ 1 ], [ 2 ], [ 2 ], [ 3 ], [ 3 ], [ 4 ], [ 4 ] ];

  it( 'should return minimum 1 & 4.25 respectively with data1 & data2 respectively', function () {
    expect( +fns( data1 ).q1.toFixed( 2 ) ).to.equal( 1.25 );
    expect( +fns( data1 ).median.toFixed( 2 ) ).to.equal( 2.5 );
    expect( +fns( data1 ).q3.toFixed( 2 ) ).to.equal( 3.75 );
    expect( +fns( data1 ).iqr.toFixed( 2 ) ).to.equal( 2.5 );
    expect( +fns( data1 ).size.toFixed( 2 ) ).to.equal( 8 );
    expect( +fns( data1 ).min.toFixed( 2 ) ).to.equal( 1 );
    expect( +fns( data1 ).max.toFixed( 2 ) ).to.equal( 4 );
    expect( +fns( data1 ).range.toFixed( 2 ) ).to.equal( 3 );
    expect( fns( data2, 0 ).median ).to.equal( 2.5 );
    expect( fns( data2, ( e ) =>  e[ 0 ] ).q3 ).to.equal( 3.75 );
  } );
} );

describe( 'data-five-num-summary error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => fns( 3 ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => fns( [] ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => fns( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
