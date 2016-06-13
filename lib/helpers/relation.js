'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (keys, relations) {
  var found = {};
  // keys.map(key => console.log(key))
  keys.filter(function (key) {
    return relations[key] ? found[key] = relations[key].text : null;
  });
  // console.log('ss', found);
  return found;
};