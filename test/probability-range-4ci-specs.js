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
var range4CI = require( '../src/probability-range-4ci.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'probability-range4CI normal behaviour', function () {
  it( 'should return correct aggregated values', function () {
    expect( +range4CI( 1, 10 ).probability.toFixed( 4 ) ).to.equal( 0.1852 );
    expect( +range4CI( 1, 10 ).min.toFixed( 4 ) ).to.equal( 0.0226 );
    expect( +range4CI( 1, 10 ).max.toFixed( 4 ) ).to.equal( 0.3477 );
    expect( +range4CI( 10, 100 ).probability.toFixed( 4 ) ).to.equal( 0.1105 );
    expect( +range4CI( 10, 100 ).min.toFixed( 4 ) ).to.equal( 0.0607 );
    expect( +range4CI( 10, 100 ).max.toFixed( 4 ) ).to.equal( 0.1604 );
    expect( +range4CI( 10, 100, 1.960 ).probability.toFixed( 4 ) ).to.equal( 0.1148 );
    expect( +range4CI( 10, 100, 1.960 ).min.toFixed( 4 ) ).to.equal( 0.0552 );
    expect( +range4CI( 10, 100, 1.960 ).max.toFixed( 4 ) ).to.equal( 0.1744 );
  } );
} );

describe( 'probability-range4CI error behaviour', function () {
  it( 'should throw error with incorrect counts', function () {
    expect( () => range4CI( 0, 10 ) ).to.throw( 'probability-range4CI: successCount should be a number > 0, instead found:' );
    expect( () => range4CI( -10, 10 ) ).to.throw( 'probability-range4CI: successCount should be a number > 0, instead found:' );
    expect( () => range4CI( 1, 0 ) ).to.throw( 'probability-range4CI: totalCount should be a number > 0, instead found:' );
    expect( () => range4CI( 1, -10 ) ).to.throw( 'probability-range4CI: totalCount should be a number > 0, instead found:' );
    expect( () => range4CI( 11, 10 ) ).to.throw( 'probability-range4CI: totalCount should be >= successCount, instead found' );
  } );
} );
