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
var sum = require( '../src/streaming-sum.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-sum', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ 1, 10e+100, 1, -10e+100 ];
  var i;

  it( 'should return minimum 115 & 2 respectively with data1 & data2 respectively', function () {
    for ( i = 0; i < data1.length; i += 1 ) {
      sum.compute( data1[ i ] );
    }
    expect( sum.result().sum ).to.deep.equal( sum.value() );
    expect( sum.value() ).to.equal( 115 );
    sum.reset();
    for ( i = 0; i < data2.length; i += 1 ) {
      sum.compute( data2[ i ] );
    }
    expect( sum.result().sum ).to.deep.equal( sum.value() );
    expect( sum.value() ).to.equal( 2 );
  } );
} );
