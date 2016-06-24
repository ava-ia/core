'use strict';

export default (keys, relations) => {
  let found = {};
  keys.filter(key => relations[key] ? found[key] = relations[key].text : null)

  return found;
}
