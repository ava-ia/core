'use strict';
import colors from 'colors';

const metadata = (request, level = 0) => {
  if (level === 0) console.log('\n');
  level = level + 1;
  const indent = new Array(level).join('  ');

  for (let property in request) {
    if (property === 'ms') continue;
    const value = request[property];
    const type = typeof(value);
    const isArray = Array.isArray(value) && value.length > 0;
    const arrayObjects = isArray && value[0] instanceof Object;

    if (type === 'string' || type === 'number' || (isArray && !arrayObjects)) {
      console.log(`${indent}${property.bold.magenta}: ${value.toString()}`);

    } else if (value instanceof Object && Object.keys(value).length > 0) {
      const ms = value.ms ? ` (${value.ms.toString().bold}ms)` : ''
      console.log(`${indent}${property.bold.magenta}${ms}:`);
      metadata(value, level);
    }
  }
}

export default metadata;
