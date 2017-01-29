/*
 Objeto Game

 /*******************************************
 SPACE INVADERS debe ir en app.js?
 *******************************************/
 function SpaceInvaders(){
   this.ship = new Ship();
   this.alien = new Alien(100,1,0,0);
   //array de aliens
   //this.board = new Board(x,y);
   this.score = new Score();
 }

 //COMO DIBUJAR EL TABLERO
 //Problema que los  aliens no miden 1px y que la nave tampoco
/*
-Funciones de dibujar
-Dibujar disparo

-Dibujar ship

-Dibujar alien
-Generar alien
-Mover alien
-Borrar alien
*/
//Asiganacion de teclas izq y dcha para el movimiento de la nave
SpaceInvaders.prototype.assignControlsToKeys = function(){
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 37: // arrow left
        this.ship.goLeft();
        break;
      case 39: // arrow right
        this.ship.goRight();
        break;
      }
  }.bind(this));
};

Game.prototype.removeAlien = function() {
  $('.alien').removeClass('alien');
};
