

export default function() {
  
  const canvas = document.createElement('canvas');
  
  canvas.width = 100;
  canvas.height = 100;
  
  const ctx = canvas.getContext('2d');
  
  ctx.fillText('\u2588', 0, 0);
  
}