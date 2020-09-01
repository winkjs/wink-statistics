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
var diff = require( '../src/data-difference.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-difference normal behaviour', function () {
  var data1 = [ 1, 3, 5, 5, 9, 11, 11 ];
  var data2 = [ 1, 2, 4, 8, 16, 32, 64 ];

  it( 'should return minimum 1 & 1.5 respectively with data1 & data2 respectively', function () {
    expect( diff( data1 ) ).to.deep.equal( [ 2, 2, 0, 4, 2, 0 ] );
    expect( diff( data2, 2 ) ).to.deep.equal( [ 3, 6, 12, 24, 48 ] );
  } );
} );

describe( 'data-difference error behaviour', function () {
  it( 'should throw error with wrong data-type or values', function () {
    expect( () => diff( 3 ) ).to.throw( 'data-difference: data should be an array of length > 0, instead found' );
    expect( () => diff( [] ) ).to.throw( 'data-difference: data should be an array of length > 0, instead found' );
    expect( () => diff( [ 1 , 2 ], 'x' ) ).to.throw( 'data-difference: lag should be an integer > 0, instead found' );
  } );
} );
