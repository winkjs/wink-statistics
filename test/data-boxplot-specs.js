//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) GRAYPE Systems Private Limited
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
var bp = require( '../src/data-boxplot.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-boxplot normal behaviour', function () {
  var data1 = [ 1, 1, 2, 2, 3, 3, 4, 4 ];
  var data2 = [ [ -100 ], [ 1 ], [ 2 ], [ 2 ], [ 3 ], [ 3 ], [ 4 ], [ 400 ] ];
  var data3 = [ 1, 2, 2, 2, 2, 2, 3 ];

  it( 'should return minimum boxplot analysis with data1, data2, data3 respectively', function () {
    expect( +bp( data1 ).q1.toFixed( 2 ) ).to.equal( 1.25 );
    expect( +bp( data1 ).median.toFixed( 2 ) ).to.equal( 2.5 );
    expect( +bp( data1 ).q3.toFixed( 2 ) ).to.equal( 3.75 );
    expect( +bp( data1 ).iqr.toFixed( 2 ) ).to.equal( 2.5 );
    expect( +bp( data1 ).size.toFixed( 2 ) ).to.equal( 8 );
    expect( +bp( data1 ).min.toFixed( 2 ) ).to.equal( 1 );
    expect( +bp( data1 ).max.toFixed( 2 ) ).to.equal( 4 );
    expect( +bp( data1 ).range.toFixed( 2 ) ).to.equal( 3 );
    expect( +bp( data1 ).leftNotch.toFixed( 2 ) ).to.equal( 1.1 );
    expect( +bp( data1 ).rightNotch.toFixed( 2 ) ).to.equal( 3.9 );
    expect( bp( data1 ).leftOutliers ).to.equal( undefined );
    expect( bp( data1 ).rightOutliers ).to.equal( undefined );
    expect( bp( data2, 1.5, 0 ).median ).to.equal( 2.5 );
    expect( bp( data2, 1.5, 0 ).min ).to.equal( -100 );
    expect( bp( data2, 1.5, ( e ) =>  e[ 0 ] ).q3 ).to.equal( 3.75 );
    expect( bp( data2, 1.5, ( e ) =>  e[ 0 ] ).min ).to.equal( -100 );
    expect( bp( data2, 1.5, ( e ) =>  e[ 0 ] ).leftOutliers ).to.deep.equal( { begin: 0, end: 0, count: 1, fence: 1 } );
    expect( bp( data2, 1.5, ( e ) =>  e[ 0 ] ).rightOutliers ).to.deep.equal( { begin: 7, end: 7, count: 1, fence: 4 } );
    expect( +bp( data3 ).iqr.toFixed( 2 ) ).to.equal( 0 );
  } );
} );

describe( 'data-boxplot error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => bp( 3 ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => bp( [] ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => bp( [ { x: 3 } ], 1.5, {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
