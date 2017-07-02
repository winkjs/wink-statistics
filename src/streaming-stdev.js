// ## streaming

// ### stdev
/**
 *
 * It is a higher order function that returns an object containing `compute()`, `result()`, `resultPE()`, and `reset()` functions.
 * Use `compute()` to continuously determine the **standard deviation** value of data items passed to it in real-time.
 * Probe the standard deviation anytime using `result()`, which may be reset via `reset()`. The `result()` returns
 * an object containing `stdev` along with `variance`, `mean`, and `size` of data. Use `resultPE()` to
 * obtain the population estimate of variance and standard deviation. The computations are carried out using method pioneered
 * by B. P. Welford.
 *
 * @return {object} — containing `compute`, `result`, `resultPE`, and `reset` functions.

 *
 * @example
 * var sd = mean();
 * sd.compute( 2 );
 * sd.compute( 3 );
 * sd.compute( 5 );
 * sd.compute( 7 );
 * sd.result();
 * // returns { n: 4, mean: 4.25,
 * //   variance: 3.6874999999999996,
 * //   stdev: 1.920286436967152
 * // }
 */
var stdev = function () {
  var mean = 0;
  var varianceXn = 0;
  var items = 0;
  var methods = Object.create( null );

  methods.compute = function ( di ) {
    var prevMean;
    items += 1;
    prevMean = mean;
    mean += ( di - mean ) / items;
    varianceXn += ( di - prevMean ) * ( di - mean );
    return undefined;
  }; // compute()

  // This returns the sample's variance and standard deviation.
  methods.result = function () {
    var variance = varianceXn / items;
    var stdev1 = Math.sqrt( variance );
    return { size: items, mean: mean, variance: variance, stdev: stdev1 };
  }; // result()

  // This returns population estimate of variance and standard deviation.
  methods.resultPE = function () {
    var variance = ( items ) ? ( varianceXn / ( items - 1 ) ) : 0;
    var stdev1 = Math.sqrt( variance );
    return { size: items, mean: mean, variance: variance, stdev: stdev1 };
  }; // resultPE()

  methods.reset = function () {
    mean = 0;
    varianceXn = 0;
    items = 0;
  }; // reset()

  return methods;
}; // stdev()

module.exports = stdev;
