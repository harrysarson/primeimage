
function main() {

  const canvas = document.querySelector('canvas');
  const fileInput = document.querySelector('input[type=file]');
  const reader = new FileReader();
  const img = document.createElement('img');
  
  
  
  fileInput.onchange = async function(event) {
    const response = await fetch('/upload', {
      method: 'POST',
      body: event.currentTarget.result // This is the content of your file
    });
    
    console.log(response);
  }
}


main();