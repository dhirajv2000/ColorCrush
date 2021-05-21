document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid');
    let squares = [];
    let width = 10;
    let score = 0;
    const scoreDisplay = document.getElementById('score')

    //GridManager constructor function that creates an object
    function GridMananger(){


        //Stores the colors to be generated
        let boxColors = [
            'mediumspringgreen',
            'mediumslateblue',
            'lightsalmon'
        ]
        //score calculate
        this.scoreCalculate = function(length) {
            score += 10 * length;
            scoreDisplay.innerHTML = "Score: " + score;
        }

       //Creates grid accordin to width and fills colors 
        this.createGrid = function () {
            let squareNumber = 0;
            let gridDimension = width * (50 + 4.8)
            grid.style.width = gridDimension.toString() + 'px';
            grid.style.height = gridDimension.toString() + 'px';
            for (let i = 0; i < width; i++) {
                for(let j = 0; j < width; j++) {
                    squares[i] = [];
                }
            }
            for(let i = 0; i < width; i++) {
                for(let j = 1; j <= width;   j++) {
                    const square = document.createElement('div');
                    square.setAttribute('id',squareNumber);
                    squareNumber++;
                    let randomColor = Math.floor(Math.random() * boxColors.length);
                    square.style.backgroundColor = boxColors[randomColor];
                    square.addEventListener('click', this.onClick);
                    grid.appendChild(square);
                    squares[i].push(square)
                }
            }
        }

        //Finds index of square being clicked
        this.findIndex = function(squareBeingClicked) {
            let squareRowIndex = Math.floor(squareBeingClicked / width);
            let squareColumnIndex = squareBeingClicked % width;
            return [squareRowIndex, squareColumnIndex];
        }

        this.crushElements = function(crushArray) {
            crushArray.forEach(element => {
                let indices = this.findIndex(element);
                let rowIndex = indices[0];
                let colIndex = indices[1];
                squares[rowIndex][colIndex].style.backgroundColor = '';
            });
        }

        this.checkCrush = function(squareBeingClicked) {
            let indices = this.findIndex(squareBeingClicked);
            let crushArray = [];
            const squareRowIndex = indices[0];
            const squareColumnIndex = indices[1];
            let clickedColor = squares[squareRowIndex][squareColumnIndex].style.backgroundColor;
            const isBlank = squares[squareRowIndex][squareColumnIndex].style.backgroundColor === '';
            if(isBlank) return;
            let visited = []
            for(let i = 0; i < width; i++){
            visited.push([])
            }
            let stack = [];
            stack.push(squareRowIndex + ',' + squareColumnIndex);
            while(stack.length !=0) {
                let x = stack.pop();
                y = x.split(',')
                let row = parseInt(y[0])
                let col = parseInt(y[1])
                if(row<0 || col<0 || row>=width || col>=width || visited[row][col] || squares[row][col].style.backgroundColor != clickedColor){
                    continue;
                }
                crushArray.push(parseInt(squares[row][col].id));
                visited[row][col] = true;
                stack.push(row + "," + (col-1)); //go left
                stack.push(row + "," + (col+1)); //go right
                stack.push((row-1) + "," + col); //go up
                stack.push((row+1) + "," + col); //go down
            }

            this.crushElements(crushArray);
            this.scoreCalculate(crushArray.length)
            this.moveDown();
        }

        /*//Checks fo rows
        this.checkRow = function(squareBeingClicked) {
            let indices = this.findIndex(squareBeingClicked);
            const squareRowIndex = indices[0];
            const squareColumnIndex = indices[1];
            let clickedColor = squares[squareRowIndex][squareColumnIndex].style.backgroundColor;
            const isBlank = squares[squareRowIndex][squareColumnIndex].style.backgroundColor === '';
            let crushArray = []
            for(i = squareColumnIndex; i < squares[squareRowIndex].length; i++) {
                if(squares[squareRowIndex][i].style.backgroundColor === clickedColor && !isBlank) {
                    crushArray.push(i);
                }else break;
            }
            for(i = squareColumnIndex; i >=0; i--) {
                if(squares[squareRowIndex][i].style.backgroundColor === clickedColor && !isBlank) {
                    crushArray.push(i);
                }else break;
            }
            this.checkColumn(squareBeingClicked);
            if(crushArray.length > 3){
                gridManager.scoreCalculate(crushArray.length);
                crushArray.forEach(index => {
                    squares[squareRowIndex][index].style.backgroundColor = '';
                })
            }
            this.moveDown();
        }*/


        /*//Check for column
        this.checkColumn = function(squareBeingClicked) {
            let indices = this.findIndex(squareBeingClicked);
            const squareRowIndex = indices[0];
            const squareColumnIndex = indices[1];
            let clickedColor = squares[squareRowIndex][squareColumnIndex].style.backgroundColor;
            const isBlank = squares[squareRowIndex][squareColumnIndex].style.backgroundColor === '';
            let crushArray = []
            for(i = squareRowIndex; i < squares[squareColumnIndex].length; i++) {
                if(squares[i][squareColumnIndex].style.backgroundColor === clickedColor && !isBlank) {
                    crushArray.push(i);
                }else break;
            }
            for(i = squareRowIndex; i >=0; i--) {
                if(squares[i][squareColumnIndex].style.backgroundColor === clickedColor && !isBlank) {
                    crushArray.push(i);
                }else break;
            }
            if(crushArray.length > 3){
                gridManager.scoreCalculate(crushArray.length);
                crushArray.forEach(index => {
                    squares[index][squareColumnIndex].style.backgroundColor = '';
                })
            }
            this.moveDown();
        }*/


        //Shuffles colors
        this.gridShuffle = function () {
            for(i = 0; i < width; i++) {
                for(j = 0; j < width; j++){
                    const isBlank = squares[i][j].style.backgroundColor === '';
                    if(!isBlank) {
                        let randomColor = Math.floor(Math.random() * boxColors.length);
                        squares[i][j].style.backgroundColor = boxColors[randomColor];
                    }
                }
            }
        
        }
        //Brings down the blocks
        this.moveDown = function() {
            for( i = 0; i < width - 1; i++) {
              for( j =0; j < width; j++){
                  if(squares[i+1][j].style.backgroundColor === '') {
                      squares[i+1][j].style.backgroundColor = squares[i][j].style.backgroundColor;
                      squares[i][j].style.backgroundColor = ''
                  }
              } 
            }
        }
        
        
     
        //Refreshes grid
        this.gridRefresh = function () {
            grid.innerHTML = ""
            squares = [];
            let newWidth = prompt('Enter new width')
            width = parseInt(newWidth);
            console.log(typeof width)
            gridManager.createGrid();
            score = 0;
            scoreDisplay.innerHTML = "Score: " + 0;
            
        }

        //detects squares that are clicked
        this.onClick = function() {
            squareBeingClicked = parseInt(this.id);
            gridManager.checkCrush(squareBeingClicked);
        }
        
    }



const gridManager = new GridMananger();
gridManager.createGrid();
document.getElementById('restart-button').addEventListener('click', gridManager.gridRefresh);
document.getElementById('shuffle-button').addEventListener('click', gridManager.gridShuffle);

window.setInterval(function() {

    gridManager.moveDown();
        
}, 200)



})