//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis.
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-statistics”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var isFiniteInteger = require( 'wink-helpers' ).validate.isFiniteInteger;
var stdev = require( 'wink-statistics' ).streaming.stdev();

var sma = function ( period ) {
  var size = ( isFiniteInteger( period ) && period > 0 ) ? period : 3;
  var slidingWindow = [];
  var movingAverage = 0;
  var items = 0;
  var coef = 2.4;
  var minObservations = 6;

  var methods = Object.create( null );

  methods.capIfOutlier = function ( dataElem ) {
    var data = dataElem;
    // Lower & upper limits for capping; computed as mean -/+ coef * stdev
    var lower, upper;
    // Temp for result.
    var r;

    r = stdev.result();
    if ( r.size >= minObservations ) {
      lower = r.mean - ( coef * r.stdev );
      upper = r.mean + ( coef * r.stdev );
      data = ( data < lower ) ?
                lower : ( data > upper ) ?
                  upper : data;
    }
    // Use `data` instead of `dataElem` — conservative approach.
    stdev.compute( data );
    return data;
  }; // capIfOutlier()

  methods.forecast = function ( dataElem ) {
    var outgoingElem;

    var incomingElem = ( dataElem );
    slidingWindow.push( incomingElem );
    items += 1;
    if ( items <= size ) {
      // While you have not exceeded the `size`, compute mean traditionally.
      movingAverage += ( incomingElem - movingAverage ) / ( items );
    } else {
      // After exceeding the `size`, update the mean i.e. account for impact
      // of both incoming and the outgoing element.
      outgoingElem = slidingWindow.shift();
      movingAverage += ( incomingElem - outgoingElem ) / size;
    }
    // Return movingAverage i.e. the forecast.
    if ( isNaN( movingAverage ) ) throw Error( movingAverage );
    return movingAverage;
  }; // forecast()

  methods.value = function () {
    return movingAverage;
  };


  methods.reset = function ( newPeriod ) {
    size = isFiniteInteger( newPeriod ) || 3;
    slidingWindow = [];
    movingAverage = 0;
    items = 0;
    stdev.reset();
  }; // reset()

  return methods;
}; // sma()

module.exports = sma;

//
//
