import isDragEnabled from './is-drag-enabled.js';


export function createDragDrop(element, listener) {
  const input = element.querySelector('input[type="file"]');

  function addListener(eventNames, cb) {
    for (const eventName of eventNames) {
      element.addEventListener(eventName, cb);
    }
  }


  element.addEventListener('submit', (e) => {
    element.preventDefault();

    listener(e.target.files);
  });

  // automatically submit the element on file select
  input.addEventListener('change', (e) => {
    listener(e.target.files);
  });

  // drag&drop files if the feature is available
  if (isDragEnabled) {
    // let CSS know drag&drop is supported by the browser
    element.classList.add('has-advanced-upload');

    addListener(
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'],
      (e) => {
        // preventing the unwanted behaviours
        e.preventDefault();
        e.stopPropagation();
      },
    );
    addListener(
      ['dragover', 'dragenter'],
      () => {
        element.classList.add('is-dragover');
      },
    );
    addListener(
      ['dragleave', 'dragend', 'drop'],
      () => {
        element.classList.remove('is-dragover');
      },
    );
    element.addEventListener('drop', (e) => {
      listener(e.dataTransfer.files);
    });
  }
}
