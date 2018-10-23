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

// ## streaming

var getValidFD = require( './get-valid-fd.js' );

// ### slr (Simple Linear Regression)
/**
 *
 * Linear Regression is determined incrementally with arrival of each pair of `x`
 * and `y` values from the data stream.
 *
 * The [`compute()`](http://winkjs.org/wink-statistics/Stream.html#compute) requires
 * two numeric arguments viz. `x` — independant variable and `y` — dependant variable.
 *
 * The [`result()`](http://winkjs.org/wink-statistics/Stream.html#result) returns
 * an object containing `slope`, `intercept`, `r`, `r2`, `se` along with
 * the `size` of data i.e. number of x & y pairs. It has an alias
 * [`value()`](http://winkjs.org/wink-statistics/Stream.html#value).
 *
 * *In case of any error such as no
 * input data or zero variance, correlation object will be an empty one*.
 *
 * @memberof streaming#
 * @return {Stream} Object containing methods such as `compute()`, `result()` & `reset()`.
 * @example
 * var regression = simpleLinearRegression();
 * regression.compute( 10, 80 );
 * regression.compute( 15, 75 );
 * regression.compute( 16, 65 );
 * regression.compute( 18, 50 );
 * regression.compute( 21, 45 );
 * regression.compute( 30, 30 );
 * regression.compute( 36, 18 );
 * regression.compute( 40, 9 );
 * regression.result();
 * // returns { slope: -2.3621,
 * //   intercept: 101.4188,
 * //   r: -0.9766,
 * //   r2: 0.9537,
 * //   se: 5.624,
 * //   size: 8
 * // }
 */
var simpleLinearRegression = function () {
  var meanX = 0;
  var meanY = 0;
  var varX = 0;
  var varY = 0;
  var covXY = 0;
  var items = 0;
  // Returned!
  var methods = Object.create( null );

  methods.compute = function ( xi, yi ) {
    var dx, dy;
    items += 1;
    dx = xi - meanX;
    dy = yi - meanY;
    meanX += dx / items;
    meanY += dy / items;
    covXY += dx * ( yi - meanY );
    varX += dx * ( xi - meanX );
    varY += dy * ( yi - meanY );
    return undefined;
  }; // compute()

  methods.result = function ( fractionDigits ) {
    var model = Object.create( null );
    var fd = getValidFD( fractionDigits );
    if ( ( items > 1 ) && ( varX !== 0 ) && ( varY !== 0 ) ) {
      model.slope = +( covXY / varX ).toFixed( fd );
      model.intercept = +( meanY - ( model.slope * meanX ) ).toFixed( fd );
      model.r = +( covXY / Math.sqrt( varX * varY ) ).toFixed( fd );
      model.r2 = +( model.r * model.r ).toFixed( fd );
      model.se = +( Math.sqrt( varY / ( items - 1 ) ) * Math.sqrt( 1 - model.r2 ) ).toFixed( fd );
      model.size = items;
    }
    return model;
  }; // result()

  methods.reset = function () {
    meanX = 0;
    meanY = 0;
    varX = 0;
    varY = 0;
    covXY = 0;
    items = 0;
  }; // reset()

  // There is no single correlation value; create an alias!
  methods.value = methods.result;

  return methods;
}; // simpleLinearRegression()

module.exports = simpleLinearRegression;
