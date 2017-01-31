
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
    // console.log("adding event listener");
  window.addEventListener('keydown',function(e){
    var space = $(".space");
    var ship = $(".ship");
    var left = parseInt(ship.css("left"));
    var spaceWidth = parseInt(space.css("width")) - parseInt(ship.css("width"));
    // shipSize=partse
    var mov = 20;
     switch(e.keyCode){
       case 37:
       this.ship.shipMove("left");
       if (left - mov > 0){
         $(".ship").css("left","-="+mov+"");
         //$(".ship").stop().animate({left: '-=60'});
       }

         break;
      case 39:
        this.ship.shipMove("right");
          if (left + mov + parseInt(ship.css("width")) < spaceWidth){
            $(".ship").css("left","+="+mov+"");
            //$(".ship").stop().animate({left: '+=60'});
            console.log(mov);
          }

        break;
      case 32:
        this.shipShoots.push(this.ship.shootToAlien());
        this.createShooting();
        break;
    }
  }.bind(this));
};

//Funcion que actualiza el (turno del) juego
 SpaceInvaders.prototype.update = function(){
   console.log("Hola");
  this.moveShoots();
  this.checkShoots();
  this.drawShip();
  this.cleanShip();
  this.drawShooting();
  this.drawShip();

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

//Funcion que mueve los disparos de los alien
SpaceInvaders.prototype.moveAlienShoots = function(){
  window.addEventListener('keydown',function(e){

    // $(".shooting").css("bottom","-="+mov+"");
    // $(".shooting").stop().animate({bottom: '+=60'});

    this.alienShoots.map(function (item){
        item.moveBackWard();
    });
  }.bind(this));
};
//Funcion que mueve los disparos de ship
SpaceInvaders.prototype.moveShipShoots = function(){
     var mov = 100;
    // console.log(mov);
    $(".shooting").css("bottom","+="+mov+"");

    //$(".shooting").stop().animate({bottom: '+=700'});

    for(var m = 0; m< this.shipShoots.length; m++){
      this.shipShoots[m].goForwardShooting();
    }
    // console.log("disparo en movimiento");
};



//Funcion que mueve los disparos
SpaceInvaders.prototype.moveShoots = function(){
  if(this.alienShoots.length !== 0){
    this.moveAlienShoots();

  }
  if(this.shipShoots.length !== 0){
    // console.log("dentro");
    this.moveShipShoots();
  }
};


//Funcion que comprueba si los disparo han impactado
SpaceInvaders.prototype.checkShoots = function(){
  this.checkAlienShoots();
  this.checkShipShoots();
};

SpaceInvaders.prototype.checkShipShoots = function(){
  if(this.shipShoots.length !== 0 && this.aliensArmy.length !==0){
    for(var k = 0; k < this.shipShoots.length; k++ ){
      for(var l = 0; l<this.aliensArmy.length;l++){
          if(this.shipShoots[k].isAlienImpacted(this.aliensArmy[l])){
            this.removeLifeAlien(this.aliensArmy[l]);
            thihs.clearShooting(this.shipShoots[k]);
            if(this.aliensArmy[l].life === 0){
              this.clearAlien(aliensArmy[l]);
              this.score.getPoints(aliensArmy[l]);
            }
          }
      }
    }
  }
};

SpaceInvaders.prototype.checkAlienShoots = function(){
  for(var m = 0; m < this.alienShoots.length; m++){
    if(alienShoots[m].isShipImpacted(this.ship)){
      this.removeLifeShip();
      if(this.ship === 0){
        this.loseGame();
      }
    }
  }
};

/*********************************************************************
INTERACCION CON HTML
*********************************************************************/
//Funcion que borra un alien
SpaceInvaders.prototype.cleanAlien = function() {
  $('#alien').removeClass('alien');
};
//Funcion que borra un shooting
SpaceInvaders.prototype.cleanShooting = function(){
    $('#shooting').removeClass('shooting');
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
  $('#ship').addClass('.ship');
};
SpaceInvaders.prototype.cleanShip = function() {
  $('#ship').removeClass('.ship');
};
SpaceInvaders.prototype.createShooting = function(){
      this.shipShoots.push(new Shooting());
  $(".space").prepend(($("<div></div>").addClass('shooting').attr('id','shooting')).css("left",34+parseInt(($(".ship").css("left")))));
  // console.log("Creando disparo");
};

SpaceInvaders.prototype.drawShooting = function(){
  $('#shooting').addClass('shooting');
};
SpaceInvaders.prototype.cleanShooting = function(){
  $('#shooting').remove('shooting');
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
  console.log("calling start");
  this.assignControlsToKeys();
  setInterval(this.update.bind(this), 100);
};

var game = new SpaceInvaders();
