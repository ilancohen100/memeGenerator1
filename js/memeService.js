
var gCurrMeme = { selectedImgId: 0, selectedTxtIdx: 0, txts:[]}
var gMemes=[];
var gNextMemeID;

function getDefaultLine(){
    return { line: 'your line comes here', x: 20 , y: 40, size: 30, align: 'center', color: '#ffffff',strokeColor:'#000000',font:'Impact' };
}

// function createMeme(selectedImgId,selectedTxtIdx,txts) {
//     var meme = {
//         ID:gNextID,
//         selectedImgId,
//         selectedTxtIdx,
//         getDefaultLine()
//     }
//    // saveToStorage('meme', gNextMemeID);
//     return meme;
// }

// function saveMemes() {
//     saveToStorage('memes', gMemes);
// }

// function loadMemesData() {
//     gMemes = loadFromStorage('meme', []);
//     gNextMemeID = loadFromStorage('nextMemeID', 0)
//     if (gNextMemeID.length === 0) createMemes();
// }

// function createMemes() {
//     gMemes = [];
//     gMemes.push(gCurrMeme);
// }

// function getCurrMemeToRender() {
//     // var filteredTodos = gTodos.filter(function (todo) {
//     //     return ((gStatusFilter === 'all') ||
//     //         (gStatusFilter === 'active' && !todo.isDone) ||
//     //         (gStatusFilter === 'done' && todo.isDone))
//     // });
//     // var SortedTodos;
//     // SortedTodos = filteredTodos.sort(function(a,b){
//     //     return a[gStatusSort]>b[gStatusSort]? 1 : a[gStatusSort]< b[gStatusSort]? -1 : 0;
//     // })
//     // return SortedTodos;
//     return gCurrMeme;
// }
function setCurrMeme(meme){
    gCurrMeme = meme;
}
function getCurrMeme(){
    return gCurrMeme;
}
// function setCurrMemeTxt(selectedTxtIdx,x,y,text,size,align,color){
//     // { line: 'I never eat Falafel', x: 20 , y: 20, size: 20, align: 'left', color: 'red' }
//     gCurrMeme.txts[selectedTxtIdx].line = text;
//     gCurrMeme.txts[selectedTxtIdx].x = x;
//     gCurrMeme.txts[selectedTxtIdx].y = y;
//     gCurrMeme.txts[selectedTxtIdx].size = size;
//     gCurrMeme.txts[selectedTxtIdx].align = align;
//     gCurrMeme.txts[selectedTxtIdx].color = color;
// }

// function findImgById(imgID) {
//     return gImgs.find(function (item) {
//         return item.ID === imgID;
//     });
// }
// function findImgIndexById(imgID) {
//     return gImgs.findIndex(function (item) {
//         return item.ID === imgID;
//     });
// }

// function addTodo(title,importance) {
//     var newTodo = createTodo(title,importance);
//     gTodos.push(newTodo);
//     saveTodos()
// }

// function deleteTodo(todoID) {
//     var todoIndex = findTodoIndexById(todoID);
//     gTodos.splice(todoIndex, 1);
//     saveTodos()
// }

// function setFilterStatus(statusFilter) {
//     gStatusFilter = statusFilter;
// }

// function setSortStatus(statusSort) {
//     gStatusSort = statusSort;
// }

// function getActiveTodosCount() {
//     return gTodos.reduce(function (count, todo) {
//         if (!todo.isDone) count++;
//         return count;
//     }, 0);
// }

// function getTotalTodosCount() {
//     return gTodos.length;
// }