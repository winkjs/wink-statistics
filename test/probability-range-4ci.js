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
