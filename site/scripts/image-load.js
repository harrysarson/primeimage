
import { ReadFile } from './lib/ReadFile.js';
import { loadImg } from './lib/loadImg.js';

const { Rx } = window;


function createDragDrop($element) {
  const input = $element.querySelector('input[type="file"]');

  function addListener(eventNames, cb) {
    for (const eventName of eventNames) {
      $element.addEventListener(eventName, cb);
    }
  }

  const subject = new Rx.Subject();

  $element.addEventListener('submit', function onSubmit(e) {
    $element.preventDefault();

    subject.next(e.target.files);
  });

  input.addEventListener('change', function onChange(e) {
    subject.next(e.target.files);
  });

  addListener(
    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'],
    function onDragEvent(e) {
      // preventing the unwanted behaviours
      e.preventDefault();
      e.stopPropagation();
    },
  );
  addListener(
    ['dragover', 'dragenter'],
    function onDragStart() {
      $element.classList.add('is-dragover');
    },
  );
  addListener(
    ['dragleave', 'dragend', 'drop'],
    function onDragEnd() {
      $element.classList.remove('is-dragover');
    },
  );
  $element.addEventListener('drop', function onDrop(e) {
    subject.next(e.dataTransfer.files);
  });

  return subject;
}

export default function ({ input, output }) {
  const canvas = output.querySelector('canvas');

  createDragDrop(input)
    .subscribe(async (files) => {
      const [file] = files;
      if (!file) return;

      const dataUrl = await new ReadFile(file).asDataURL(file);

      const img = await loadImg(dataUrl);


      const aspectRatio = img.width / img.height;

      canvas.style.height = '100%';
      canvas.style.width = '100%';

      const maxHeight = canvas.offsetHeight;
      const maxWidth = canvas.offsetWidth;
      canvas.style.height = '';
      canvas.style.width = '';

      let height;
      let width;

      if (maxHeight * aspectRatio > maxWidth) {
        height = maxWidth / aspectRatio;
        width = maxWidth;
      } else {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(img, 0, 0, width, height);
    });
}
