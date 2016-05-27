'use strict';
import Hope from 'hope';
// -- Configuration
import pkg from 'package.json';
// -- Adaptors
import Language from 'adaptors/language'
import {NLPSalient, NLPAlchemy} from 'adaptors/nlp'
import {TranslatorGoogle, TranslatorYandex} from 'adaptors/translator'
// -- Core
import metadata from './metadata'
import output from './output'

export default class Ava {
  static version = pkg.version;

  props = undefined;
  metadata = metadata;
  output = output;

  constructor(props) {
    this.props = props;
    this.output(`Welcome to Ava ${Ava.version}`);
    if (props.query) this.analize(props.query);
  }

  analize(text) {
    this.output('Analyzing');
    let request = {
      input: text,
      sentence: text,
      language: {},
      nlp: {},
      translator: {}
    };

    Hope.chain([
      () => Language(request, this)
    // ,
    //   (error, request) => TranslatorYandex(request, this)
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
