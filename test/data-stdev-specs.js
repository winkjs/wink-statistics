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
var stdev = require( '../src/data-stdev.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-stdv normal behaviour', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ { x: 2 }, { x: 3 }, { x: 5 }, { x: 7 } ];

  it( 'should return minimum 34.1, 2.22, 0 respectively with data1, data2, [ 99 ] respectively', function () {
    expect( +stdev( data1 ).toFixed( 2 ) ).to.equal( 34.1 );
    expect( +stdev( data2, 'x' ).toFixed( 2 ) ).to.equal( 2.22 );
    expect( +stdev( data2, ( e ) =>  e.x ).toFixed( 2 ) ).to.equal( 2.22 );
    expect( +stdev( [ 99 ] ) ).to.equal( 0 );
  } );
} );

describe( 'data-varianceXn error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => stdev( 3 ) ).to.throw( 'data-variance: x should be an array of length > 0, instead found' );
    expect( () => stdev( [] ) ).to.throw( 'data-variance: x should be an array of length > 0, instead found' );
    expect( () => stdev( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
