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
var cov = require( '../src/streaming-cov.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-cov', function () {

  it( 'should return cov/covp of -275.8571/-241.375 respectively', function () {
    cov.compute( 10, 80 );
    cov.compute( 15, 75 );
    cov.compute( 16, 65 );
    cov.compute( 18, 50 );
    cov.compute( 21, 45 );
    cov.compute( 30, 30 );
    cov.compute( 36, 18 );
    cov.compute( 40, 9 );
    expect( cov.value( 2 ) ).to.equal( -275.86 );
    expect( cov.result().meanX ).to.equal( 23.25 );
    expect( cov.result().meanY ).to.equal( 46.5 );
    expect( cov.result().cov ).to.equal( -275.8571 );
    expect( cov.result().covp ).to.equal( -241.375 );
    expect( cov.result().size ).to.equal( 8 );
  } );

  it( 'should return all 0 with no data', function () {
    cov.reset();
    expect( cov.value() ).to.equal( 0 );
    expect( cov.result().meanX ).to.equal( 0 );
    expect( cov.result().meanY ).to.equal( 0 );
    expect( cov.result().cov ).to.equal( 0 );
    expect( cov.result().covp ).to.equal( 0 );
    expect( cov.result().size ).to.equal( 0 );
  } );

  it( 'should return cov/covp as 0 with zero variance', function () {
    cov.reset();
    cov.compute( 3, 3 );
    cov.compute( 3, 3 );
    expect( cov.value() ).to.equal( 0 );
    expect( cov.result().meanX ).to.equal( 3 );
    expect( cov.result().meanY ).to.equal( 3 );
    expect( cov.result().cov ).to.equal( 0 );
    expect( cov.result().covp ).to.equal( 0 );
    expect( cov.result().size ).to.equal( 2 );
  } );

  it( 'should return cov/covp of -205.9667/-171.64 after reset and with revised data', function () {
    cov.reset();
    cov.compute( 16, 65 );
    cov.compute( 18, 50 );
    cov.compute( 21, 45 );
    cov.compute( 30, 30 );
    cov.compute( 36, 18 );
    cov.compute( 40, 9 );
    expect( cov.value() ).to.equal( -205.9667 );
    expect( cov.result().meanX ).to.equal( 26.8333 );
    expect( cov.result().meanY ).to.equal( 36.1667 );
    expect( cov.result().cov ).to.equal( -205.9667 );
    expect( cov.result( 2 ).covp ).to.equal( -171.64 );
    expect( cov.result().size ).to.equal( 6 );
  } );
} );
