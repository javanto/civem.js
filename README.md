# Custom Input Validation Error Messages

Easily change the HTML5 validation error messages to whatever you wish. For translation or consistency with your server-side error messages.

## Quick Start

Grab the latest [download](https://github.com/javanto/civem.js/downloads) and use `data-errormessage` and `data-errormessage-*` attributes on your `input` elements.

## API

Any `input` element may contain:

* `data-errormessage` a generic error message

[Validity state](http://dev.w3.org/html5/spec/constraints.html#validitystate) specific error messages:
* `data-errormessage-value-missing`
* `data-errormessage-type-mismatch`
* `data-errormessage-pattern-mismatch`
* `data-errormessage-too-long`
* `data-errormessage-range-underflow`
* `data-errormessage-range-overflow`
* `data-errormessage-step-mismatch`
* `data-errormessage-custom-error`

## [Demo](http://jsfiddle.net/hleinone/njSbH/)

## Tested on

* Firefox 10.0.2
* Chrome 17.0.963.56

## Developing

1. Fork
1. Clone your fork
1. Make your modifications
1. Commit
1. Make sure you have [node](http://nodejs.org/) and [npm](http://npmjs.org/) installed
1. Install the required dependencies: `npm install node-fs dot uglify-js gits read needle`
1. Install [jake](https://github.com/mde/jake): `npm install jake -g`
1. Compile, minify and publish: `jake publish` 
1. Test
1. Create pull request
1. ???
1. Profit!
