## 0. NOTES
  - Intents should dispatch a `reject()` but is better don't do it, because maybe we have more intents to execute.

## 1. KITCHENSINK
  - 🎯0.2.0
  - ESLINT
  - intent 🔢maths
  - **improve** 🔢maths action
  - **improve** action.wtf_wikipedia
  - 🎯0.1.2
  - translate the action.title to origin language (if it's not english)
  - Improve relations.spec
  - create a super-method for execute always all the intersections

## 2. INTENTS
  - 🌏Places
  - 🗺Directions (openstreetmaps / googlemaps)
  - ✈️ Flights (skyscanner)
  - 🚓transit (google)
  - 🏅sport results
  - 💬chat (bots)
  - 🖼pictures
### 2.1 Dependencies of third-parties
  - 🗓calendar (google)
  - ⏰alarm (os/google)
  - 👥contacts (os)

## 3. ACTIONS
  - 🔴entity (string person|object|location)
  - title (string)
  - text (string)
  - url (string)
  - value (object)
  - image (string)
  - [related] (array)
    - map/Video
    - text
  - date (date)

## 4. CLASSIFIERS
// -- More info: https://github.com/nemo/natural-synaptic
// -- More info: https://github.com/NaturalNode/natural

## 5. Voices
  - Alex (man - en)
  - karen/moira/samantha (woman - en)
  - Monica (woman - es)
  - Paulina (woman - es-lat)
  - Amelie (woman - fr)
  - Anna (woman - de)
  - Joana (woman - pt)
