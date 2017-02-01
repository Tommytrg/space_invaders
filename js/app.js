
 /*******************************************
 SPACE INVADERS
 *******************************************/
//Constructor de spaceinvaders
 function SpaceInvaders(){
   this.ship = new Ship();
   this.shipShoots = [];
   this.alienShoots = [];
   this.aliensArmy = [];
   this.score = new Score();
   console.log("Hola");
   this.start();
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
        this.ship.shootToAlien();
        this.createShooting();
        break;
    }
  }.bind(this));
};

//Funcion que actualiza el (turno del) juego
 SpaceInvaders.prototype.update = function(){
  this.moveShoots();
  this.checkShoots();
  this.drawShip();
  this.clearShip();
  this.clearShootingIfIsOut();
  this.drawShooting();
  this.drawShip();

};

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

  this.shipShoots = document.getElementsByClassName("shooting");
  this.aliensArmy = $(".alien");
  if(this.shipShoots.length !== 0 && this.aliensArmy.length !==0){
    for(var k = 0; k < this.shipShoots.length; k++ ){
      for(var l = 0; l<this.aliensArmy.length;l++){
          if( this.colision(this.shipShoots[k],this.aliensArmy[l])){
            console.log(this.shipShoots[k]);
            this.clearAlien(this.aliensArmy[l]);
            console.log(this.shipShoots[k]);

            this.shipShoots[k].remove();
            }
          }
      }
    }
};

// $(".alien").css("top")

SpaceInvaders.prototype.colision = function(shoot, alien){
  // debugger;
  var alienBottom = parseInt(window.getComputedStyle(alien).bottom);
  var alienLeft = parseInt(window.getComputedStyle(alien).left);
  var alienHeight = 50; //parseInt(alien.style.height) ahorro de accesos al DOM
  var alienWidth = 50; //parseInt(alien.style.width) ahorro de accesos al DOM
  var shootBottom = parseInt(shoot.style.bottom);
  var shootLeft = parseInt(shoot.style.left);
  var shootHeight = 15; //parseInt(alien.style.height) ahorro de accesos al DOM
  var shootWidth = 4; //parseInt(alien.style.width) ahorro de accesos al DOM
  // console.log(alien);
  // console.log("alienBottom " +alienBottom);
  // console.log("alienLeft " +alienLeft);
  // console.log("shootBottom " +shootBottom);
  // console.log("shootLeft " +shootLeft);
  // console.log(!(
  //   ((alienBottom + alienHeight) < (shootBottom)) ||
  //   (alienBottom > (shootBottom + shootHeight)) ||//CAMBIAR POR && !!!!
  //   ((alienLeft + alienWidth) < shootLeft) ||
  //   (alienLeft > (shootLeft + shootWidth))
  // ));
  return !(
    ((alienBottom + alienHeight) < (shootBottom)) ||
    (alienBottom > (shootBottom + shootHeight)) &&//CAMBIAR POR && !!!!
    ((alienLeft + alienWidth) < shootLeft) ||
    (alienLeft > (shootLeft + shootWidth))
  );

//COMPLETAR
// SpaceInvaders.prototype.returnPoints() = function(alien){
//   var type = alien.attr("id");
//   switch (type) {
//     case :
//
//       break;
//     default:
//
//   }
// }
    // return !(
    //     ((a.y + a.height) < (b.y)) ||
    //     (a.y > (b.y + b.height)) ||
    //     ((a.x + a.width) < b.x) ||
    //     (a.x > (b.x + b.width))
    //parseInt(shoots[r].style.bottom
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
SpaceInvaders.prototype.clearAlien = function(alien) {
  alien.remove();
};
/**********************
INTERACCION CON HTML--DIBUJO
***********************/
SpaceInvaders.prototype.drawShip = function() {
  $('#ship').addClass('.ship');
};
SpaceInvaders.prototype.clearShip = function() {
  $('#ship').removeClass('.ship');
};
SpaceInvaders.prototype.createShooting = function(){
  this.shipShoots = document.getElementsByClassName("shooting");
  $(".space").prepend(($("<div></div>").addClass('shooting').attr('id','shooting')).css("left",34+parseInt(($(".ship").css("left")))));
  // console.log("Creando disparo");
};

SpaceInvaders.prototype.drawShooting = function(){
  $('#shooting').addClass('shooting');
};
SpaceInvaders.prototype.clearShootingIfIsOut = function(){
  var shoots = document.getElementsByClassName("shooting");
   for(var r = 0; r < shoots.length; r++){
     if(parseInt(shoots[r].style.bottom) > 1000){
       console.log("CACHIBACHE");
       document.getElementsByClassName("shooting")[r].remove();
     }
   }
};

SpaceInvaders.prototype.clearShooting = function(shoot){
    shoot.remove();
};

/*********************************************************************
ESTADO DEL JUEGO
*********************************************************************/
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
  // if(this.aliensArmy.length ===0){
  //   this.fillArmy();
  // }
  this.assignControlsToKeys();

    setInterval(this.update.bind(this), 100);
};

var game = new SpaceInvaders();


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/**************************COMENTARIOS*****************************************/
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//implementar vidas con class


//Funcion que borra un shooting

//Funcion que comienza el juego
// SpaceInvaders.prototype.start = function(){
//   if (!this.intervalId){
//     this.intervalId = setInterval(this.update.bind(this), 25);
//   }
// };

//
// if(this.shipShoots.length!==0){
//   var shoots = document.getElementsByClassName("shooting")[0];
//   console.log(shoots);
//   console.log(parseInt(shoots.));}
//  };
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

// SpaceInvaders.prototype.fillArmy = function(){
//   this.aliensArmy=this.generateAlienArmy([]);
// };
//
// SpaceInvaders.prototype.generateAlienArmy =function(army){
//   for(var b = 0; b < 4 ; b++){
//     army.push([]);
//     for(c = 0; c < 10; c++){
//       army[b].push(new Alien(1,100,0,0));
//     }
//   }
//   //Se da clase de columna
//   for(var d = 0; d < 4; d++){
//     for(var e = 0; e<10; e++){
//       army[d][e].addClass("col"+e);
//     }
//   }
//   //Se da la clase fila
//   for(var f = 0; f < 10; f++){
//     for(var g = 0; g<4; g++){
//       army[f][g].addClass("row"+g);
//     }
//   }
//   return army;
// };
  /*for (var rowIndex = 0; rowIndex < options.rows; rowIndex++){
     for (var columnIndex = 0; columnIndex < options.columns; columnIndex++){
      grid.push('<div class="cuadrant" data-row="'+rowIndex+'" data-col="'+columnIndex+'" />');
     }
   }
   space.html(grid.join(""));
 }
*/
