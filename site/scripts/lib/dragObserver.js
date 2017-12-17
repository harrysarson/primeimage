import fromEvent from '../deps/rxjs/observable/fromEvent.js';
import { merge } from '../deps/rxjs/observable/merge.js';
import * as operators from '../deps/rxjs/operators.js';
import { map as itblMap } from './Iterable.js';

const fromMultipleEvents = ($element, eventNames) => {
  return [
    itblMap(eventName => fromEvent($element, eventName)),
    observables => merge(...observables),
  ].reduce((value, project) => project(value), eventNames);
}

export function dragObserver($element) {
  fromMultipleEvents(
    $element,
    [ 'drag'
    , 'dragstart'
    , 'dragend'
    , 'dragover'
    , 'dragenter'
    , 'dragleave'
    , 'drop'
    ],
  )
    .subscribe(function onDragEvent(e) {
      // preventing the unwanted behaviours
      e.preventDefault();
      e.stopPropagation();
    });

  fromMultipleEvents(
    $element,
    [ 'dragover'
    , 'dragenter'
    ],
  )
    .subscribe(function onDragStart() {
      $element.classList.add('is-dragover');
    });

  fromMultipleEvents(
    $element,
    [ 'dragleave'
    , 'dragend'
    , 'drop'
    ],
  )
    .subscribe(function onDragEnd() {
      $element.classList.remove('is-dragover');
    });


  const subject = new Subject();
  const input = $element.querySelector('input[type="file"]');

  return merge(
    merge(
      fromEvent($element, 'submit').pipe(
        operators.tap(() => $element.preventDefault()),
      ),
      fromEvent($element, 'change'),
    ).pipe(
      operators.pluck('target'),
    ),
    fromEvent($element, 'drop').pipe(
      operators.pluck('dataTransfer'),
    ),
  ).pipe(
    operators.pluck('files'),
  );
}
