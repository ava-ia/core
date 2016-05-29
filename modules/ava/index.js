'use strict';

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

  async analize(text) {
    this.output('Analyzing');
    let request = {
      input: text,
      sentence: text,
      language: {},
      nlp: {}
    };

    let language = await Language(request, this);
    let translation = await this.props.translator(request, this);
    let nlp = await this.props.nlp(request, this);

    this.metadata(request);
  }

  step() {
    this.output('.', false);
  }
}
