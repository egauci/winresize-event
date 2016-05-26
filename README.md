winresize-event
===============

Debounced window resize suitable for desktop and mobile browsers.

NOTE: This module is deprecated in favor of [viewport-event](https://github.com/egauci/viewport-event).

Install
-------

    npm install --save winresize-event

Usage
-----

    var wr = require('winresize-event');

    wr.winResize.on(function(winDimensions) {
      console.log(winDimensions);
    });

For sychronous use:

    console.log(wr.getWinSize());

winResize also has .once and .removeListener methods.
