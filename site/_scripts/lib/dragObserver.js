import { fromEvent } from 'rxjs/_esm2015/observable/fromEvent';
import { merge } from 'rxjs/_esm2015/observable/merge';
import * as operators from 'rxjs/_esm2015/operators';
import { map as itblMap } from './Iterable.js';
import { pipe } from './pipe.js';

const fromMultipleEvents = ($element, eventNames) => pipe(
  eventNames,
  itblMap(eventName => fromEvent($element, eventName)),
  observables => merge(...observables),
);

export function dragObserver($element) {
  fromMultipleEvents(
    $element,
    [
      'drag',
      'dragstart',
      'dragend',
      'dragover',
      'dragenter',
      'dragleave',
      'drop',
    ],
  )
    .subscribe(function onDragEvent(e) {
      // preventing the unwanted behaviours
      e.preventDefault();
      e.stopPropagation();
    });

  fromMultipleEvents(
    $element,
    [
      'dragover',
      'dragenter',
    ],
  )
    .subscribe(function onDragStart() {
      $element.classList.add('is-dragover');
    });

  fromMultipleEvents(
    $element,
    [
      'dragleave',
      'dragend',
      'drop',
    ],
  )
    .subscribe(function onDragEnd() {
      $element.classList.remove('is-dragover');
    });


  const $input = $element.querySelector('input[type="file"]');

  return merge(
    merge(
      fromEvent($input, 'submit').pipe(operators.tap(() => $element.preventDefault())),
      fromEvent($element, 'change'),
    ).pipe(operators.pluck('target')),
    fromEvent($element, 'drop').pipe(operators.pluck('dataTransfer')),
  ).pipe(operators.pluck('files'));
}

export default dragObserver;
