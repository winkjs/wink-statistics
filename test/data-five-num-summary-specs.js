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
