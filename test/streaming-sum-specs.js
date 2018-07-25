//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
//
//     This file is part of “wink-statistics”.
//
//     “wink-statistics” is free software: you can redistribute it
//     and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-statistics” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-statistics”.
//     If not, see <http://www.gnu.org/licenses/>.

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
