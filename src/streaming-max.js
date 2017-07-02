// ## streaming

// ### max
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, and `reset()` functions.
 * Use `compute()` to continuously determine the **maximum** value of data items passed to it in real-time.
 * Probe the maximum value anytime using `result()`, which may be reset via `reset()`.  The `result()` returns
 * an object containing `max` of data.
 *
 * @return {object} — containing `compute`, `result`, and `reset` functions.

 *
 * @example
 * var maximum = max();
 * maximum.compute( 3 );
 * maximum.compute( 6 );
 * maximum.result();
 * // returns { min: 6 }
 */
var max = function () {
  var maximum = -Infinity;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    maximum = ( maximum < di ) ? di : maximum;
    return undefined;
  }; // compute()

  methods.result = function () {
    return { max: maximum };
  }; // result()

  methods.reset = function () {
    maximum = -Infinity;
  }; // reset()

  return methods;
}; // max()

 module.exports = max;
