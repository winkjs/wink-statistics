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
var median = require( '../src/data-median.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-median normal behaviour', function () {
  var data1 = [ 1, 1, 2, 2, 3, 3, 4, 4 ];
  var data2 = [ { x: 2 }, { x: 3 }, { x: 5 }, { x: 7 } ];

  it( 'should return minimum 16.43 & 4.25 respectively with data1 & data2 respectively', function () {
    expect( +median( data1 ).toFixed( 2 ) ).to.equal( 2.5 );
    expect( median( data2, 'x' ) ).to.equal( 4 );
    expect( median( data2, ( e ) =>  e.x ) ).to.equal( 4 );
  } );
} );

describe( 'data-max error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => median( 3 ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => median( [] ) ).to.throw( 'data-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => median( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
