
var gCurrMeme = { selectedImgId: 5, selectedTxtIdx: 0, txts:
     [ { line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' } ]}
var gMemes=[];
var gNextMemeID;
function createMeme(selectedImgId,selectedTxtIdx,txts) {
    var meme = {
        ID:gNextID,
        selectedImgId,
        selectedTxtIdx,
        txts
    }
   // saveToStorage('meme', gNextMemeID);
    return meme;
}

function saveMemes() {
    saveToStorage('memes', gMemes);
}

function loadMemesData() {
    gMemes = loadFromStorage('memes', []);
    gNextMemeID = loadFromStorage('nextMemeID', 0)
    if (gNextMemeID.length === 0) createMemes();
}

function createMemes() {
    gMemes = [];
    gMemes.push(gCurrMeme);
}

function getCurrMemeToRender() {
    // var filteredTodos = gTodos.filter(function (todo) {
    //     return ((gStatusFilter === 'all') ||
    //         (gStatusFilter === 'active' && !todo.isDone) ||
    //         (gStatusFilter === 'done' && todo.isDone))
    // });
    // var SortedTodos;
    // SortedTodos = filteredTodos.sort(function(a,b){
    //     return a[gStatusSort]>b[gStatusSort]? 1 : a[gStatusSort]< b[gStatusSort]? -1 : 0;
    // })
    // return SortedTodos;
    return gCurrMeme;
}
function setCurrMemeData(selectedImgId,selectedTxtIdx,txts){
    gCurrMeme = createMeme(selectedImgId,selectedTxtIdx,txts);
}
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