/*
 Objeto SpaceInvaders

 /*******************************************
 SPACE INVADERS
 *******************************************/
 function SpaceInvaders(){
   this.ship = new Ship();
   this.alien = new Alien(100,1,0,0);
   this.shipShoots = [];
   this.alienShoots = [];
   this.aliensArmy = [];
   //this.board = new Board(x,y);
   this.score = new Score();
 }

 SpaceInvaders.prototype.update = function(){
   this.moveShoots();
   this.checkShoots();
 };

 //COMO DIBUJAR EL TABLERO
 //Problema que los  aliens no miden 1px y que la nave tampoco
/*
-Funciones de dibujar
-Dibujar   disparo

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

SpaceInvaders.prototype.moveShoots = function(){
  if(alienShoots !== 0){
    this.alienShoots.moveAlienShoots();
  }
  if(this.shipShoots !== 0){
    this.shipShoots.moveShipShoots();
  }
};

SpaceInvaders.prototype.moveAlienShoots = function(){
  this.alienShoots.map(function (item){
     return item.moveBackWard();
  });
};

SpaceInvaders.prototype.moveShipShoots = function(){
  this.shipShoots.map(function (item){
     return item.moveForward();
  });
};

SpaceInvaders.prototype.checkShoots = function(){
  this.checkAlienShoots();
  this.checkShipShoots();
};

SpaceInvaders.prototype.checkShipShoots = function(){
  shipShoots.map(function(shootObj){
    aliensArmy.map(function(alienObj){
      if(shootObj.isAlienImpacted(alienObj)){
        this.removeLifeAlien(alienObj);
        this.removeShooting(shootObj);
        if(alienObj.life === 0){
          alienObj.removeAlien();
        }
      }
    });
  });
};

SpaceInvaders.prototype.checkAlienShoots = function(){
  alienShoots.map(function(shootObj){
    if(shootObj.isShipImpacted(this.ship)){
      this.removeLifeShip(alienObj);
      if(this.ship.life === 0){
        this.loseGame();
      }
    }
  });
};

/*********************************************************************
INTERACCION CON HTML
*********************************************************************/
//ACABAR f/
SpaceInvaders.prototype.looseGame = function(){};


//ES CORRECTO QUITAR LA CLASE O DEBERIA ELIMINAR EL DIV ?
SpaceInvaders.prototype.removeAlien = function() {
  $('.alien').removeClass('alien');
};

SpaceInvaders.prototype.removeShooting = function(){
    $('.shooting').removeClass('shooting');
};
//COMO DIBUJAR EL DISPARO ?
