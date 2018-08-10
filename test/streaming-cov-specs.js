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
var cov = require( '../src/streaming-cov.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-cov', function () {

  it( 'should return cov/covp of -275.8571/-241.375 respectively', function () {
    cov.compute( 10, 80 );
    cov.compute( 15, 75 );
    cov.compute( 16, 65 );
    cov.compute( 18, 50 );
    cov.compute( 21, 45 );
    cov.compute( 30, 30 );
    cov.compute( 36, 18 );
    cov.compute( 40, 9 );
    expect( cov.value( 2 ) ).to.equal( -275.86 );
    expect( cov.result().meanX ).to.equal( 23.25 );
    expect( cov.result().meanY ).to.equal( 46.5 );
    expect( cov.result().cov ).to.equal( -275.8571 );
    expect( cov.result().covp ).to.equal( -241.375 );
    expect( cov.result().size ).to.equal( 8 );
  } );

  it( 'should return all 0 with no data', function () {
    cov.reset();
    expect( cov.value() ).to.equal( 0 );
    expect( cov.result().meanX ).to.equal( 0 );
    expect( cov.result().meanY ).to.equal( 0 );
    expect( cov.result().cov ).to.equal( 0 );
    expect( cov.result().covp ).to.equal( 0 );
    expect( cov.result().size ).to.equal( 0 );
  } );

  it( 'should return cov/covp as 0 with zero variance', function () {
    cov.reset();
    cov.compute( 3, 3 );
    cov.compute( 3, 3 );
    expect( cov.value() ).to.equal( 0 );
    expect( cov.result().meanX ).to.equal( 3 );
    expect( cov.result().meanY ).to.equal( 3 );
    expect( cov.result().cov ).to.equal( 0 );
    expect( cov.result().covp ).to.equal( 0 );
    expect( cov.result().size ).to.equal( 2 );
  } );

  it( 'should return cov/covp of -205.9667/-171.64 after reset and with revised data', function () {
    cov.reset();
    cov.compute( 16, 65 );
    cov.compute( 18, 50 );
    cov.compute( 21, 45 );
    cov.compute( 30, 30 );
    cov.compute( 36, 18 );
    cov.compute( 40, 9 );
    expect( cov.value() ).to.equal( -205.9667 );
    expect( cov.result().meanX ).to.equal( 26.8333 );
    expect( cov.result().meanY ).to.equal( 36.1667 );
    expect( cov.result().cov ).to.equal( -205.9667 );
    expect( cov.result( 2 ).covp ).to.equal( -171.64 );
    expect( cov.result().size ).to.equal( 6 );
  } );
} );
