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

//
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var bp = require( '../src/data-histogram.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-histogram normal behaviour', function () {
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

describe( 'data-histogram error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => bp( 3 ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => bp( [] ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => bp( [ { x: 3 } ], 1.5, {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
