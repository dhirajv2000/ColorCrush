document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid');
    let squares = [];
    const width = 10;
    let score = 0;
    const scoreDisplay = document.getElementById('score')

    //GridManager constructor function that creates an object
    function GridMananger(){
        this.width = width;

        //Stores the colors to be generated
        let boxColors = [
            'mediumspringgreen',
            'mediumslateblue',
            'lightsalmon'
        ]
        //score calculate
        this.scoreCalculate = function() {
            score += 10;
            scoreDisplay.innerHTML = "Score: " + score;
        }

       //Creates grid accordin to width and fills colors 
       this.createGrid = function() {
            for (let i = 0; i < width*width; i++) {
                const square = document.createElement('div');
                square.setAttribute('id', i);
                let randomColor = Math.floor(Math.random() * boxColors.length);
                square.style.backgroundColor = boxColors[randomColor]
                grid.appendChild(square);
                squares.push(square);
            }
        }

        // Check for possible edgecases in rows
        this.rowEdgeCase = function(squareBeingClicked, i) {
            let column1 = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
            let column2 = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
            let column9 = [8, 18, 28, 38, 48, 58, 68, 78, 88, 98];
            let column10 = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
            if((column1.includes(squareBeingClicked)) && (i == 0 || i == 1)) return true;
            if((column2.includes(squareBeingClicked)) && (i == 0)) return true;
            if((column9.includes(squareBeingClicked)) && (i == 2 )) return true;
            if((column10.includes(squareBeingClicked)) && (i == 2 || i == 1)) return true;

        }

        //Checks fo rows
        this.checkRow = function(squareBeingClicked) {
           let row = [
                [squareBeingClicked, squareBeingClicked -1, squareBeingClicked -2], 
                [squareBeingClicked, squareBeingClicked+1, squareBeingClicked-1],
                [squareBeingClicked, squareBeingClicked+1, squareBeingClicked +2], 
            ];
           let clickedColor = squares[squareBeingClicked].style.backgroundColor;
           const isBlank = squares[squareBeingClicked].style.backgroundColor === '';
           for(i = 0; i<3; i++){
            if(this.rowEdgeCase(squareBeingClicked, i)) continue;
            if(row[i].every(index => squares[index].style.backgroundColor === clickedColor && !isBlank)){
                    this.scoreCalculate();
                    row[i].forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
           }
        }

        //Check for possible column edge cases
        this.columnEdgeCase = function (squareBeingClicked, i) {
            let row1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let row2 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
            let row10 = [90, 91, 92, 93, 94, 94, 95, 96, 97, 98, 99];
            let row9 = [80, 81, 82, 83, 84, 85, 86, 87, 88 ,89];

            if((row1.includes(squareBeingClicked) ) && (i == 1 || i == 2)) return true;
            if((row2.includes(squareBeingClicked) ) && (i==2)) return true;
            if((row9.includes(squareBeingClicked) ) && (i == 0 )) return true;
            if((row10.includes(squareBeingClicked) ) && (i == 0 || i == 1)) return true;

        }

        //Check for column
        this.checkColumn = function (squareBeingClicked) {
            let column = [
                [squareBeingClicked, squareBeingClicked + width, squareBeingClicked + width * 2 ],
                [squareBeingClicked, squareBeingClicked - width, squareBeingClicked + width ],
                [squareBeingClicked, squareBeingClicked - width, squareBeingClicked - width * 2 ]
            ]

            let clickedColor = squares[squareBeingClicked].style.backgroundColor;
            const isBlank = squares[squareBeingClicked].style.backgroundColor === '';
            for(let i = 0; i<3; i++){   
                if(this.columnEdgeCase(squareBeingClicked, i)) continue;            
                if(column[i].every(index => squares[index].style.backgroundColor === clickedColor && !isBlank)) {
                    this.scoreCalculate();
                    column[i].forEach(index => {
                    squares[index].style.backgroundColor = ''
                    })
                  }
               }
        }

        //Shuffles colors
        this.gridShuffle = function () {
            for(i = 0; i < width * width; i++) {
                const isBlank = squares[i].style.backgroundColor === '';
                if(!isBlank) {
                    let randomColor = Math.floor(Math.random() * boxColors.length);
                    squares[i].style.backgroundColor = boxColors[randomColor];
                }
            }
        }
        //Brings down the blocks
        this.moveDown = function() {
            for( i = 0; i<90; i++) {
                if(squares[i + width].style.backgroundColor === '') {
                    squares[i+width].style.backgroundColor = squares[i].style.backgroundColor;
                    squares[i].style.backgroundColor = '';
                }
            }
        }
        
        //Refreshes grid
        this.gridRefresh = function () {
            grid.innerHTML = ""
            squares = [];
            gridManager.createGrid();
            squares.forEach(square => square.addEventListener('click', gridManager.onClick));
            score = 0;
            scoreDisplay.innerHTML = "Score: " + 0;
            
        }

        //detects squares that are clicked
        this.onClick = function() {
            squareBeingClicked = parseInt(this.id);
            gridManager.checkRow(squareBeingClicked);
            gridManager.checkColumn(squareBeingClicked);
            gridManager.moveDown();
        }
        
    }



const gridManager = new GridMananger();
gridManager.createGrid();
squares.forEach(square => square.addEventListener('click', gridManager.onClick));
document.getElementById('restart-button').addEventListener('click', gridManager.gridRefresh);
document.getElementById('shuffle-button').addEventListener('click', gridManager.gridShuffle);

window.setInterval(function() {

    gridManager.moveDown();
        
}, 200)



})


















})
