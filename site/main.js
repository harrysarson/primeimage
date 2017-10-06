
function main() {

  const canvas = document.querySelector('canvas');
  const fileInput = document.querySelector('input[type=file]');
  const reader = new FileReader();
  const img = document.createElement('img');
  
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    
    fetch("upload", {
      method: "POST",
      body: canvas.toDataURL(),
    });
  };
  
  reader.onloadend = function () {
    
    img.src = reader.result;
       
  }
  
  fileInput.onchange = function() {
    const file = fileInput.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}


main();