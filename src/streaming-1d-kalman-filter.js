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

// Load wink helpers for validation.
var helpers = require( 'wink-helpers' );

// ### kalmanFilter1d

/**
 * Performs kalman filtering using the `kfModel`. It is a one-dimensional kalman
 * filter.
 * @private
 *
 * @param  {object} kfModel                       table below details the properties
 *                                                of `kfModel` object. It is an
 *                                                optional parameter.
 * @param  {number} [kfModel.processNoise=1]      defines process noise.
 * @param  {number} [kfModel.measurementNoise=1]  defines measurement noise.
 * @param  {number} [kfModel.control=0]           defines control.
 * @param  {number} [kfModel.measurement=1]       defines measurement.
 * @param  {number} [kfModel.stateTransition=1]   defines state transition.
 * @param  {number} [kfModel.threshold=Infinity]  defines the threshold value for
 *                                                innovation gate, beyond which a measurement
 *                                                is treated as an outlier. Its value should
 *                                                be set according the the Chi<sup>2</sup> distrubution
 *                                                for the required level of probability.
 * @param  {number} [kfModel.follow=truthy]       if truthy then filter follows the new
 *                                                measurement otherwise ignores the new
 *                                                measurement. As a result, filter() method
 *                                                returns null.
 * @return {Stream}                               Object containing following methods.
 *
 */
var kalmanFilter1d = function ( kfModel = Object.create( null ) ) {
  const model = Object.create( null );

  // `kfModel` should be a valid javascript object.
  if ( !helpers.validate.isObject( kfModel ) ) {
    throw Error( `streaming-kalman-filter: kfModel should be an object, instead found: ${typeof kfModel}` );
  }

  // Each config item should be a finite integer.
  for ( const key in kfModel ) {
    if ( !helpers.validate.isFiniteNumber( kfModel[ key ] ) ) {
      throw Error( `streaming-kalman-filter: kfModel.${key} should be a number, instead found: ${typeof kfModel[ key ]}` );
    }
  }

  // Set up configuration, while enforcing default values for the missing ones.
  // Q
  model.processNoise = ( kfModel.processNoise === undefined ) ? 1 : kfModel.processNoise;
  // R
  model.measurementNoise = ( kfModel.measurementNoise === undefined ) ? 1 : kfModel.measurementNoise;
  // G
  model.control = ( kfModel.control === undefined ) ? 0 : kfModel.control;
  // H
  model.measurement = ( kfModel.measurement === undefined ) ? 1 : kfModel.measurement;
  // F
  model.stateTransition = ( kfModel.stateTransition === undefined ) ? 1 : kfModel.stateTransition;
  // R(𝞤) threshold.
  model.threshold = ( kfModel.threshold === undefined ) ? ( Number.MAX_VALUE / 1000 ) : kfModel.threshold;
  // Follow (truthy) or exclude (falsy).
  model.follow = ( kfModel.follow === undefined ) ? 1 : kfModel.follow;

  // Returned.
  const methods = Object.create( null );
  // Last predictiion.
  let x;
  // P
  let errorCov;
  // K
  let kalmanGain;
  // ν
  let innovation;
  // S
  let innovationCov;
  // Measurement validation gate
  let innovationGate;

  var reset = function () {
    x = undefined;
    errorCov = undefined;
    kalmanGain = undefined;

    model.processNoise = kfModel.processNoise || 1;
    model.measurementNoise = kfModel.measurementNoise || 1;
    model.control = kfModel.control || 0;
    model.measurement = kfModel.measurement || 1;
    model.stateTransition = kfModel.stateTransition || 1;

  }; // reset()

  var init = function ( x0, errorCov0 ) {
    x = x0;
    errorCov = errorCov0;
  }; // init()

  var updateMeasurementNoise = function ( v ) {
    model.measurementNoise = ( helpers.validate.isFiniteNumber( v ) ) ? v : kfModel.measurementNoise;
  }; // updateMeasurementNoise()

  var updateProcessNoise = function ( v ) {
    model.processNoise = ( helpers.validate.isFiniteNumber( v ) ) ? v : kfModel.processNoise;
  }; // updateProcessNoise()

  var updateControl = function ( v ) {
    model.control = ( helpers.validate.isFiniteNumber( v ) ) ? v : kfModel.control;
  }; // updateControl()

  var predict = function ( z, u = 0 ) {
    // Handle the first-time prediction.
    if ( x === undefined ) {
      x = z / model.measurement;
      errorCov = model.measurementNoise / ( model.measurement * model.measurement );
      innovationGate = 0;
      return x;
    }

    // Predict:
    // Suffix `P` stands for predicted values e.g. `xP` or `errorCovP`.
    // xp = F.x + G.u
    const xP = ( model.stateTransition * x ) + ( model.control * u );
    // Pp = F.P.F + Q
    const errorCovP = ( model.stateTransition * errorCov * model.stateTransition ) + model.processNoise;

    // Compute innovation:
    // ν = z - H.xp
    innovation = ( z - ( model.measurement * xP ) );
    // S = H.Pp.H + R
    innovationCov = ( ( model.measurement * errorCovP * model.measurement ) + model.measurementNoise );

    // Update using innovation:
    // Compute Kalman Gain.
    // K = Pp.H/S
    kalmanGain = errorCovP * model.measurement / innovationCov;
    // xn = xp + K.ν
    let xNew = xP + ( kalmanGain * innovation );
    // Pn = Pp - K.S.K
    const errorCovNew = errorCovP - ( kalmanGain * innovationCov * kalmanGain );

    // Update `innovationCov` using `errorCovNew`, to compute the `innovationGate`.
    // S = H.Pp.H + R
    innovationCov = ( ( model.measurement * errorCovNew * model.measurement ) + model.measurementNoise );
    // R(𝞤) = ν.ν/S
    innovationGate = ( innovation * innovation / innovationCov );

    // If this measurement is an outlier & there is a need to chase the new
    // measurement (i.e. follow is truthy), do that here.
    if ( innovationGate > model.threshold && model.follow ) {
      xNew = ( z / model.measurement );
    }

    // Commit changes, if required otherwise exclude them.
    if ( ( innovationGate > model.threshold && model.follow ) || innovationGate < model.threshold ) {
      x = xNew;
      errorCov = errorCovNew;
      return x;
    }

    // Excluded means returnn `null`.
    return null;
  }; // predict()

  var isOutlier = function () {
    return ( innovationGate > model.threshold ) ? innovationGate : 0;
  }; // isOutliers()


  var getProbabilityOfThisMeasurement = function () {
    if ( innovationGate > 1000 ) return 0;

    let p0 = Math.exp( -innovationGate / 2 ) * Math.sqrt( 2 * innovationGate / Math.PI );

    let p1 = p0;
    for ( let a = 3; p1 > p0 * 1.0e-10; a += 2 ) {
      p1 *= innovationGate / a;
      p0 += p1;
    }

    return +( 1 - p0 ).toFixed( 6 );
  }; // getProbabilityOfThisMeasurement()

  methods.predict = predict;
  methods.compute = predict;
  methods.reset = reset;
  methods.init = init;
  methods.updateMeasurementNoise = updateMeasurementNoise;
  methods.updateProcessNoise = updateProcessNoise;
  methods.updateControl = updateControl;
  methods.isOutlier = isOutlier;
  methods.getProbabilityOfThisMeasurement = getProbabilityOfThisMeasurement;

  return methods;
}; // predict()

module.exports = kalmanFilter1d;
