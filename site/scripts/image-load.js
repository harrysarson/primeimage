
export default function({input, output, onChange = () => {} }) {

  const canvas = output.querySelector('canvas');
  const reader = new FileReader();
  const img = document.createElement('img');
  
  let imageData = null;
  
  img.onload = function () {
    const aspectRatio = img.width / img.height;

    canvas.style.height = '100%';  
    canvas.style.width = '100%';

    const maxHeight = canvas.offsetHeight;
    const maxWidth = canvas.offsetWidth;
    canvas.style.height = '';
    canvas.style.width = '';
    
    let height, width;
    
    if (maxHeight * aspectRatio > maxWidth) {
      height = maxWidth / aspectRatio;
      width = maxWidth;
    } else {
      height = maxHeight;
      width = maxHeight * aspectRatio;
    }
    
    canvas.width  = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    
    ctx.drawImage(img, 0, 0, width, height);
  };

  reader.onloadend = function () {
    img.src = reader.result;
  };

  createDragDrop(input, (files) => {
    const [file] = files;
    if (file) {
      reader.readAsDataURL(file);
    }
  });
  
  return {
    get isStageComplete() {
      return imageData == null;
    },
    
    process() {
      return imageData;
    },

  };
}

function createDragDrop(element, listener) {
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

  input.addEventListener('change', (e) => {
    listener(e.target.files);
  });

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
