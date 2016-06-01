'use strict';

export default (ava, request, relation) => {
  let location = relation.location;
  let when = relation.when;

  ava.output('ActionForecastIO'.yellow);
  console.log(`location: ${location.yellow}, when: ${when.yellow}`);
};
