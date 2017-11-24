import reducers from '../reducers/index.js';

const { Redux: { createStore } } = window;
const { Rx } = window;

export default function () {
  /* eslint no-underscore-dangle: ["warn"] */
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const subject = new Rx.Subject();

  subject.next(store.getState);

  const observable = Rx.Observable.create(function subscribe(observer) {
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
