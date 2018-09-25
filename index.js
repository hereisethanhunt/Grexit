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
const GRID_LENGTH = 5;
//const GRID_LENGTH = 3;
var allowed_val = [];

for (var i = 0; i < (GRID_LENGTH*GRID_LENGTH); i++) allowed_val[i] = 1;


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
    
    allowed_val[parseInt(rowIdx) + parseInt(colIdx)*GRID_LENGTH] = 0;

    if(game.currentPlayer == "user_one_array")
    {
         grid[colIdx][rowIdx] = game.user_one;
         game.user_one_array[(parseInt(colIdx)*GRID_LENGTH) + parseInt(rowIdx)] = 1;    
    }
    else
    {
        grid[colIdx][rowIdx] = game.user_two; 
        game.user_two_array[(parseInt(colIdx)*GRID_LENGTH)+parseInt(rowIdx)] = 1;   
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

}

function checkWinner(elem, user){

        let win_flag = 0;
   
        for(var i=0; (i<GRID_LENGTH) && (win_flag===0); i++) // checking row and column win condition
        {
            let condition_row = 0;
            let condition_column = 0;
            for(var j=0; j< GRID_LENGTH;j++)
            {
                if(game[elem][ j + (GRID_LENGTH*i) ] === 1) // each row win condition
                {
                    condition_row+=1;
                }

                if(game[elem][ i + (GRID_LENGTH*j) ] === 1) // each column win condition
                {
                    condition_column+=1;
                }
            }

            if(condition_row === GRID_LENGTH || condition_column === GRID_LENGTH)
            {
                win_flag = 1;
                break;
            }
        }

        let condition_rightDiag = 0;
        for(var j=1; (j<= GRID_LENGTH) && (win_flag===0); j++) // right diagonal win condition
        {
            if(game[elem][ j* (GRID_LENGTH-1) ] === 1)
            {
                condition_rightDiag+=1;
            }
        }
        if(condition_rightDiag === GRID_LENGTH)
        {
            win_flag = 1;
        }    
    

        let condition_leftDiag = 0;
        for(var j=0; (j< GRID_LENGTH) && (win_flag===0); j++) // left diagonal win condition
        {
            if(game[elem][ j* (GRID_LENGTH+1) ] === 1)
            {
                condition_leftDiag+=1;
            }
        }
        if(condition_leftDiag === GRID_LENGTH)
        {
            win_flag = 1;
        }

        if(game.moves === (GRID_LENGTH*GRID_LENGTH)-1 && win_flag === 0)  // if game draw 
        {
            resetGame("Nobody");
        }
        else if(win_flag === 1)
        {
            resetGame(user);
        }    

}

function resetGame(user)
{
            document.getElementById("winner_name").innerHTML = user + " Wins!";
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
  user_one_array : [],
  user_two_array : []
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
