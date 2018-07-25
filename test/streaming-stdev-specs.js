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
