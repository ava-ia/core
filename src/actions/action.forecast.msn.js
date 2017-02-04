import moment from 'moment';
import weather from 'weather-js';
import { entities, relation, request } from '../helpers';
// -- Internal
const RELATIONS = ['when', 'location'];

const determineCondition = function(condition = {}, forecast = [], when) {
  let value = {
    code: condition.skycode,
    condition: condition.skytext,
    temperature: condition.temperature,
    humidity: condition.humidity,
    wind: condition.windspeed,
    date: moment(condition.date, 'YYYY-MM-DD').format(),
  };

  if (when) {
    const day = forecast.find((item) => {
      return moment(item.date, 'YYYY-MM-DD').isSame(when, 'day');
    });
    if (day) {
      value = {
        code: day.skycodeday,
        condition: day.skytextday,
        temperature: [day.low, day.high],
        date: moment(day.date, 'YYYY-MM-DD').format(),
      };
    }
  }
  return value;
};

export default (state) => {
  return new Promise((resolve) => {
    const { location, when } = relation(RELATIONS, state);
    const ms = new Date();
    if (state.debug) {
      console.log('ActionForecastMSN'.bold.yellow, `location: ${location}, when: ${when}`);
    }

    if (!location) return resolve(request(state, { relation: ['location'] }));

    weather.find({ search: location, degreeType: 'C' }, (error, response) => {
      if (!error) {
        const item = response[0];
        const condition = determineCondition(item.current, item.forecast, when);
        state.action = {
          ms: (new Date() - ms),
          engine: 'msn',
          entity: entities.knowledge,
          title: `Conditions for ${item.location.name} at ${item.current.observationtime}`,
          value: condition,
        };
        if (!when) state.action.related = item.forecast;

        resolve(state);
      }
    });
  });
};
