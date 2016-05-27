'use strict';

import Hope from 'hope';
// -- Configuration
import pkg from 'package.json';
// -- Adaptors
import Language from 'adaptors/language'
import NLPAlchemy from 'adaptors/nlp'
import TranslatorGoogle from 'adaptors/translator'
// -- Core
import metadata from './metadata'
import output from './output'

export default class Ava {
  static version = pkg.version;

  props = undefined;
  metadata = metadata;
  output = output;

  constructor(props = {}) {
    this.props = props;
    if (!this.props.translator) this.props.translator = TranslatorGoogle;
    if (!this.props.nlp) this.props.nlp = NLPAlchemy;
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

    let tasks = [];
    tasks.push(() => Language(request, this));
    tasks.push((error, request) => this.props.translator(request, this));
    tasks.push((error, request) => this.props.nlp(request, this));
    Hope.chain(tasks).then((error, request) => {
      this.metadata(request);
    });
  }

  step() {
    this.output('.', false);
  }
}
