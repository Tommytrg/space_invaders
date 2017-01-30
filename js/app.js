var game = new SpaceInvaders();
// ({
//   rows:80,
//   columns:90
// });
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
console.log("Hola");
   this.drawShip();
   this.cleanShip();
   this.assignControlsToKeys();
   this.drawShip();
   this.start();

 }

   /*for (var rowIndex = 0; rowIndex < options.rows; rowIndex++){
     for (var columnIndex = 0; columnIndex < options.columns; columnIndex++){
      grid.push('<div class="cuadrant" data-row="'+rowIndex+'" data-col="'+columnIndex+'" />');
     }
   }
   space.html(grid.join(""));
 }
 /*******************************************
 CONFIGURACION DEL JUEGO
 *******************************************/
//Funcion que asigna las teclas izq y dcha para el movimiento de la nave
SpaceInvaders.prototype.assignControlsToKeys = function(){
  window.addEventListener('keydown',function(e){
    var space = $(".space");
    var ship = $(".ship");
    var left = parseInt(ship.css("left"));
    var spaceWidth = parseInt(space.css("width")) - parseInt(ship.css("width"));
    var mov = 15;
     switch(e.keyCode){
       case 37:
       this.ship.shipMove("left");
       if (left - mov > 0)
         $(".ship").css("left","-="+mov+"");
       break;
       case 39:
       this.ship.shipMove("right");
       if (left + mov < spaceWidth)
         $(".ship").css("left","+="+mov+"");
       break;
   }
  });
};

//Funcion que actualiza el (turno del) juego
 SpaceInvaders.prototype.update = function(){
   console.log("Hola");
  //  this.moveShoots();
  //  this.checkShoots();
  this.drawShip();
  this.cleanShip();
  this.assignControlsToKeys();
  this.drawShip();
  this.start();

 };
/*
  $('poistion').on('keydown', function(e) {
    switch (e.keyCode) {
      case 37: // arrow left
        this.ship.goLeft();
        break;
      case 39: // arrow right
        this.ship.goRight();
        break;
      }
  }.bind(this));
};*/



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
          this.score.getPoints(alienObj);
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
// SpaceInvaders.prototype.start = function(){
//   if (!this.intervalId){
//     this.intervalId = setInterval(this.update.bind(this), 25);
//   }
// };
/**********************
INTERACCION CON HTML--DIBUJO
***********************/
SpaceInvaders.prototype.drawShip = function() {
  $('.ship').addClass('.ship');
};
SpaceInvaders.prototype.cleanShip = function() {
  $('.ship').removeClass('.ship');
};


//COMO DIBUJAR EL DISPARO ?
//COMO DIBUJAR EL TABLERO
//Problema que los  aliens no miden 1px y que la nave tampoco miden 50px*50px
/*
-Funciones de dibujar
-Dibujar   disparo
-Dibujar ship
-Dibujar alien
-Generar alien
-Mover alien
-Borrar alien
*/

/*********************************************************************
ESTADO DEL JUEGO
*********************************************************************/

//ACABAR f/
//Funcion que para el juego indicando que se ha perdido
SpaceInvaders.prototype.looseGame = function(){
  alert("GAME OVER");
  this.stop();
};

SpaceInvaders.prototype.stop = function(){
  if (this.intervalId){
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

SpaceInvaders.prototype.start = function(){
  setInterval(this.update.bind(this), 100);
};
