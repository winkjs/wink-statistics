# wink-statistics

Fast and Numerically Stable Statistical Analysis Utilities

### [![Build Status](https://api.travis-ci.org/winkjs/wink-statistics.svg?branch=master)](https://travis-ci.org/winkjs/wink-statistics) [![Coverage Status](https://coveralls.io/repos/github/winkjs/wink-statistics/badge.svg?branch=master)](https://coveralls.io/github/winkjs/wink-statistics?branch=master) [![Inline docs](https://inch-ci.org/github/winkjs/wink-statistics.svg?branch=master)](https://inch-ci.org/github/winkjs/wink-statistics) [![dependencies Status](https://david-dm.org/winkjs/wink-statistics/status.svg)](https://david-dm.org/winkjs/wink-statistics) [![devDependencies Status](https://david-dm.org/winkjs/wink-statistics/dev-status.svg)](https://david-dm.org/winkjs/wink-statistics?type=dev) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/winkjs/Lobby)

[<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >](https://winkjs.org/)

Perform fast and numerically stable statistical analysis using **`wink-statistics`**. It can handle **real-time stream of data** and can incrementally compute required statistic that usually would take more than one pass over the data as in standard deviation or simple linear regression.

### Functions
1. [Boxplot](https://winkjs.org/wink-statistics/data.html#.boxplot)
1. [Covariance](https://winkjs.org/wink-statistics/streaming.html#covariance)
1. [Difference with definable lag](https://winkjs.org/wink-statistics/data.html#.difference)
1. [Five Number Summary](https://winkjs.org/wink-statistics/data.html#.fiveNumSummary)
1. [Frequency Table](https://winkjs.org/wink-statistics/streaming.html#freqTable)
1. [Histogram](https://winkjs.org/wink-statistics/data.html#.histogram)
1. [Median Absolute Deviation (MAD)](https://winkjs.org/wink-statistics/data.html#.mad)
1. [Maximum](https://winkjs.org/wink-statistics/streaming.html#max)
1. [Mean](https://winkjs.org/wink-statistics/streaming.html#mean)
1. [Median](https://winkjs.org/wink-statistics/data.html#.median)
1. [Minimum](https://winkjs.org/wink-statistics/streaming.html#min)
1. [Numerically stable sum](https://winkjs.org/wink-statistics/streaming.html#sum)
1. [Percentile](https://winkjs.org/wink-statistics/data.html#.percentile)
1. [Probability computation & CI from successes count](https://winkjs.org/wink-statistics/probability.html#.range4CI)
1. [Probability  estimates aggregation](https://winkjs.org/wink-statistics/probability.html#.aggregate)
1. [Simple Linear Regression](https://winkjs.org/wink-statistics/streaming.html#simpleLinearRegression)
1. [Standard Deviation](https://winkjs.org/wink-statistics/streaming.html#stdev)
1. [Summary statistics](https://winkjs.org/wink-statistics/streaming.html#summary)

<table><tr><td>
    <h4>Use <a href="https://github.com/winkjs/wink-nlp">wink-nlp</a> if your are looking for an integrated NLP package✨</h4>
    <a href="https://github.com/winkjs/wink-nlp">WinkNLP</a> is a <b>developer friendly</b> JavaScript library for Natural Language Processing. Designed specifically to make development of NLP solutions <b>easier</b> and <b>faster</b>, winkNLP is optimized for the right balance of performance and accuracy. The package can handle large amount of raw text at speeds <a href="https://github.com/winkjs/wink-nlp#speed--accuracy">over 525,000 tokens/second</a> for the <a href="https://winkjs.org/wink-nlp/processing-pipeline.html">entire NLP pipeline</a>.
</td></tr></table>

## Installation

Use [npm](https://www.npmjs.com/package/wink-statistics) to install:

    npm install wink-statistics --save

## Getting Started

### Handling Streams
Here is an example of computing `slope`, `intercept` and `r2` etc. from a stream of `(x, y)` data in real-time:
```javascript
// Load wink-statistics.
var stats = require( 'wink-statistics' );
// Instantiate streaming simple linear regression
var regression = stats.streaming.simpleLinearRegression();
// Following would be ideally placed within a stream of data:
regression.compute( 10, 80 );
regression.compute( 15, 75 );
regression.compute( 16, 65 );
regression.compute( 18, 50 );
regression.compute( 21, 45 );
regression.compute( 30, 30 );
regression.compute( 36, 18 );
regression.compute( 40, 9 );
// Use result() method to access the outcome in real time.
regression.result();
// returns { slope: -2.3621,
//   intercept: 101.4188,
//   r: -0.9766,
//   r2: 0.9537,
//   se: 5.624,
//   size: 8
// }
```

### Handling data array
The functions under the `data` name space require data in an array. Here is an example of boxplot analysis:

```javascript
var boxplot = stats.data.boxplot;
var data = [
  -12, 14, 14, 14, 16, 18, 20, 20, 21, 23, 27, 27, 27, 29, 31,
  31, 32, 32, 34, 36, 40, 40, 40, 40, 40, 42, 51, 56, 60, 88
];

boxplot( data );
// returns {
//   min: -12, q1: 20, median: 31, q3: 40, max: 88,
//   iqr: 20, range: 100, size: 30,
//   leftOutliers: { begin: 0, end: 0, count: 1, fence: 14 },
//   rightOutliers: { begin: 29, end: 29, count: 1, fence: 60 },
//   leftNotch: 25.230655727612252,
//   rightNotch: 36.76934427238775
// }
```

`wink-stats` can handle data in different formats to avoid pre-processing. For example,  you can compute median from the array of objects containing value:

```javascript
var median = stats.data.median;
var data =  [
  { value: 1 },
  { value: 1 },
  { value: 2 },
  { value: 2 },
  { value: 3 },
  { value: 3 },
  { value: 4 },
  { value: 4 }
];
// Use key name — `value` as the `accessor`
median( data, 'value' );
// returns 2.5
```

It even supports passing functions as `accessors` to handle even more complex data structures.

## Documentation
Check out the [statistics API documentation](https://winkjs.org/wink-statistics/) to learn more.

## Need Help?

If you spot a bug and the same has not yet been reported, raise a new [issue](https://github.com/winkjs/wink-statistics/issues) or consider fixing it and sending a pull request.

## About wink
[Wink](https://winkjs.org/) is a family of open source packages for **Statistical Analysis**, **Natural Language Processing** and **Machine Learning** in NodeJS. The code is **thoroughly documented** for easy human comprehension and has a **test coverage of ~100%** for reliability to build production grade solutions.

## Copyright & License

**wink-statistics** is copyright 2017-20 [GRAYPE Systems Private Limited](https://graype.in/).

It is licensed under the terms of the MIT License.
