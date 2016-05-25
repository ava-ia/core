import Hope from 'hope';
import Salient from 'salient';
// -- Internal
const tokenizer = new Salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
const glossary = new Salient.glossary.Glossary();
const analyser = new Salient.sentiment.BayesSentimentAnalyser();

const NLPSalient = (text) => {
  let promise = new Hope.Promise();
  console.log(`
  <salient>
    <tokens>${tokenizer.tokenize(text)}
    <glossary>${glossary.parse(text)}
    <sentiment>${analyser.classify(text)}
  </salient>`);
  promise.done(null, text);
  return promise;
}

export default NLPSalient;
