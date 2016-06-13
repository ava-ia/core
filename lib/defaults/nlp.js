'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _processors = require('./processors');

var _helpers = require('../helpers');

exports.default = function (state) {
  var time = new Date();
  var factory = (0, _helpers.composeAsync)(_processors.compromise, _processors.taxonomy, _processors.relations, _processors.sentiment);

  return new Promise(function (resolve, reject) {
    state.sentence = state.sentence.toLowerCase();
    state.nlp = {};

    factory(state).then(function (state) {
      state.nlp.ms = new Date() - time;
      resolve(state);
    }).catch(function (error) {
      return reject(error);
    });
  });
};