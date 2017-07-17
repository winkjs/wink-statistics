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
