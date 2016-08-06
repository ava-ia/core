import Compromise from 'nlp_compromise'

export default (state) => {
  const compromise = Compromise.text(state.sentence)

  state.type = Compromise.sentence(state.sentence).sentence_type()
  state.topics = compromise.topics().map(topic => topic.text)
  state.tags = compromise.tags()[0]

  return (state)
}
