'use strict'
console.log('CANVAS!')

let gCanvas
let gCtx, gImg
function init(){
    initCanvas();
    loadGalleryData();
    loadMemesData();
    renderGallery();
}
function initCanvas(){
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d')
}
function renderGallery(){
    var elGallery = document.querySelector(".gallery");
    var imgs = getImagesToRender();
    // var elAlertSpan =  document.querySelector(".alertSpan");
    // if (todos.length === 0) {
    //     var filter = document.querySelector("#status-filter").value;
    //     elAlertSpan.innerHTML = `no ${filter} todos to show`;
    // } 
    // else{
    //     elAlertSpan.innerHTML = ``;
    // }
    var strImgs = imgs.map(function(item) {
        return `<img data-ID = ${item.ID} src="${item.path}" class = "galleryImage" onclick="onImageSelected(this)">`;
    });
    elGallery.innerHTML = strImgs.join("");
}
function onMouseDown(ev){
    var meme = getCurrMemeToRender();
    var memeTxt = meme.txts[meme.selectedTxtIdx];
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    //  [ { line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' } ]}
    drawText(offsetX,offsetY,memeTxt.line,memeTxt.size,'right',memeTxt.color)
}
function drawText( x, y,txt,size,align,color) { 
    gCtx.save()
    gCtx.strokeStyle = color
    gCtx.fillStyle = '#ffffff'
    gCtx.font = `${size}px Impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.restore()
}
function drawImageActualSize() {
  // Use the intrinsic size of image in CSS pixels for the canvas element
  gCanvas.width = this.naturalWidth;
  gCanvas.height = this.naturalHeight;

  // Will draw the image as 300x227, ignoring the custom size of 60x45
  // given in the constructor
  gCtx.drawImage(this, 0, 0);
}

function onImageSelected(elImg){
     gCurrMeme.selectedImgId = elImg.dataset.id;
    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize; // Draw when image has loaded

    // Load an image of intrinsic size 300x227 in CSS pixels
    var modelImg = findImgById(elImg.dataset.id);
    image.src = modelImg.path;
   // document.querySelector(.input-path).
}

// resizeCanvas()

    // ////// PART 8.1 //////
    // window.addEventListener('resize',
    //     function () {
    //         gCanvas.width = window.innerWidth - 50
    //         gCanvas.height = window.innerHeight - 100;
    //         drawImg()
    //         drawLine(10, 10, 200, 500)
    //     })
    // function resizeCanvas() {
    //     var elContainer =
    //         document.querySelector('.canvas-container');
    //     // Note: changing the canvas dimension this way clears the canvas
    //     gCanvas.width = elContainer.offsetWidth - 100
    //     gCanvas.height = elContainer.offsetHeight - 100
    
    //     // TODO: redraw..
    // }