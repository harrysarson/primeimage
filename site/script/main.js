import { createDragDrop } from './file.js';

function main() {
  const canvas = document.querySelector('.image-display.original').querySelector('canvas');
  const fileInput = document.querySelector('input[type=file]');
  const reader = new FileReader();
  const img = document.createElement('img');

  img.onload = function () {
    const aspectRatio = img.width / img.height;
    const { width } = canvas;
    const height = width * aspectRatio;
    const ctx = canvas.getContext('2d');
    
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  };

  reader.onloadend = function () {
    img.src = reader.result;
  };

  fileInput.onchange = function () {

  };


  createDragDrop(document.querySelector('.image-pick'), (files) => {
    const [file] = files;
    if (file) {
      reader.readAsDataURL(file);
    }
  });
/*
  if (isDragEnabled) {
    const droppedFiles = false;

    $form.on('drag dragstart dragend dragover dragenter dragleave drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
    })
      .on('dragover dragenter', () => {
        $form.addClass('is-dragover');
      })
      .on('dragleave dragend drop', () => {
        $form.removeClass('is-dragover');
      })
      .on('drop', (e) => {
        droppedFiles = e.originalEvent.dataTransfer.files;
      });
  } else {
    document.querySelector('.drag-drop-notice').textContent = '';
  }

  */
}

main();

