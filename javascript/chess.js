

window.ChessBoard = function(boardId, config) {

    var board = {};

    var options = {
        resize: true,
        orientation: 'w',
        minSquareSize: 10,
        maxSquareSize: 64
  };

   var selectedSquares = [];
   var dominoSquares = [];
   var missingSquares = [];

//This creates a board. 
    function createBoard(){
        var boardElement = document.getElementById(boardId);
        boardElement.classList.add('chessboard');
        board.element = boardElement;

 // Nasty bit to iterate through and make each tile black or white
        for (var row = 0; row < 8 ; row++ ){
            var rowElement = document.createElement('div');
        board[row] = {
            element: rowElement
      };

        for (var cols = 0; cols < 8; cols++){
            var squareElement = document.createElement('div');
        
            if ((row + cols) % 2 === 0) {
          squareElement.className = 'white tile';
          
        } else {
          squareElement.className = 'black tile';
        }

        squareElement.setAttribute('dataSquare', row + (8*cols));
        squareElement.addEventListener('click', onSquareClick);
        board[row][cols] = {
          element: squareElement
        };
        rowElement.appendChild(squareElement);
            }
        boardElement.appendChild(rowElement);
        }
    }
    createBoard();

    function makeDomino(first,second){
        first.classList.remove('selected');
        first.classList.add('domino');
        second.classList.add('domino');
        dominoSquares.push(first,second);
        selectedSquares = []
    }

    function adjacent(a,b){
        a = parseInt(a)
        b = parseInt(b)
        if (a+1 === b){
            return true
        }
        if (a-1 === b){
            return true;
        }
        if (a-8 === b){
            return true;
        }
        if (a+8 === b){
            return true;
        }
        return false;
    }

    function legalDomino(first,second){
        if (first != undefined){
                if(adjacent(first.getAttribute('dataSquare'),second.getAttribute('dataSquare'))){
                    return true;
                }
                else{
                    first.classList.remove('selected');
                    selectedSquares =[] ;
                    second.classList.add('selected');
                    selectedSquares.push(second);

                }
        }
        return false;
    }

    function onSquareClick(event){
        var select = event.target;
        if(dominoSquares.indexOf(select) > -1){
            return
        }

        if (legalDomino(selectedSquares[0],select)){
            makeDomino(selectedSquares[0],select);
        }
        else{
            select.classList.add('selected');
            selectedSquares.push(select);
        }
        
    }  
}


/*
this.selectSquare = function(square){
    var col = Math.floor(square.data-square/8);
    var row = square.data-square % 8 ;
    board[row][col].element.classList.add('selected');
}*/

this.unselectSquare = function(square){
    var col = Math.floor(square.data-square/8);
    var row = square.data-square % 8 ;
    board[row][col].element.classList.remove('selected');
}