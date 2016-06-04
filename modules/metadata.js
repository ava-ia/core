'use strict';
import colors from 'colors';
// -- Internal
const HIDDEN_PROPERTIES = ['actions', 'composer', 'ms', 'intents'];

const metadata = (request, color, level = 0) => {
  if (level === 0) console.log('\n');
  level = level + 1;
  const indent = new Array(level).join('  ');

  for (let property in request) {
    if (HIDDEN_PROPERTIES.indexOf(property) !== -1) continue;
    const value = request[property];
    const type = typeof(value);
    const isArray = Array.isArray(value) && value.length > 0;
    const arrayObjects = isArray && value[0] instanceof Object;

    if (type === 'string' || type === 'number' || (isArray && !arrayObjects)) {
      console.log(`${indent}${property.bold[color]}: ${value.toString()}`);

    } else if (value instanceof Object && Object.keys(value).length > 0) {
      const ms = value.ms ? ` (${value.ms.toString().bold}ms)` : ''
      console.log(`${indent}${property.bold[color]}${ms}:`);
      metadata(value, color, level);
    }
  }
}

export default metadata;
