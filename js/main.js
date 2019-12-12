'use strict'
console.log('CANVAS!')

let gCanvas
let gCtx
var gLoadedImg
var gDisplayedMeme
const XMOVEFACTOR = 1;
const YMOVEFACTOR = 1;
const NEWLINEINDENTATION = 5;

function init(){
    initCanvas();
    loadGalleryData();
    renderGallery();
  //  loadMemeData();
    gDisplayedMeme = getCurrMeme();
    renderControls(gDisplayedMeme);
}
function initCanvas(){
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d')
}
function toggleMenu(){
    
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
function renderControls(){
    var currLine;
    if (gDisplayedMeme.txts.length === 0){
       // gDisplayedMeme.txts.push(getDefaultLine());
       currLine = getDefaultLine();
    }
    else{
        currLine = gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx]
    }
    
    document.querySelector('.input-text').value = currLine.line;
    document.querySelector('.input-color').value = currLine.color;
    document.querySelector('.input-stroke-color').value = currLine.strokeColor;
    document.querySelector('.input-font').value = currLine.font;
    document.querySelector('.btn-align-left').disabled = (currLine.align === 'left');
    document.querySelector('.btn-align-center').disabled = (currLine.align === 'center');
    document.querySelector('.btn-align-right').disabled = (currLine.align === 'right');
}
// function onMouseDown(ev){
//     var meme = getCurrMemeToRender();
//     var memeTxt = meme.txts[meme.selectedTxtIdx];
//     const offsetX = ev.offsetX
//     const offsetY = ev.offsetY
//     //  [ { line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' } ]}
//     drawText(offsetX,offsetY,memeTxt.line,memeTxt.size,'right',memeTxt.color,meme.strokeColor,meme.font)
// }

function drawText( x, y,txt,size,align,color,strokeColor,font) { 
    gCtx.save()
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
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

  afterImageLoaded();
  
}
function afterImageLoaded(){
    //update line x according to proportions
    gDisplayedMeme.txts.push(getDefaultLine());
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].x = getXByAlignment();
    markCurrLine();
}
function markCurrLine(){
    var currColor = gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].color;
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].color = invertColor(currColor);
    renderMeme(); 
    var elAdd =  document.querySelector('.btn-add-line');
    elAdd.disabled = true;
    var elToggle =  document.querySelector('.btn-toggle-lines');
    elToggle.disabled = true;
    setTimeout(unmarkCurrLine,3000,gDisplayedMeme.selectedTxtIdx,currColor,elAdd,elToggle);
}
function unmarkCurrLine(lineIdx,origColor,elAdd,elToggle){
    if(gDisplayedMeme.txts.length >0){
        gDisplayedMeme.txts[lineIdx].color = origColor;
        elAdd.disabled = false;
        elToggle.disabled = false
        renderMeme(); 
    }
}

 
function onImageSelected(elImg){
     gCurrMeme.selectedImgId = elImg.dataset.id;
    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize; // Draw when image has loaded

    // Load an image of intrinsic size 300x227 in CSS pixels
    var modelImg = findImgById(elImg.dataset.id);
    image.src = modelImg.path;
    document.querySelector('.gallery').classList.remove('grid');
    document.querySelector('.gallery').classList.add('non-active');
    document.querySelector('.editor').classList.remove('non-active');
    document.querySelector('.editor').classList.add('flex');
   // document.querySelector('.input-path').value = 
}
function onNewImage(){
    document.querySelector('.gallery').classList.remove('non-active');
    document.querySelector('.gallery').classList.add('grid');
    document.querySelector('.editor').classList.remove('flex');
    document.querySelector('.editor').classList.add('non-active');
}

function onDownload(elBtn) {
    const data = gCanvas.toDataURL('image/jpeg')
    elBtn.href = data
    elBtn.download ='my-img.png'
}
function onAlignClicked(align){
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].align = align;
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].x =getXByAlignment();

    setCurrMeme(gDisplayedMeme);
    renderMeme();
    renderControls();
}
function onTextChange(elInputText){
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].line = elInputText.value;
    setCurrMeme(gDisplayedMeme);
    renderMeme();
}
function onSizeChange(diff){
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].size+=diff;
    setCurrMeme(gDisplayedMeme);
    renderMeme();
}
function onToggleTxts(){
    gDisplayedMeme.selectedTxtIdx++;
    gDisplayedMeme.selectedTxtIdx = gDisplayedMeme.selectedTxtIdx % gDisplayedMeme.txts.length;
    setCurrMeme(gDisplayedMeme);
    renderControls();
    markCurrLine();
    //renderMeme();
}
function onColorChange(elInputColor){
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].color = elInputColor.value;
    setCurrMeme(gDisplayedMeme);
    renderMeme();
}
function onStrokeColorChange(elInputColor){
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].strokeColor = elInputColor.value;
    setCurrMeme(gDisplayedMeme);
    renderMeme();
}
function onFontFamilyChange(elInputColor){
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].font = elInputColor.value;
    setCurrMeme(gDisplayedMeme);
    renderMeme();
}

function onYChange(diff){
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].y += diff;
    setCurrMeme(gDisplayedMeme);
    renderMeme();
}
function onXChange(diff){
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].x += diff;
    setCurrMeme(gDisplayedMeme);
    renderMeme();
}

function onDeleteLine(){
    gDisplayedMeme.txts.splice(gDisplayedMeme.selectedTxtIdx,1);
    if(gDisplayedMeme.txts.length>0){
        if (gDisplayedMeme.selectedTxtIdx>0){
            gDisplayedMeme.selectedTxtIdx--;
        }
        setCurrMeme(gDisplayedMeme);
        renderControls();
        renderMeme();
        markCurrLine();
    }
    else{
        document.querySelector('.btn-delete-line').disabled = true;
        setCurrMeme(gDisplayedMeme);
        renderControls();
        renderMeme();
    }
  
}
function onAddLine(){
    var yCalc = Math.floor( (gLoadedImg.naturalHeight/2) + gDisplayedMeme.txts.length*NEWLINEINDENTATION) ;
   // var xCalc = Math.floor( (gLoadedImg.naturalWidth/2) + gDisplayedMeme.txts.length*NEWLINEINDENTATION) 
    switch (gDisplayedMeme.txts.length) {
        case 0:
            yCalc = 20 ;
            break;
        case 1:
            yCalc = gLoadedImg.naturalHeight-20 ;
            break;
        case 2:
            yCalc = Math.floor( gLoadedImg.naturalHeight/2) ;
            break;
        default:
            break;
    }
    //get curr line properties
  //  var currLine = gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx];
    gDisplayedMeme.txts.push(getDefaultLine()) ; 
    if(gDisplayedMeme.txts.length > 1){
        gDisplayedMeme.selectedTxtIdx++;
    }
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].y = yCalc;
    gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].x = getXByAlignment();
    setCurrMeme(gDisplayedMeme);
    renderControls();
    renderMeme();
    markCurrLine();
    document.querySelector('.btn-delete-line').disabled = false;

}


function getXByAlignment(){
    var xCalc;
    switch (gDisplayedMeme.txts[gDisplayedMeme.selectedTxtIdx].align) {
        case "left":
            xCalc = 20 ;
            break;
        case "right":
            xCalc = gLoadedImg.naturalWidth-20;
            break;
        case "center":
            xCalc = Math.floor( gLoadedImg.naturalWidth/2) ;
            break;
        default:
            break;
    }
    return xCalc;
}

function renderMeme(){
    gCtx.drawImage(gLoadedImg, 0, 0);
    //offsetX,offsetY,memeTxt.line,memeTxt.size,'right',memeTxt.color
    for(var i=0;i<gDisplayedMeme.txts.length;i++){
        var txt = gDisplayedMeme.txts[i];
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