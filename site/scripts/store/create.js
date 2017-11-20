
const { createStore } = Redux;

import reducers from '../reducers/index.js'

export default function () {
  return createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
