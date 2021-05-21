let crushArray = []
function DFS(grid) {
    let count = 0
    let h = grid.length;
    let l = grid.length;
    let visited = []
    for(let i = 0; i < h; i++){
        visited.push([])
    }
    let stack = [];
    stack.push(3 + ',' + 3)
    console.log('Depth-Frist Traversal');
    
    while(stack.length !=0) {
        let x = stack.pop();
        y = x.split(',')
        let row = parseInt(y[0])
        let col = parseInt(y[1])
        if(row<0 || col<0 || row>=h || col>=l || visited[row][col] ||grid[row][col] != 1){
            continue;
        }
      visited[row][col] = true;
      console.log(grid[row][col] + " ");
      crushArray.push(row)

      if(row == 3 && col == 3) {
        stack.push(row + "," + (col-1)); //go left
        stack.push(row + "," + (col+1)); //go right
        stack.push((row-1) + "," + col); //go up
        stack.push((row+1) + "," + col); //go down
    } else if(row == 3) {
        stack.push(row + "," + (col-1)); //go left
        stack.push(row + "," + (col+1)); //go right

    } else if(col == 3) {
        stack.push((row-1) + "," + col); //go up
        stack.push((row+1) + "," + col); //go down
    }
        
      
      
    }
    console.log(count)
    }
    
    
    const grid = [[0,0,0,1], 
                 [0,0,0,1], 
                 [0,0,0,1],
                 [0,0,1,1]]
    DFS(grid);
    console.log(crushArray)