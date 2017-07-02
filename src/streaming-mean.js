// ## streaming

// ### mean
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, and `reset()` functions.
 * Use `compute()` to continuously determine the **mean** value of data items passed to it in real-time.
 * Probe the mean anytime using `result()`, which may be reset via `reset()`. The `result()` returns
 * an object containing `mean` along with `size` of data. The computations are carried out using method pioneered
 * by B. P. Welford.
 *
 * @return {object} — containing `compute`, `result`, and `reset` functions.

 *
 * @example
 * var avg = mean();
 * avg.compute( 2 );
 * avg.compute( 3 );
 * avg.compute( 5 );
 * avg.compute( 7 );
 * avg.result();
 * // returns { n: 4, mean: 4.25 }
 */
var mean = function () {
  var mean1 = 0;
  var items = 0;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    items += 1;
    mean1 += ( di - mean1 ) / items;
    return undefined;
  }; // compute()

  methods.result = function () {
    return { size: items, mean: mean1 };
  }; // result()

  methods.reset = function () {
    mean1 = 0;
    items = 0;
  }; // reset()

  return methods;
}; // mean()

module.exports = mean;
