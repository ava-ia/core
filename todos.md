## 0. NOTES
  [ ] Intents should dispatch a `reject()` but is better don't do it, because maybe we have more intents to execute.

## 1. Improvements
  [✓] intent calc
  [✓] use a helper/trace as a console.log
  [ ] **taxonomy** zero-dependencies (now is with alchemy)
  [ ] **classifier** is empty
  [✓] Timestamp for control each process
  [ ] maths action
  [ ] default action for a defined intent
  [ ] action.wtf_wikipedia
  [ ] translate the action.title to origin language (if it's not english)
  [ ] Improve relations.spec
  [ ] create a super-method for execute always all the intersections

## 2. INTENTS
  [ ] Places
  [ ] Flights (skyscanner)
  [ ] Directions (openstreetmaps / googlemaps)
  [ ] transit (google)
  [ ] sport results
  [ ] chat (bots)
  [ ] pictures
### 2.1 Dependencies of third-parties
  [ ] calendar (google)
  [ ] alarm (os/google)
  [ ] contacts (os)

## 3. ACTIONS
  [ ] entity (string person|object|location)
  [ ] title (string)
  [ ] text (string)
  [ ] url (string)
  [ ] value (object)
  [ ] image (string)
  [ ] [related] (array)
    [ ] map/Video
    [ ] text
  [ ] date (date)

## 4. CLASSIFIERS
  [ ] More info: https://github.com/nemo/natural-synaptic
  [ ] More info: https://github.com/NaturalNode/natural

## 5. Voices
  [ ] Alex (man - en)
  [ ] karen/moira/samantha (woman - en)
  [ ] Monica (woman - es)
  [ ] Paulina (woman - es-lat)
  [ ] Amelie (woman - fr)
  [ ] Anna (woman - de)
  [ ] Joana (woman - pt)
