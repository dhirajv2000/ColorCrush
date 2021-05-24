document.addEventListener("DOMContentLoaded", () => {

   let defaultBoardWidth = 10; //Sets default width of the board
   
   //Creating a instance of gridManager
   const gridManager = new GridMananger(defaultBoardWidth);
   gridManager.createGrid();

   //Inherting properties of score from rules
   Rules.prototype = Object.create(Score.prototype);
   Rules.prototype.constructor = Rules;

   //Creating an instance of rules
   const rules = new Rules(gridManager);


   addSquareEventListener(); // adds event listener to all the squares

   //Click listeners
   document.getElementById('restart-button').addEventListener('click', gridRefresh);
   document.getElementById('shuffle-button').addEventListener('click', gridShuffle);

   //Driver functions
   function gridRefresh () {
      gridManager.gridRefresh();
      addSquareEventListener();
   }

   function gridShuffle () {
      gridManager.gridShuffle();
   }

   function onGridClick () {
      rules.onClick(this.id);
   }

   function addSquareEventListener () {
      for(let i = 0; i < gridManager.width; i++){
         gridManager.squares[i].forEach(square => square.addEventListener('click', onGridClick))
      }
   }

   
   window.setInterval(function() {

      gridManager.moveDown();
          
  }, 200)

})