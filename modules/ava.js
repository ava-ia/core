'use strict';
import Hope from 'hope';
// -- Configuration
import pkg from '../package.json';
// -- Adaptors
import Language from '../adaptors/language'
import NLPSalient from '../adaptors/nlp.salient'
import NLPAlchemy from '../adaptors/nlp.alchemy'
import TranslatorYandex from '../adaptors/translator.yandex'
import TranslatorGoogle from '../adaptors/translator.google'
// -- Core
import metadata from './ava/metadata'
import output from './ava/output'

export default class Ava {
  static version = pkg.version;

  props = undefined;
  metadata = metadata;
  output = output;

  constructor(props) {
    this.props = props;
    this.output(`Welcome to Ava ${Ava.version}`);
  }

  listen(text, profile) {
    this.output('Analyzing');
    let request = {
      input: text,
      sentence: text,
      language: null,
      nlp: {},
      translator: {}
    };

    Hope.chain([
      () => Language(request, this)
    // ,
    //   (error, request) => TranslatorYandex(request)
    ,
      (error, request) => TranslatorGoogle(request, this)
    ,
      (error, request) => NLPSalient(request, this)
    ,
      (error, request) => NLPAlchemy(request, this)
    ]).then((error, request) => {
      this.metadata(request);
    });
  }

  step() {
    this.output('.', false);
  }
}
