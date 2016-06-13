'use strict';

export default (...fns) => val => fns.reduce((acc, fn) => fn(acc), val);
