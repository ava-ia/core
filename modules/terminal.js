import cld from 'cld';
import Hope from 'hope';
// -- Adaptors
import Language from '../adaptors/language'
import NLPSalient from '../adaptors/nlp.salient'
import NLPAlchemyLanguage from '../adaptors/nlp.alchemylanguage'

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  Hope.chain([
    () => Language(text)
  ,
    (error, value) => NLPSalient(text)
  ,
    (error, value) => NLPAlchemyLanguage(text)
  ]).then((errors, values) => {
    console.log('\n');
  });

  if (text === 'quit\n') {
    done();
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}
