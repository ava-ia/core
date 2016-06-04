"use strict";

export default (...fns) => state => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(state));
