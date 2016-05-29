'use strict';

// -- Configuration
import pkg from 'package.json';
// -- Adaptors
import Language from 'adaptors/language'
import NLPAlchemy from 'adaptors/nlp'
import TranslatorGoogle from 'adaptors/translator'
import ClassifierBayes from 'adaptors/classifier'
// -- Core
import metadata from './metadata'
import output from './output'
const LANGUAGE = 'en';

export default class Ava {
  static version = pkg.version;

  props = undefined;
  metadata = metadata;
  output = output;

  constructor(props = {}) {
    this.props = props;
    if (!this.props.translator) this.props.translator = TranslatorGoogle;
    if (!this.props.nlp) this.props.nlp = NLPAlchemy;
    if (!this.props.classifier) this.props.classifier = ClassifierBayes;
    this.output(`Welcome to Ava ${Ava.version}`);
    if (props.query) this.analize(props.query);
  }

  async analize(text) {
    this.output('Analyzing');
    let request = { input: text, phrase: text };

    request.language = await Language(request.phrase, this);
    if (request.language.iso !== LANGUAGE) {
      request.language = await this.props.translator(request.phrase, request.language.iso, this);
      request.phrase = request.language.phrase;
    }
    request.classifier = this.props.classifier.categorize(request.phrase, request.language.iso, this);

    request.nlp = await this.props.nlp(request.phrase, this);
    if (request.nlp.taxonomy && request.classifier !== request.nlp.taxonomy.label) {
      this.props.classifier.learn(request.input, request.language.iso, request.nlp.taxonomy.label);
    }
    this.metadata(request);
  }

  step() {
    this.output('.', false);
  }
}
