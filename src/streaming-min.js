// ## streaming

// ### min
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, and `reset()` functions.
 * Use `compute()` to continuously determine the **minimum** value of data items passed to it in real-time.
 * Probe the minimum value anytime using `result()`, which may be reset via `reset()`.  The `result()` returns
 * an object containing `min` of data.
 *
 * @return {object} — containing `compute`, `result`, and `reset` functions.

 *
 * @example
 * var minimum = min();
 * minimum.compute( 3 );
 * minimum.compute( 6 );
 * minimum.result();
 * // returns { min: 3 }
 */
var min = function () {
  var minimum = Infinity;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    minimum = ( minimum > di ) ? di : minimum;
    return undefined;
  }; // compute()

  methods.result = function () {
    return { min: minimum };
  }; // result()

  methods.reset = function () {
    minimum = Infinity;
  }; // reset()

  return methods;
}; // min()

module.exports = min;
