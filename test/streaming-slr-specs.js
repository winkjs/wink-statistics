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
var slr = require( '../src/streaming-slr.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-slr', function () {

  it( 'should return minimum 34.1 & 2.22 respectively with data1 & data2 respectively', function () {
    slr.compute( 10, 80 );
    slr.compute( 15, 75 );
    slr.compute( 16, 65 );
    slr.compute( 18, 50 );
    slr.compute( 21, 45 );
    slr.compute( 30, 30 );
    slr.compute( 36, 18 );
    slr.compute( 40, 9 );
    expect( slr.result() ).to.deep.equal( slr.value() );
    expect( +slr.result().slope ).to.equal( -2.3621 );
    expect( +slr.result().intercept ).to.equal( 101.4188 );
    expect( +slr.result().r ).to.equal( -0.9766 );
    expect( +slr.result().r2 ).to.equal( 0.9537 );
    expect( +slr.result().se ).to.equal( 5.624 );
    expect( +slr.result().size ).to.equal( 8 );
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
} );
