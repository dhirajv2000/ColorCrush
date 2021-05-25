document.addEventListener("DOMContentLoaded", () => {

   let defaultBoardWidth = 10; //Sets default width of the board
   
   //Creating a instance of gridManager
   const gridManager = new GridMananger(defaultBoardWidth);

   //Inherting properties of score to rules
   Rules.prototype = Object.create(Score.prototype);
   Rules.prototype.constructor = Rules;

   //Creating an instance of rules
   const rules = new Rules(gridManager);
   rules.newGame();


   //Click listeners
   document.getElementById('restart-button').addEventListener('click', gridRefresh);
   document.getElementById('shuffle-button').addEventListener('click', gridShuffle);

   //Driver functions
   function gridRefresh () {
      gridManager.gridRefresh();
      rules.newGame()
   }

   //shuffles the game
   function gridShuffle () {
      gridManager.gridShuffle();
   }

})