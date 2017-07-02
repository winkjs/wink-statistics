// ## streaming

// Load wink helpers for object to array conversion & sorting.
var helpers = require( 'wink-helpers' );

// ### freqTable
/**
 *
 * It is a higher order function that returns an object containing `build()`, `result()`, and `reset()` functions.
 * Use `build()` to construct a frequency table from value of data items passed to it in real-time.
 * Probe a set of statistic anytime using `result()`, which may be reset via `reset()`.  The `result()` returns
 * an object containing the frequency `table` sorted in descending order of category counts or frequency, along
 * with it's `size`, `sum` of all counts, `x2` - chi-squared statistic, `df` - degree of freedom, and the
 * `entropy`.
 *
 * The `x2` along with the `df` can be used test the hypothesis that "the distribution is a uniform one". The
 * `percentage` in `table` give the percentage of a category count against the `sum`; and `expected` is the count
 * assuming an uniform distribution.
 *
 * @return {object} — containing `compute`, `result`, and `reset` functions.

 *
 * @example
 * var ft = freqTable();
 * ft.build( 'Tea' );
 * ft.build( 'Tea' );
 * ft.build( 'Tea' );
 * ft.build( 'Pepsi' );
 * ft.build( 'Pepsi' );
 * ft.build( 'Gin' );
 * ft.build( 'Coke' );
 * ft.build( 'Coke' );
 * ft.result();
 * // returns {
 * //  table: [
 * //   { category: 'Tea', observed: 3, percentage: 37.5, expected: 2 },
 * //   { category: 'Pepsi', observed: 2, percentage: 25, expected: 2 },
 * //   { category: 'Coke', observed: 2, percentage: 25, expected: 2 },
 * //   { category: 'Gin', observed: 1, percentage: 12.5, expected: 2 }
 * //  ],
 * //  size: 4,
 * //  sum: 8,
 * //  x2: 1,
 * //  df: 3,
 * //  entropy: 1.9056390622295665
 * // }
 */
var freqTable = function () {
  var obj = Object.create( null );
  var methods = Object.create( null );
  var sum = 0;

  methods.build = function ( x ) {
    obj[ x ] = 1 + ( obj[ x ] || 0 );
    sum += 1;
    return undefined;
  }; // compute()

  methods.result = function () {
    var t = helpers.object.table( obj );
    var imax = t.length;
    var table = new Array( imax );
    var expectedVal = sum / imax;
    var x2 = 0;
    var entropy = 0;
    var p;
    var diff;
    t.sort( helpers.array.descendingOnValue );
    for ( var i = 0;  i < imax; i += 1 ) {
      table[ i ] = Object.create( null );
      table[ i ].category = t[ i ][ 0 ];
      table[ i ].observed = t[ i ][ 1 ];
      p = t[ i ][ 1 ] / sum;
      table[ i ].percentage = ( p * 100 );
      table[ i ].expected = expectedVal;
      diff = ( t[ i ][ 1 ] - expectedVal );
      x2 += ( diff * ( diff / expectedVal ) );
      entropy += -p * Math.log2( p );
    }
    return {
      table: table,
      size: imax,
      sum: sum,
      x2: +x2.toFixed( 3 ),
      df: ( imax - 1 ),
      entropy: entropy
    };
  }; // result()

  methods.reset = function () {
    obj = Object.create( null );
  }; // reset()

  methods.compute = methods.build;
  return methods;
}; // freqTable()

module.exports = freqTable;
