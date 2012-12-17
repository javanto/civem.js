# Custom Input Validation Error Messages

HTML5 form validation error messages are hard-coded to the browser. Civem.js lets you easily change them to whatever you wish. For translation or consistency with your server-side error messages. Civem.js does not depend on any library or framework, so you can use it without a doubt.

## Quick Start

1. Grab the latest [download](https://github.com/javanto/civem.js/downloads)
1. Add the civem.js script to your page 
1. Start using the custom error message attributes on your `input`, `textarea` and `select` elements

## API

Any `input`, `textarea` or `select` element may contain:

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

## Demo

At [jsFiddle](http://jsfiddle.net/hleinone/njSbH/).

## Tested on

* Firefox 17.0.1
* Chrome 23.0.1271.97

## Developing

1. Fork
1. Make your modifications
1. Commit
1. Make sure you have [node](http://nodejs.org/) and [npm](http://npmjs.org/) installed
1. Install the required dependencies: `npm install node-fs dot uglify-js gits read needle`
1. Install [jake](https://github.com/mde/jake): `npm install jake -g`
1. Compile and minify: `jake` 
1. Test
1. Create a pull request
1. ???
1. Profit!
