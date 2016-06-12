'use strict';

export default (keys, relations) => {
  let found = {};
  // keys.map(key => console.log(key))
  keys.filter(key => relations[key] ? found[key] = relations[key].text : null)
  // console.log('ss', found);
  return found;
}
