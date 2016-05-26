'use strict';

import colors from 'colors';
import Hope from 'hope';
// -- Adaptors
import Language from '../adaptors/language'
import NLPSalient from '../adaptors/nlp.salient'
import NLPAlchemy from '../adaptors/nlp.alchemy'
import TranslatorYandex from '../adaptors/translator.yandex'
import TranslatorGoogle from '../adaptors/translator.google'

const Ava = {
  listen: (text) => {
    Ava.says();
    let request = {
      input: text,
      sentence: text,
      language: null,
      nlp: {},
      translator: {}
    };
    Hope.chain([
      () => Language(request)
    // ,
    //   (error, request) => TranslatorYandex(request)
    ,
      (error, request) => TranslatorGoogle(request)
    ,
      (error, request) => NLPSalient(request)
    ,
      (error, request) => NLPAlchemy(request)
    ]).then((error, request) => {
      Ava.metadata(request);
      Ava.says('Finished');
    });
  },

  says: (text) => {
    let output = '<AVA>'.magenta;
    if (text && text.length > 0) output = `${output} ${text.grey}\n`
    _write(output);
  },

  metadata: (request, level = 0) => {
    if (level === 0) console.log('\n');
    level = level + 1;
    const indent = new Array(level).join(' ');
    for (let property in request) {
      if (property === 'ms') continue;
      let value = request[property];
      const type = typeof(value);
      const isArray = Array.isArray(value) && value.length > 0;
      const arrayObjects = isArray && value[0] instanceof Object;
      if (type === 'string' || type === 'number' || (isArray && !arrayObjects)) {
        console.log(`${indent}${property.grey}: ${value.toString()}`);

      } else if (value instanceof Object && Object.keys(value).length > 0) {
        const ms = value.ms ? ` (${value.ms.toString().bold}ms)` : ''
        console.log(`${indent}${property.bold.magenta}${ms}:`);
        Ava.metadata(value, level);
      }
    }
  },

  searching: () => _write('.'.grey)
}

export default Ava;

// -- Private
const _write = (output) => process.stdout.write(output);
