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
var ft = require( '../src/streaming-freq-table.js' )();

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'streaming-freq-table', function () {
  var data = [ 'Tea', 'Tea', 'Tea', 'Pepsi', 'Pepsi', 'Gin', 'Coke', 'Coke' ];
  var table = [
    { category: 'Tea', observed: 3, percentage: 37.5, expected: 2 },
    { category: 'Pepsi', observed: 2, percentage: 25, expected: 2 },
    { category: 'Coke', observed: 2, percentage: 25, expected: 2 },
    { category: 'Gin', observed: 1, percentage: 12.5, expected: 2 }
  ];
  var i;

  it( 'should return detailed frequency table when input is ' + JSON.stringify( data ), function () {
    for ( i = 0; i < data.length; i += 1 ) {
      ft.build( data[ i ] );
    }
    expect( ft.value() ).to.deep.equal( { Tea: 3, Pepsi: 2, Gin: 1, Coke: 2 } );
    expect( ft.result().size ).to.equal( 4 );
    expect( ft.result().sum ).to.equal( 8 );
    expect( ft.result().x2 ).to.equal( 1 );
    expect( ft.result().df ).to.equal( 3 );
    expect( +ft.result().entropy.toFixed( 2 ) ).to.equal( 1.91 );
    expect( ft.result().table ).to.deep.equal( table );
  } );

  it( 'should return empty results when input is no data', function () {
    ft.reset();
    expect( ft.result().size ).to.equal( 0 );
    expect( ft.result().sum ).to.equal( 0 );
    expect( ft.result().x2 ).to.equal( 0 );
    expect( ft.result().df ).to.equal( -1 );
    expect( ft.result().entropy ).to.equal( 0 );
    expect( ft.result().table ).to.deep.equal( [] );
  } );
} );
