//Maintains the grid squares
function GridMananger (width) {
    const grid = document.querySelector('.grid');
    this.squares = [];
    this.width = width;

    //Variable that stores the various grid colors
    let boxColors = [
        'mediumspringgreen',
        'mediumslateblue',
        'lightsalmon'
    ]

    //Creates grid accordin to width and fills colors 
    this.createGrid = function () {
        let squareNumber = 0;
        let gridDimension = this.width * (50 + 4.8)
        grid.style.width = gridDimension.toString() + 'px';
        grid.style.height = gridDimension.toString() + 'px';
        for(let i = 0; i < this.width; i++) {
            this.squares.push([])
            for(let j = 1; j <= this.width;   j++) {
                const square = document.createElement('div');
                square.setAttribute('id',squareNumber);
                squareNumber++;
                let randomColor = Math.floor(Math.random() * boxColors.length);
                square.style.backgroundColor = boxColors[randomColor];
                grid.appendChild(square);
                this.squares[i].push(square)
            }
        }
    }

    //Brings down the blocks
    this.moveDown = function() {
        for( i = 0; i < this.width - 1; i++) {
          for( j =0; j < this.width; j++){
              if(this.squares[i+1][j].style.backgroundColor === '') {
                  this.squares[i+1][j].style.backgroundColor = this.squares[i][j].style.backgroundColor;
                  this.squares[i][j].style.backgroundColor = ''
              }
          } 
        }
    }


     //Refreshes grid
     this.gridRefresh = function () {
        grid.innerHTML = ""
        this.squares = [];
        let newWidth = prompt('Enter new width')
        this.width = parseInt(newWidth);
        this.createGrid();
    }

    //shuffles grid    
    this.gridShuffle = function () {
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.width; j++){
                const isBlank = this.squares[i][j].style.backgroundColor === '';
                if(!isBlank) {
                    let randomColor = Math.floor(Math.random() * boxColors.length);
                    this.squares[i][j].style.backgroundColor = boxColors[randomColor];
                }
            }
        }
    
    }

}

   
   


