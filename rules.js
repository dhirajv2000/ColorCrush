function Rules(gridManager) {

    let self = this;

    //Finds index of square being clicked
    this.findIndex = function (id) {
        let rowIndex = Math.floor(id / gridManager.width);
        let columnIndex = id % gridManager.width;
        return [rowIndex, columnIndex];
    }

    this.crushElements = function (crushArray) {
        crushArray.forEach(element => {
            let indices = this.findIndex(element);
            let rowIndex = indices[0];
            let colIndex = indices[1];
            gridManager.squares[rowIndex][colIndex].style.backgroundColor = '';
        });
    }

    //Checks rows and columns to be crushed
    this.checkCrush = function (squareBeingClicked) {
        let indices = this.findIndex(squareBeingClicked);
        let rowArray = [];
        let colArray = []
        const squareRowIndex = indices[0];
        const squareColumnIndex = indices[1];
        let clickedColor = gridManager.squares[squareRowIndex][squareColumnIndex].style.backgroundColor;
        const isBlank = gridManager.squares[squareRowIndex][squareColumnIndex].style.backgroundColor === '';
        if (isBlank) return;
        let visited = []
        for (let i = 0; i < gridManager.width; i++) {
            visited.push([])
        }
        let stack = [];
        stack.push(squareRowIndex + ',' + squareColumnIndex);
        while (stack.length != 0) {
            let x = stack.pop();
            y = x.split(',')
            let row = parseInt(y[0])
            let col = parseInt(y[1])
            if (row < 0 || col < 0 || row >= gridManager.width || col >= gridManager.width || visited[row][col] || gridManager.squares[row][col].style.backgroundColor != clickedColor) {
                continue;
            }
            visited[row][col] = true;
            if (row == squareRowIndex && col == squareColumnIndex) {
                stack.push(row + "," + (col - 1)); //go left
                stack.push(row + "," + (col + 1)); //go right
                stack.push((row - 1) + "," + col); //go up
                stack.push((row + 1) + "," + col); //go down
            } else if (row == squareRowIndex) {
                rowArray.push(parseInt(gridManager.squares[row][col].id));
                stack.push(row + "," + (col - 1)); //go left
                stack.push(row + "," + (col + 1)); //go right
            } else if (col == squareColumnIndex) {
                colArray.push(parseInt(gridManager.squares[row][col].id));
                stack.push((row - 1) + "," + col); //go up
                stack.push((row + 1) + "," + col); //go down
            }
        }
        colArray.push(squareBeingClicked)
        rowArray.push(squareBeingClicked);
        if (rowArray.length >= 3) {
            this.crushElements(rowArray);
            this.scoreCalculate(rowArray.length);
            colArray.pop();
            if (colArray.length >= 2) {
                this.crushElements(colArray)
                this.scoreCalculate(colArray.length)
                gridManager.startMoveDown();
                return
            } else {
                gridManager.startMoveDown();
                colArray.push(squareBeingClicked)
                return
            }
        }
        if (colArray.length >= 3) {
            this.crushElements(colArray)
            this.scoreCalculate(colArray.length)
            gridManager.startMoveDown();
        }

    }

    //Intitialises a new game
    this.newGame = function () {
        gridManager.createGrid(this.onClick);
        this.scoreReset();
    }

    //detects squares that are clicked
    this.onClick = function () {
        self.checkCrush(this.id);
    }
}