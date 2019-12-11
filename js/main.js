'use strict'
console.log('CANVAS!')

let gCanvas
let gCtx
var gLoadedImg
var gDisplayedCurrMeme
const XMOVEFACTOR = 1;
const YMOVEFACTOR = 1;

function init(){
    initCanvas();
    loadGalleryData();
    loadMemesData();
    gDisplayedCurrMeme = getCurrMeme();
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
    drawText(offsetX,offsetY,memeTxt.line,memeTxt.size,'right',memeTxt.color,meme.strokeColor,meme.font)
}
function drawText( x, y,txt,size,align,color,strokeColor,font) { 
    gCtx.save()
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`;
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
  gLoadedImg = this;
}

function onImageSelected(elImg){
     gCurrMeme.selectedImgId = elImg.dataset.id;
    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize; // Draw when image has loaded

    // Load an image of intrinsic size 300x227 in CSS pixels
    var modelImg = findImgById(elImg.dataset.id);
    image.src = modelImg.path;
   // document.querySelector('.input-path').value = 
}

function onTextChange(elInputText){
    gDisplayedCurrMeme.txts[gDisplayedCurrMeme.selectedTxtIdx].line = elInputText.value;
    setCurrMeme(gDisplayedCurrMeme);
    renderMeme();
}
function onSizeChange(diff){
    gDisplayedCurrMeme.txts[gDisplayedCurrMeme.selectedTxtIdx].size+=diff;
    setCurrMeme(gDisplayedCurrMeme);
    renderMeme();
}
function onToggleTxts(){
    gDisplayedCurrMeme.selectedTxtIdx++;
    gDisplayedCurrMeme.selectedTxtIdx = gDisplayedCurrMeme.selectedTxtIdx % gDisplayedCurrMeme.txts.length;
    setCurrMeme(gDisplayedCurrMeme);
    console.log("gDisplayedCurrMeme.selectedTxtIdx",gDisplayedCurrMeme.selectedTxtIdx)
    //renderMeme();
}
function onColorChange(elInputColor){
    gDisplayedCurrMeme.txts[gDisplayedCurrMeme.selectedTxtIdx].color = elInputColor.value;
    setCurrMeme(gDisplayedCurrMeme);
    renderMeme();
}
function onStrokeColorChange(elInputColor){
    gDisplayedCurrMeme.txts[gDisplayedCurrMeme.selectedTxtIdx].strokeColor = elInputColor.value;
    setCurrMeme(gDisplayedCurrMeme);
    renderMeme();
}
function onFontFamilyChange(elInputColor){
    gDisplayedCurrMeme.txts[gDisplayedCurrMeme.selectedTxtIdx].font = elInputColor.value;
    setCurrMeme(gDisplayedCurrMeme);
    renderMeme();
}

function onYChange(diff){
    gDisplayedCurrMeme.txts[gDisplayedCurrMeme.selectedTxtIdx].y += diff;
    setCurrMeme(gDisplayedCurrMeme);
    renderMeme();
}
function onXChange(diff){
    gDisplayedCurrMeme.txts[gDisplayedCurrMeme.selectedTxtIdx].x += diff;
    setCurrMeme(gDisplayedCurrMeme);
    renderMeme();
}
function onAddLine(){
    var yCalc = Math.floor( gLoadedImg.naturalHeight/2) ;
    var xCalc = Math.floor( gLoadedImg.naturalWidth/2)
    switch (gDisplayedCurrMeme.txts.length) {
        case 0:
            yCalc = 20 ;
            break;
        case 1:
            yCalc = gLoadedImg.naturalHeight-50 ;
            break;
        case 2:
            yCalc = Math.floor( gLoadedImg.naturalHeight/2) ;
            break;
        default:
            break;
    }

    gDisplayedCurrMeme.txts.push({ line: 'I never eat Falafel', x: xCalc , y: yCalc, size: 20, align: 'left', color: 'red' ,strokeColor:'black',font:'Impact'}) ;
    gDisplayedCurrMeme.selectedTxtIdx++;
    setCurrMeme(gDisplayedCurrMeme);
    renderMeme();
}

function renderMeme(){
    gCtx.drawImage(gLoadedImg, 0, 0);
    //offsetX,offsetY,memeTxt.line,memeTxt.size,'right',memeTxt.color
    for(var i=0;i<gDisplayedCurrMeme.txts.length;i++){
        var txt = gDisplayedCurrMeme.txts[i];
        drawText(txt.x,txt.y,txt.line,txt.size,txt.align,txt.color,txt.strokeColor,txt.font);
    }
    
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