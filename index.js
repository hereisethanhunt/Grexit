/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
var allowed_val = [1,1,1,1,1,1,1,1,1];

function initializeGrid() {
    $('#myModal').modal('show');
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="fa fa-times"></span>';
        }
        else if (gridValue === 2) {
            content = '<span class="fa fa-circle-o"></span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {

    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    
    allowed_val[parseInt(rowIdx) + parseInt(colIdx)*3] = 0;

    if(game.currentPlayer == "user_one_array")
    {
         grid[colIdx][rowIdx] = game.user_one;
         game.user_one_array[(parseInt(colIdx)*3) + parseInt(rowIdx)] = 1;    
    }
    else
    {
        grid[colIdx][rowIdx] = game.user_two; 
        game.user_two_array[(parseInt(colIdx)*3)+parseInt(rowIdx)] = 1;   
    }
   
    renderMainGrid();
    checkWinner(game.currentPlayer , game.currentPlayer.replace('_array',''));

    if(game.currentPlayer === "user_one_array")   
        game.currentPlayer = 'user_two_array';
    else
        game.currentPlayer = "user_one_array";

    game.moves = game.moves+1;
    addClickHandlers();

}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    
    for (var idx = 0; idx < boxes.length; idx++) {

            if(allowed_val[idx] === 1)
            {
             boxes[idx].addEventListener('click', onBoxClick, false);   
            } 

    }

    if(game.moves === 9)
    {
        document.getElementById("winner_name").innerHTML = "Ended in Draw";
            $('#myModal_winner').modal('show');
            
            setTimeout(function(){
                window.location.reload(1);
            }, 1000);
    }

}

function checkWinner(elem, user){

    if(game[elem][0] === 1 && game[elem][1] === 1 && game[elem][2] === 1)
        {
            resetGame(user); 
        }
        else if(game[elem][3] === 1 && game[elem][4] === 1 && game[elem][5] === 1)
        {
           resetGame(user);
        }
        else if(game[elem][6] === 1 && game[elem][7] === 1 && game[elem][8] === 1)
        {
            resetGame(user);
        }
        else if(game[elem][0] === 1 && game[elem][4] === 1 && game[elem][8] === 1)
        {
            resetGame(user);
        }
        else if(game[elem][2] === 1 && game[elem][4] === 1 && game[elem][6] === 1)
        {
            resetGame(user);
        }
        else if(game[elem][0] === 1 && game[elem][3] === 1 && game[elem][6] === 1)
        {
            resetGame(user);
        }
        else if(game[elem][1] === 1 && game[elem][4] === 1 && game[elem][7] === 1)
        {
            resetGame(user);
        }
        else if(game[elem][2] === 1 && game[elem][5] === 1 && game[elem][8] === 1)
        {
            resetGame(user);
        }
    
}

function resetGame(user)
{
            document.getElementById("winner_name").innerHTML = user;
            $('#myModal_winner').modal('show');
            
            setTimeout(function(){
                window.location.reload(1);
            }, 1000);
            
}

// custom js

var game = {
  user_one: 1,
  user_two: 2,
  currentPlayer: 'user_one_array',
  moves: 0,
  user_one_array : [0,0,0,0,0,0,0,0,0],
  user_two_array : [0,0,0,0,0,0,0,0,0]
};

function setFig(id)
{
 if (id === 'x') {
    game.user_one = 1;
    game.user_two = 2;
  } else if (id === 'o') {
    game.user_one = 2;
    game.user_two = 1;
  }

}

initializeGrid();
renderMainGrid();
addClickHandlers();
