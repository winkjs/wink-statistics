// ## probability

// ### aggregate
/**
 *
 * Aggregates two probability estimates from independent sources about the occurrence of
 * a **single** event **a**. It returns the aggregated probability of occurrence
 * of the event **a**. The assumption here is that the two probabilities
 * (estimates) are not correlated with each other and the **common prior**
 * probability of **a** is **0.5**.
 *
 * For a detailed explanation, refer to the paper titled
 * *[Bayesian Group Belief by Franz Dietrich](http://link.springer.com/article/10.1007/s00355-010-0453-x)*
 * published in Social Choice and Welfare October 2010, Volume 35, Issue 4, pp 595–626.
 *
 * @param {number} pa1 — first estimate of probability of occurrence of event **a**.
 * @param {number} pa2 — second estimate of probability of occurrence of event **a**.
 * @return {number} — the aggregated probability.
 *
 * @example
 * aggregate( 0.5, 0.6 );
 * // returns 0.6
 * aggregate( 0.5, 0.4 );
 * // returns 0.4
 * aggregate( 0.6, 0.6 );
 * // returns 0.6923076923076923
 * aggregate( 0.4, 0.6 );
 * // returns 0.5
 */
var aggregate = function ( pa1, pa2 ) {
  return ( ( pa1 * pa2 ) / ( ( pa1 * pa2 ) + ( ( 1 - pa1 ) * ( 1 - pa2 ) ) ) );
}; // aggregate()

module.exports = aggregate;
