// Load Wink Statistics
var ws = require( 'wink-statistics' );
ws.stats.percentile( [ 1, 1, 2, 2, 3, 3, 4, 4 ], 0.25 );
// returns 1.25
