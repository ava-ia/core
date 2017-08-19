import moment from 'moment';
import weather from 'weather-js';
import { entities, relation, trace } from '../helpers';
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
    const day = forecast.find(item => moment(item.date, 'YYYY-MM-DD').isSame(when, 'day'));
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
  const { location, when } = relation(RELATIONS, state);

  return new Promise((resolve) => {
    if (!location) return resolve({ entity: entities.request, request: { relation: ['location'] } });

    return weather.find({ search: location, degreeType: 'C' }, (error, response) => {
      trace('ActionForecastMSN', { location, when }, state);

      if (!error) {
        const item = response[0];
        const condition = determineCondition(item.current, item.forecast, when);

        resolve({
          engine: 'msn',
          entity: entities.knowledge,
          title: `Conditions for ${item.location.name} at ${item.current.observationtime}`,
          value: condition,
          related: !when ? item.forecast : undefined,
        });
      }
    });
  });
};
