'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _processor = require('./processor.compromise');

Object.defineProperty(exports, 'compromise', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_processor).default;
  }
});

var _processor2 = require('./processor.taxonomy');

Object.defineProperty(exports, 'taxonomy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_processor2).default;
  }
});

var _processor3 = require('./processor.relations');

Object.defineProperty(exports, 'relations', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_processor3).default;
  }
});

var _processor4 = require('./processor.sentiment');

Object.defineProperty(exports, 'sentiment', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_processor4).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }