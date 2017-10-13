
const div = document.createElement('div');

const draggable = 'draggable' in div;

const draggableEvents = 'ondragstart' in div && 'ondrop' in div;

const formDataExists = 'FormData' in window;

const fileRaderExists = 'FileReader' in window;

export default draggable && draggableEvents && formDataExists && fileRaderExists;
