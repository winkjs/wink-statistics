# wink-statistics

Fast and Numerically Stable Statistical Analysis Utilities

### [![Build Status](https://api.travis-ci.org/winkjs/wink-statistics.svg?branch=master)](https://travis-ci.org/winkjs/wink-statistics) [![Coverage Status](https://coveralls.io/repos/github/winkjs/wink-statistics/badge.svg?branch=master)](https://coveralls.io/github/winkjs/wink-statistics?branch=master) [![Inline docs](http://inch-ci.org/github/winkjs/wink-statistics.svg?branch=master)](http://inch-ci.org/github/winkjs/wink-statistics) [![dependencies Status](https://david-dm.org/winkjs/wink-statistics/status.svg)](https://david-dm.org/winkjs/wink-statistics) [![devDependencies Status](https://david-dm.org/winkjs/wink-statistics/dev-status.svg)](https://david-dm.org/winkjs/wink-statistics?type=dev) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/winkjs/Lobby)

<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >

Perform fast and numerically stable statistical analysis using **`wink-statistics`**. Apart from arrays, it can handle **real-time stream of data** and can incrementally compute required statistic that usually would take more than one pass over the data as in standard deviation or simple linear regression.

### Installation

Use [npm](https://www.npmjs.com/package/wink-statistics) to install:

    npm install wink-statistics --save

### Getting Started

#### Handling Streams
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

#### Handling data array
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

### Documentation
Check out the [statistics API documentation](http://winkjs.org/wink-statistics/) to learn more.

### Need Help?

If you spot a bug and the same has not yet been reported, raise a new [issue](https://github.com/winkjs/wink-statistics/issues) or consider fixing it and sending a pull request.

### About wink
[Wink](http://winkjs.org/) is a family of open source packages for **Statistical Analysis**, **Natural Language Processing** and **Machine Learning** in NodeJS. The code is **thoroughly documented** for easy human comprehension and has a **test coverage of ~100%** for reliability to build production grade solutions.

### Copyright & License

**wink-statistics** is copyright 2017-18 [GRAYPE Systems Private Limited](http://graype.in/).

It is licensed under the terms of the MIT License.
