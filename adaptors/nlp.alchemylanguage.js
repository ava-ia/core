import AlchemyAPI from 'alchemy-api';
import Hope from 'hope';
// -- Internal
const CREDENTIALS = require('./credentials/AlchemyAPI.json');
var alchemy = new AlchemyAPI(CREDENTIALS.apikey);

const Adaptor = (text) => {
  let promise = new Hope.Promise();

  alchemy.sentiment(text, {}, (error, value) => {
    if (error) throw error;
    console.log('<AlchemyApi.Language>', value.language);
    console.log('<AlchemyApi.docSentiment>', value.docSentiment);
  });

  alchemy.entities(text, {}, (error, value) => {
    if (error) throw error;
    console.log('<AlchemyApi.Language>', value.language);
    console.log('<AlchemyApi.entities>', value.entities);
  });

  alchemy.emotions(text, {}, (error, value) => {
    if (error) throw error;
    console.log('<AlchemyApi.Language>', value.language);
    console.log('<AlchemyApi.docEmotions>', value.docEmotions);
  });

  return promise;
}

export default Adaptor;
