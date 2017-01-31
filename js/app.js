
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
  window.addEventListener('keydown',function(e){

    var space = $(".space");
    var ship = $(".ship");
    var left = parseInt(ship.css("left"));
    var spaceWidth = parseInt(space.css("width")) - parseInt(ship.css("width"));
    // shipSize=partse
    var mov = 5;
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
  this.assignControlsToKeys();
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
    // var mov = 100;
    // console.log(mov);
    // $(".shooting").css("bottom","+="+mov+"");
    $(".shooting").stop().animate({bottom: '+=700'});

    for(var m = 0; m< this.shipShoots.length; m++){
      this.shipShoots[m].goForwardShooting();
    }
    console.log("disparo en movimiento");
};



//Funcion que mueve los disparos
SpaceInvaders.prototype.moveShoots = function(){
  if(this.alienShoots.length !== 0){
    this.moveAlienShoots();

  }
  if(this.shipShoots.length !== 0){
    console.log("dentro");
    this.moveShipShoots();
  }
};


//Funcion que comprueba si los disparo han impactado
SpaceInvaders.prototype.checkShoots = function(){
  this.checkAlienShoots();
  this.checkShipShoots();
};
//funcion que comprueba si los disparos de ship han impactado
SpaceInvaders.prototype.checkShipShoots = function(){
  //recorrer con for
};
//no funciona
// SpaceInvaders.prototype.checkShipShoots = function(){
//   if(this.shipShoots.length !== 0 && this.aliensArmy.length !==0){
//     this.shipShoots.map(function(shootObj){
//       this.aliensArmy.map(function(alienObj){
//         if(shootObj.isAlienImpacted(alienObj)){
//           this.removeLifeAlien(alienObj);
//           this.removeShooting(shootObj);
//           if(alienObj.life === 0){
//             alienObj.removeAlien();
//             this.score.getPoints(alienObj);
//           }
//         }
//       });
//     });
//   }
// };
//Funcion que comprueba si los disparos de los alien han impactado
//no funciona, recorrer con for
SpaceInvaders.prototype.checkAlienShoots = function(){
  this.alienShoots.map(function(shootObj){
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
  $('#alien').removeClass('alien');
};
//Funcion que borra un shooting
SpaceInvaders.prototype.removeShooting = function(){
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
  debugger
  $(".ship").append("<div></div>").addClass('.shooting').attr('id','shooting');
  console.log("Creando disparo");
};

SpaceInvaders.prototype.drawShooting = function(){
  $('#shooting').removeClass('.shooting');
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
  setInterval(this.update.bind(this), 1000);
};

var game = new SpaceInvaders();
