document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid');
    const squares = [];
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

        //Checks fo rows
        this.checkRow = function(squareBeingClicked) {
           let row = [[squareBeingClicked, squareBeingClicked -1, squareBeingClicked -2], 
           [squareBeingClicked, squareBeingClicked+1, squareBeingClicked-1],
           [squareBeingClicked, squareBeingClicked+1, squareBeingClicked +2], 
            ];
           let clickedColor = squares[squareBeingClicked].style.backgroundColor;
           const isBlank = squares[squareBeingClicked].style.backgroundColor === '';
           for(i = 0; i<3; i++){
            if((squareBeingClicked == 0) && (i == 0 || i == 1)) continue;
            if((squareBeingClicked == 1) && (i == 0)) continue;
            if((squareBeingClicked == 98) && (i == 2 )) continue;
            if((squareBeingClicked == 99) && (i == 2 || i == 1)) continue;
            if(row[i].every(index => squares[index].style.backgroundColor === clickedColor && !isBlank)){
                    score += 10;
                    scoreDisplay.innerHTML = "Score: " + score;
                    row[i].forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
           }
        }

        //Check for column
        this.checkColumn = function (squareBeingClicked) {
            let column = [
                [squareBeingClicked, squareBeingClicked + width, squareBeingClicked + width * 2 ],
                [squareBeingClicked, squareBeingClicked - width, squareBeingClicked + width ],
                [squareBeingClicked, squareBeingClicked - width, squareBeingClicked - width * 2 ]
            ]

            let row1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let row2 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
            let row10 = [90, 91, 92, 93, 94, 94, 95, 96, 97, 98, 99];
            let row9 = [80, 81, 82, 83, 84, 85, 86, 87, 88 ,89];

            let clickedColor = squares[squareBeingClicked].style.backgroundColor;
            const isBlank = squares[squareBeingClicked].style.backgroundColor === '';
            for(let i = 0; i<3; i++){
                
                if((row1.includes(squareBeingClicked) ) && (i == 1 || i == 2)) continue;
                if((row2.includes(squareBeingClicked) ) && (i==2)) continue;
                if((row9.includes(squareBeingClicked) ) && (i == 0 )) continue;
                if((row10.includes(squareBeingClicked) ) && (i == 0 || i == 1)) continue;

                
                if(column[i].every(index => squares[index].style.backgroundColor === clickedColor && !isBlank)) {
                    score += 10;
                    scoreDisplay.innerHTML = "Score: " + score;
                    column[i].forEach(index => {
                    squares[index].style.backgroundColor = ''
                    })
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
        

    }
    

    const gridManager = new GridMananger();
    gridManager.createGrid();
    squares.forEach(square => square.addEventListener('click', onClick));
    
function onClick() {
        squareBeingClicked = parseInt(this.id);
        gridManager.checkRow(squareBeingClicked);
        gridManager.checkColumn(squareBeingClicked);
        gridManager.moveDown();
    }

function pageRefresh(){
    gridManager.createGrid();
    score = 0;
    scoreDisplay.innerHTML = "Score: " + 0;
}

    window.setInterval(function() {

        gridManager.moveDown();
        
    }, 200)




















})