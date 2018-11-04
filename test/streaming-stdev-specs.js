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
var stdev = require( '../src/streaming-stdev.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-stdev', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ 2, 3, 5, 7 ];
  var i;

  it( 'should return minimum 34.1 & 2.22 respectively with data1 & data2 respectively', function () {
    for ( i = 0; i < data1.length; i += 1 ) {
      stdev.compute( data1[ i ] );
    }
    expect( stdev.result().stdev ).to.deep.equal( stdev.value() );
    expect( +stdev.value().toFixed( 2 ) ).to.equal( 34.1 );
    expect( +stdev.result().stdevp.toFixed(  2 ) ).to.equal( 31.57 );
    expect( +stdev.result().variance.toFixed(  2 ) ).to.equal( 1162.62 );
    expect( +stdev.result().variancep.toFixed(  2 ) ).to.equal( 996.53 );
    stdev.reset();
    for ( i = 0; i < data2.length; i += 1 ) {
      stdev.compute( data2[ i ] );
    }
    expect( stdev.result().stdev ).to.deep.equal( stdev.value() );
    expect( +stdev.value().toFixed( 2 ) ).to.equal( 2.22 );
  } );

  it( 'should return minimum all 0s with no data', function () {
    stdev.reset();
    expect( stdev.value() ).to.equal( 0 );
    expect( stdev.result().stdev ).to.equal( 0 );
    expect( stdev.result().stdevp ).to.equal( 0 );
    expect( stdev.result().variance ).to.equal( 0 );
    expect( stdev.result().variancep ).to.equal( 0 );
    expect( stdev.result().size ).to.equal( 0 );
    expect( stdev.result().mean ).to.equal( 0 );
  } );

  it( 'should return minimum 0s, 1, and 99 with one data item as 99', function () {
    stdev.reset();
    stdev.compute( 99 );
    expect( stdev.value() ).to.equal( 0 );
    expect( stdev.result().stdev ).to.equal( 0 );
    expect( stdev.result().stdevp ).to.equal( 0 );
    expect( stdev.result().variance ).to.equal( 0 );
    expect( stdev.result().variancep ).to.equal( 0 );
    expect( stdev.result().size ).to.equal( 1 );
    expect( stdev.result().mean ).to.equal( 99 );
  } );
} );
