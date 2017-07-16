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
var summary = require( '../src/streaming-summary.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-summary', function () {
  var data1 = [ 6, 90, -1, 22, -12, 0, 10 ];
  var data2 = [ 2, 3, 5, 7 ];
  var i;

  it( 'should return minimum 34.1 & 2.22 respectively with data1 & data2 respectively', function () {
    for ( i = 0; i < data1.length; i += 1 ) {
      summary.compute( data1[ i ] );
    }
    expect( summary.result() ).to.deep.equal( summary.value() );
    expect( +summary.result().min.toFixed( 2 ) ).to.equal( -12 );
    expect( +summary.result().max.toFixed( 2 ) ).to.equal( 90 );
    expect( +summary.result().mean.toFixed( 2 ) ).to.equal( 16.43 );
    expect( +summary.result().stdev.toFixed( 2 ) ).to.equal( 34.1 );
    expect( +summary.result().stdevp.toFixed(  2 ) ).to.equal( 31.57 );
    expect( +summary.result().variance.toFixed(  2 ) ).to.equal( 1162.62 );
    expect( +summary.result().variancep.toFixed(  2 ) ).to.equal( 996.53 );
    expect( +summary.result().size ).to.equal( 7 );
    summary.reset();
    for ( i = 0; i < data2.length; i += 1 ) {
      summary.compute( data2[ i ] );
    }
    expect( summary.result() ).to.deep.equal( summary.value() );
    expect( +summary.result().min.toFixed( 2 ) ).to.equal( 2 );
    expect( +summary.result().max.toFixed( 2 ) ).to.equal( 7 );
    expect( +summary.result().mean.toFixed( 2 ) ).to.equal( 4.25 );
    expect( +summary.result().stdev.toFixed( 2 ) ).to.equal( 2.22 );
    expect( +summary.result().stdevp.toFixed( 2 ) ).to.equal( 1.92 );
    expect( +summary.result().variance.toFixed( 2 ) ).to.equal( 4.92 );
    expect( +summary.result().variancep.toFixed( 2 ) ).to.equal( 3.69 );
    expect( +summary.result().size ).to.equal( 4 );
  } );

  it( 'should return minimum all 0s with no data', function () {
    summary.reset();
    // expect( summary.value() ).to.equal( 0 );
    expect( summary.result().stdev ).to.equal( 0 );
    expect( summary.result().stdevp ).to.equal( 0 );
    expect( summary.result().variance ).to.equal( 0 );
    expect( summary.result().variancep ).to.equal( 0 );
    expect( summary.result().size ).to.equal( 0 );
    expect( summary.result().mean ).to.equal( 0 );
  } );

  it( 'should return minimum 0s, 1, and 99 with one data item as 99', function () {
    summary.reset();
    summary.compute( 99 );
    // expect( summary.value() ).to.equal( 0 );
    expect( summary.result().stdev ).to.equal( 0 );
    expect( summary.result().stdevp ).to.equal( 0 );
    expect( summary.result().variance ).to.equal( 0 );
    expect( summary.result().variancep ).to.equal( 0 );
    expect( summary.result().size ).to.equal( 1 );
    expect( summary.result().mean ).to.equal( 99 );
  } );
} );
