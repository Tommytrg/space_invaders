 /*******************************************
 SPACE INVADERS
 *******************************************/
//Constructor de spaceinvaders
 function SpaceInvaders(){
   this.ship = new Ship();
   this.alien = new Alien(100,1,0,0);
   this.shipShoots = [];
   this.alienShoots = [];
   this.aliensArmy = [];
   //this.board = new Board(x,y);
   this.score = new Score();
 }

 /*******************************************
 CONFIGURACION DEL JUEGO
 *******************************************/
//Funcion que asigna las teclas izq y dcha para el movimiento de la nave
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
//Funcion que actualiza el (turno del) juego
 SpaceInvaders.prototype.update = function(){
   this.moveShoots();
   this.checkShoots();
 };
/*******************************************
FUNCIONES DE DISPARO
*******************************************/
//Funcion que mueve los disparos
SpaceInvaders.prototype.moveShoots = function(){
  if(alienShoots !== 0){
    this.alienShoots.moveAlienShoots();
  }
  if(this.shipShoots !== 0){
    this.shipShoots.moveShipShoots();
  }
};
//Funcion que mueve los disparos de los alien
SpaceInvaders.prototype.moveAlienShoots = function(){
  this.alienShoots.map(function (item){
     return item.moveBackWard();
  });
};
//Funcion que mueve los disparos de ship
SpaceInvaders.prototype.moveShipShoots = function(){
  this.shipShoots.map(function (item){
     return item.moveForward();
  });
};
//Funcion que comprueba si los disparo han impactado
SpaceInvaders.prototype.checkShoots = function(){
  this.checkAlienShoots();
  this.checkShipShoots();
};
//funcion que comprueba si los disparos de ship han impactado
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
//Funcion que comprueba si los disparos de los alien han impactado
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
//Funcion que para el juego indicando que se ha perdido
SpaceInvaders.prototype.looseGame = function(){};


//ES CORRECTO QUITAR LA CLASE O DEBERIA ELIMINAR EL DIV ?
//Funcion que borra un alien
SpaceInvaders.prototype.removeAlien = function() {
  $('.alien').removeClass('alien');
};
//Funcion que borra un shooting
SpaceInvaders.prototype.removeShooting = function(){
    $('.shooting').removeClass('shooting');
};
//Funcion que comienza el juego
SpaceInvaders.prototype.start = function(){
  if (!this.intervalId){
    this.intervalId = setInterval(this.update.bind(this), 25);
  }
};
//COMO DIBUJAR EL DISPARO ?


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
