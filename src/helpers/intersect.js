'use strict';

export default (array1 = [], array2 = []) => {
  return array1.filter(item => array2.indexOf(item) != -1).length > 0;
}
