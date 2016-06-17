'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var credentials = (0, _helpers.config)('themoviedb');
var RELATIONS = ['object'];

var action = function action(state) {
  if (!credentials) return state;

  return new Promise(function (resolve, reject) {
    var ms = new Date();

    var _ref = (0, _helpers.relation)(RELATIONS, state.nlp.relations) || state.nlp.concepts;

    var object = _ref.object;

    console.log('ActionMovieDB'.bold.yellow, 'object: ' + object);

    var url = credentials.url + '/3/search/multi?api_key=' + credentials.apikey + '&query=' + object;
    (0, _nodeFetch2.default)(url).then(function (response) {
      return response.text();
    }).then(function (body) {
      var data = JSON.parse(body).results[0];
      if (data) {
        state.action = _extract(data);
        state.action.ms = new Date() - ms;
        state.action.engine = 'themoviedb';
        state.action.type = _constants2.default.action.type.rich;
      }

      resolve(state);
    });
  });
};

var _extract = function _extract(data) {
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
    item.entity = _constants2.default.entity.person;
    item.embed = data.known_for.map(function (movie) {
      return _extract(movie);
    });
  }

  return item;
};

exports.default = action;