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
var min = require( '../src/data-min.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'data-min normal behaviour', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ { x: 3 }, { x: 6 } ];

  it( 'should return minimum 90 respectively with data1', function () {
    expect( min( data1 ) ).to.equal( -12 );
    expect( min( data2, 'x' ) ).to.equal( 3 );
    expect( min( data2, ( e ) =>  e.x ) ).to.equal( 3 );
  } );
} );

describe( 'data-min error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => min( 3 ) ).to.throw( 'data-min: x should be an array of length > 0, instead found' );
    expect( () => min( [] ) ).to.throw( 'data-min: x should be an array of length > 0, instead found' );
    expect( () => min( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
