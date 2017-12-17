import { pluck, tap, map, filter } from '../../deps/rxjs/operators.js';

import { creators as actionCreators } from '../../actions/index.js';
import { dragObserver } from '../../lib/dragObserver.js';

const imgDrawer = canvas => function drawImgOnCanvas(img) {
  const aspectRatio = img.width / img.height;

  Object.assign(canvas.style, { width: '100%', height: '100%' });

  const maxHeight = canvas.offsetHeight;
  const maxWidth = canvas.offsetWidth;

  Object.assign(canvas.style, { width: '', height: '' });

  let height;
  let width;

  if (maxHeight * aspectRatio > maxWidth) {
    height = maxWidth / aspectRatio;
    width = maxWidth;
  } else {
    height = maxHeight;
    width = maxHeight * aspectRatio;
  }

  Object.assign(canvas, { width, height });

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(img, 0, 0, width, height);
};


/**
 * Creates GUI for buttons that change the current stage.
 *
 * @param {object} args
 * @param {Element} args.attributename Name of HTML attribute defining the button.
 * @param {number} maxStage Index of maximum stage.
 *
 * @returns Object allowing buttons to be observed and updated.
 */
export default () => Object.freeze({
  observable($input) {
    return dragObserver($input).pipe(
      map(files => files[0]),
      map(actionCreators.loadFile),
    );
  },

  updater($output) {
    return (source) => {
      const canvas = $output.querySelector('canvas');

      return source.pipe(
        pluck('img'),
        filter(img => img != null),
        tap(imgDrawer(canvas)),
      );
    };
  },
});
