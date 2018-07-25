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
var mad = require( '../src/stats-mad.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'stats-mad normal behaviour', function () {
  var data1 = [ 1, 1, 2, 2, 3, 3, 4, 4 ];
  var data2 = [ { x: 2 }, { x: 3 }, { x: 5 }, { x: 7 } ];

  it( 'should return minimum 1 & 1.5 respectively with data1 & data2 respectively', function () {
    expect( +mad( data1 ).toFixed( 2 ) ).to.equal( 1 );
    expect( mad( data2, 'x' ) ).to.equal( 1.5 );
    expect( mad( data2, ( e ) =>  e.x ) ).to.equal( 1.5 );
  } );
} );

describe( 'stats-max error behaviour', function () {
  it( 'should throw error with wrong data-type or empty array', function () {
    expect( () => mad( 3 ) ).to.throw( 'stats-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => mad( [] ) ).to.throw( 'stats-percentile: sortedData should be an array of length > 0, instead found' );
    expect( () => mad( [ { x: 3 } ], {} ) ).to.throw( 'accessor: expecting undefined, string, number, or function, instead found: object' );
  } );
} );
