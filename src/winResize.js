import isTouch from 'has-touch';

/*
 * Debounced window resize event emitter.
 * Exports an object with three methods: on, removeListener, and once.
 * Each of the methods takes a listener function as its only parameter.
 * The listener receives an object with height and width properties.
 * Also exports a function to retrieve the same height & width object synchronously.
 */

import EventEmitter from 'events';

let tmr,
    timVal = isTouch ? 1 : 300,
    emitter = new EventEmitter(),
    pubEmitter = {
      on: emitter.on.bind(emitter, 'winResize'),
      removeListener: emitter.removeListener.bind(emitter, 'winResize'),
      once: emitter.once.bind(emitter, 'winResize')
    },
    height,
    width;

let computeSize = function () {
  if (isTouch && window.orientation !== undefined) {
    if (window.orientation === 0 || window.orientation === 180) {
      height = Math.max(window.innerHeight, window.innerWidth);
      width = Math.min(window.innerHeight, window.innerWidth);
    } else {
      height = Math.min(window.innerHeight, window.innerWidth);
      width = Math.max(window.innerHeight, window.innerWidth);
    }
  } else {
    height = window.innerHeight;
    width = window.innerWidth;
  }
  return {height, width};
};

let emitResize = function () {
  if (tmr) {
    clearTimeout(tmr);
    tmr = null;
  }
  emitter.emit('winResize', computeSize());
};

let getWinSize = function () {
  return computeSize();
};

window.addEventListener('resize', function () {
  if (tmr) {
    clearTimeout(tmr);
  }
  tmr = setTimeout(emitResize, timVal);
});

export {pubEmitter as winResize, getWinSize};
