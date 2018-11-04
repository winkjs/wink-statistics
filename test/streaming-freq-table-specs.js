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
var ft = require( '../src/streaming-freq-table.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-freq-table', function () {
  var data = [ 'Tea', 'Tea', 'Tea', 'Pepsi', 'Pepsi', 'Gin', 'Coke', 'Coke' ];
  var table = [
    { category: 'Tea', observed: 3, percentage: 37.5, expected: 2 },
    { category: 'Pepsi', observed: 2, percentage: 25, expected: 2 },
    { category: 'Coke', observed: 2, percentage: 25, expected: 2 },
    { category: 'Gin', observed: 1, percentage: 12.5, expected: 2 }
  ];
  var i;

  it( 'should return detailed frequency table when input is ' + JSON.stringify( data ), function () {
    for ( i = 0; i < data.length; i += 1 ) {
      ft.build( data[ i ] );
    }
    expect( ft.value() ).to.deep.equal( { Tea: 3, Pepsi: 2, Gin: 1, Coke: 2 } );
    expect( ft.result().size ).to.equal( 4 );
    expect( ft.result().sum ).to.equal( 8 );
    expect( ft.result().x2 ).to.equal( 1 );
    expect( ft.result().df ).to.equal( 3 );
    expect( +ft.result().entropy.toFixed( 2 ) ).to.equal( 1.91 );
    expect( ft.result().table ).to.deep.equal( table );
  } );

  it( 'should return empty results when input is no data', function () {
    ft.reset();
    expect( ft.result().size ).to.equal( 0 );
    expect( ft.result().sum ).to.equal( 0 );
    expect( ft.result().x2 ).to.equal( 0 );
    expect( ft.result().df ).to.equal( -1 );
    expect( ft.result().entropy ).to.equal( 0 );
    expect( ft.result().table ).to.deep.equal( [] );
  } );
} );
