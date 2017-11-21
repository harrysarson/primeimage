
const { createStore } = Redux;

import reducers from '../reducers/index.js'

export default function () {
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const subject = new Rx.Subject();

  subject.next(store.getState);

  const observable = Rx.Observable.create(function subscribe(observer) {
    const unsubscribe_redux = store.subscribe(function() {
      observer.next(store.getState());
    });

    observer.next(store.getState());

    return function unsubscribe() {
      unsubscribe_redux();
    }
  });

  // todo find way to avoid monkey patch
  observable.dispatch = (...args) => store.dispatch(...args);

  return observable;
}
