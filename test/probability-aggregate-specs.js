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
var aggregate = require( '../src/probability-aggregate.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'probability-aggregate normal behaviour', function () {
  it( 'should return maximum 90 respectively with data1', function () {
    expect( aggregate( 0.5, 0.6 ) ).to.equal( 0.6 );
    expect( aggregate( 0.5, 0.4 ) ).to.equal( 0.4 );
    expect( +aggregate( 0.6, 0.6 ).toFixed( 4 ) ).to.equal( 0.6923 );
    expect( +aggregate( 0.4, 0.6 ).toFixed( 4 ) ).to.equal( 0.5 );
    expect( +aggregate( 0, 0.6 ).toFixed( 4 ) ).to.equal( 0 );
    expect( +aggregate( 1, 0.6 ).toFixed( 4 ) ).to.equal( 1 );
  } );
} );

describe( 'probability-aggregate error behaviour', function () {
  it( 'should throw error with probability values beyond 0-1 range', function () {
    expect( () => aggregate( -1, 0 ) ).to.throw( 'probability-aggregate: pa1 should be a number between 0 & 1, instead found:' );
    expect( () => aggregate( 0, 2 ) ).to.throw( 'probability-aggregate: pa2 should be a number between 0 & 1, instead found:' );
  } );
} );
