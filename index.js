'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _touchJs = require('./touch.js');

var _touchJs2 = _interopRequireDefault(_touchJs);

/*
 * Debounced window resize event emitter.
 * Exports an object with three methods: on, removeListener, and once.
 * Each of the methods takes a listener function as its only parameter.
 * The listener receives an object with height and width properties.
 * Also exports a function to retrieve the same height & width object synchronously.
 */

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var tmr = undefined,
    timVal = _touchJs2['default'] ? 1 : 300,
    emitter = new _events2['default'](),
    pubEmitter = {
  on: emitter.on.bind(emitter, 'winResize'),
  removeListener: emitter.removeListener.bind(emitter, 'winResize'),
  once: emitter.once.bind(emitter, 'winResize')
},
    height = undefined,
    width = undefined;

var computeSize = function computeSize() {
  if (_touchJs2['default'] && window.orientation !== undefined) {
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
  return { height: height, width: width };
};

var emitResize = function emitResize() {
  if (tmr) {
    clearTimeout(tmr);
    tmr = null;
  }
  emitter.emit('winResize', computeSize());
};

var getWinSize = function getWinSize() {
  return computeSize();
};

window.addEventListener('resize', function () {
  if (tmr) {
    clearTimeout(tmr);
  }
  tmr = setTimeout(emitResize, timVal);
});

exports.winResize = pubEmitter;
exports.getWinSize = getWinSize;
