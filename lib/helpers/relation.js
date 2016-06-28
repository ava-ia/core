'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (keys, state) {
  var relations = state.relations || {};
  var found = {};
  keys.filter(function (key) {
    return relations[key] ? found[key] = relations[key].text : null;
  });

  return found;
};