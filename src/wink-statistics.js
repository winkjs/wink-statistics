//     wink-statistics
//     Fast and Numerically Stable Statistical Analysis Utilities.
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-utils”.
//
//     “wink-utils” is free software: you can redistribute it
//     and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-utils” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-utils”.
//     If not, see <http://www.gnu.org/licenses/>.

var ws = Object.create( null );
// Probability name space.
ws.probability = Object.create( null );
// 1. range4CI
ws.probability.range4CI = require( './probability-range-4ci.js' );
// 2. aggregate
ws.probability.aggregate = require( './probability-aggregate.js' );

// Stats name space.
ws.stats = Object.create( null );
// 1. boxplot
ws.stats.boxplot = require( './stats-boxplot.js' );
// 2. fiveNumSummary
ws.stats.fiveNumSummary = require( './stats-five-num-summary.js' );
// 3. histogram
ws.stats.histogram = require( './stats-histogram.js' );
// 4. mad
ws.stats.mad = require( './stats-mad.js' );
// 5. max
ws.stats.max = require( './stats-max.js' );
// 6. mean
ws.stats.mean = require( './stats-mean.js' );
// 7. median
ws.stats.median = require( './stats-median.js' );
// 8. min
ws.stats.min = require( './stats-min.js' );
// 9. percentile
ws.stats.percentile = require( './stats-percentile.js' );
// 10. stdev
ws.stats.stdev = require( './stats-stdev.js' );

// Streaming name space.
ws.streaming = Object.create( null );
// 1. freqTable
ws.streaming.freqTable = require( './streaming-freq-table.js' );
// 2. max
ws.streaming.max = require( './streaming-max.js' );
// 3. mean
ws.streaming.mean = require( './streaming-mean.js' );
// 4. min
ws.streaming.min = require( './streaming-min.js' );
// 5. stdev
ws.streaming.stdev = require( './streaming-stdev.js' );
// 6. sum
ws.streaming.sum = require( './streaming-sum.js' );
// 7. summary
ws.streaming.summary = require( './streaming-summary.js' );

module.exports = ws;
