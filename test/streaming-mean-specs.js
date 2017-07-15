//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-utils”.
//
//     “wink-utils” is free software: you can redistribute it
//     and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-utils” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-utils”.
//     If not, see <http://www.gnu.org/licenses/>.

//
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var mean = require( '../src/streaming-mean.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-mean', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ 2, 3, 5, 7 ];
  var i;

  it( 'should return minimum 16.43 & 4.25 respectively with data1 & data2 respectively', function () {
    for ( i = 0; i < data1.length; i += 1 ) {
      mean.compute( data1[ i ] );
    }
    expect( mean.result().mean ).to.deep.equal( mean.value() );
    expect( +mean.value().toFixed( 2 ) ).to.equal( 16.43 );
    mean.reset();
    for ( i = 0; i < data2.length; i += 1 ) {
      mean.compute( data2[ i ] );
    }
    expect( mean.result().mean ).to.deep.equal( mean.value() );
    expect( mean.value() ).to.equal( 4.25 );
  } );
} );
