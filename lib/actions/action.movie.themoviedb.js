'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var credentials = (0, _helpers.config)('themoviedb');
var RELATIONS = ['object', 'subject'];

var extract = function extract(data) {
  var item = {
    date: data.release_date || data.first_air_date,
    image: 'http://image.tmdb.org/t/p/w320' + (data.poster_path || data.profile_path),
    text: data.overview,
    title: data.title || data.name,
    value: {
      id: data.id,
      popularity: data.popularity,
      vote_average: data.vote_average
    }
  };

  if (data.media_type === 'person') {
    item.entity = _helpers.entities.person;
    item.related = data.known_for.map(function (movie) {
      return extract(movie);
    });
  }

  return item;
};

exports.default = function (state) {
  if (!credentials) return state;

  return new _promise2.default(function (resolve) {
    var ms = new Date();

    var _relation = (0, _helpers.relation)(RELATIONS, state),
        object = _relation.object,
        subject = _relation.subject;

    var query = object || subject || state.relations;
    if (state.debug) {
      console.log('ActionMovieDB'.bold.yellow, 'subject: ' + subject, 'object: ' + object);
    }

    (0, _nodeFetch2.default)(credentials.url + '/3/search/multi?api_key=' + credentials.apikey + '&query=' + query).then(function (response) {
      return response.json();
    }).then(function (body) {
      var data = body.results[0];
      if (data) {
        state.action = extract(data);
        state.action.ms = new Date() - ms;
        state.action.engine = 'themoviedb';
        state.action.entity = _helpers.entities.knowledge;
      }

      resolve(state);
    });
  });
};