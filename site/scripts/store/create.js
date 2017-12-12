/* eslint no-underscore-dangle: ["warn"] */
import thunk from '../deps/redux-thunk.js';
import { createStore, applyMiddleware, compose } from '../deps/redux.js';

import { Observable } from '../deps/rxjs/Observable.js';
import { Subject } from '../deps/rxjs/Subject.js';

import reducers from '../reducers/index.js';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function () {
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
  );

  const subject = new Subject();

  subject.next(store.getState);

  const observable = Observable.create(function subscribe(observer) {
    const unsubscribeRedux = store.subscribe(() => {
      observer.next(store.getState());
    });

    observer.next(store.getState());

    return function unsubscribe() {
      unsubscribeRedux();
    };
  });

  // todo find way to avoid monkey patch
  observable.dispatch = (...args) => store.dispatch(...args);

  return observable;
}
