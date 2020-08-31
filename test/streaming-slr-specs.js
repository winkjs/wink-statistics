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
var slr = require( '../src/wink-statistics.js' ).streaming.slr();
var simpleLinearRegression = require( '../src/wink-statistics.js' ).streaming.simpleLinearRegression();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-slr', function () {

  it( 'should return slope & intercept of -2.3621 & 101.4188 respectively', function () {
    slr.compute( 10, 80 );
    slr.compute( 15, 75 );
    slr.compute( 16, 65 );
    slr.compute( 18, 50 );
    slr.compute( 21, 45 );
    slr.compute( 30, 30 );
    slr.compute( 36, 18 );
    slr.compute( 40, 9 );
    expect( slr.result() ).to.deep.equal( slr.value() );
    expect( slr.result().slope ).to.equal( -2.3621 );
    expect( slr.result().intercept ).to.equal( 101.4188 );
    expect( slr.result().r ).to.equal( -0.9766 );
    expect( slr.result().r2 ).to.equal( 0.9537 );
    expect( slr.result().se ).to.equal( 5.624 );
    expect( slr.result().size ).to.equal( 8 );
  } );

  it( 'should return all undefined with no data', function () {
    slr.reset();
    expect( slr.result().slope ).to.equal( undefined );
    expect( slr.result().intecept ).to.equal( undefined );
    expect( slr.result().r ).to.equal( undefined );
    expect( slr.result().r2 ).to.equal( undefined );
    expect( slr.result().se ).to.equal( undefined );
    expect( slr.result().size ).to.equal( undefined );
  } );

  it( 'should return all undefined with zero variance', function () {
    slr.reset();
    slr.compute( 3, 3 );
    slr.compute( 3, 3 );
    expect( slr.result().slope ).to.equal( undefined );
    expect( slr.result().intecept ).to.equal( undefined );
    expect( slr.result().r ).to.equal( undefined );
    expect( slr.result().r2 ).to.equal( undefined );
    expect( slr.result().se ).to.equal( undefined );
    expect( slr.result().size ).to.equal( undefined );
  } );

  it( 'should return slope/intercept of -2.0728/91.7868 after reset and with revised data', function () {
    slr.reset();
    slr.compute( 16, 65 );
    slr.compute( 18, 50 );
    slr.compute( 21, 45 );
    slr.compute( 30, 30 );
    slr.compute( 36, 18 );
    slr.compute( 40, 9 );
    expect( slr.result() ).to.deep.equal( slr.value() );
    expect( slr.result().slope ).to.equal( -2.0728 );
    expect( slr.result().intercept ).to.equal( 91.7868 );
    expect( slr.result().r ).to.equal( -0.9835 );
    expect( slr.result().r2 ).to.equal( 0.9673 );
    expect( slr.result().se ).to.equal( 3.799 );
    expect( slr.result().size ).to.equal( 6 );
  } );

  it( 'simpleLinearRegression alias should work', function () {
    simpleLinearRegression.compute( 16, 65 );
    simpleLinearRegression.compute( 18, 50 );
    simpleLinearRegression.compute( 21, 45 );
    simpleLinearRegression.compute( 30, 30 );
    simpleLinearRegression.compute( 36, 18 );
    simpleLinearRegression.compute( 40, 9 );
    expect( simpleLinearRegression.result() ).to.deep.equal( simpleLinearRegression.value() );
    expect( simpleLinearRegression.result().slope ).to.equal( -2.0728 );
    expect( simpleLinearRegression.result().intercept ).to.equal( 91.7868 );
    expect( simpleLinearRegression.result().r ).to.equal( -0.9835 );
    expect( simpleLinearRegression.result().r2 ).to.equal( 0.9673 );
    expect( simpleLinearRegression.result().se ).to.equal( 3.799 );
    expect( simpleLinearRegression.result().size ).to.equal( 6 );
  } );
} );
