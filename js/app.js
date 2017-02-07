
 /*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*//*//*/*//*/*//*/*//*
                              SPACE INVADERS
 /*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

/******************************************************************************
MOVIMIENTO
*******************************************************************************/
//Funcion que mueve los alien hacia abajo
SpaceInvaders.prototype.moveAliens = function(){
  // var mov =0.25;
  this.aliensArmy = $(".alien");
  // if(parseInt($(".alien").css("bottom")) > 350){
if(this.aliensArmy.length !== 0){
  console.log(parseInt(this.aliensArmy[this.aliensArmy.length - 1].style.bottom));
  if(parseInt(this.aliensArmy[this.aliensArmy.length - 1].style.bottom) < 86){
    // this.explosion(); implementar
    this.looseGame();
  }else{
    $(".alien").css("bottom","-=" + this.alienSpeed + "");
  }
}
};
//Funcion que mueve los disparos
SpaceInvaders.prototype.moveShoots = function(){
  // if(this.alienShoots.length !== 0){
  //   this.moveAlienShoots();
  // }
  if(this.shipShoots.length !== 0){
    this.moveShipShoots();
  }
};
//Funcion que mueve los disparos de ship
SpaceInvaders.prototype.moveShipShoots = function(){
     var mov = 60;
    $(".shipShooting").css("bottom","+=" + mov + "");
    //$(".shooting").stop().animate({bottom: '+=700'});
    // console.log("disparo en movimiento");
};
// SpaceInvaders.prototype.moveAlienShoots = function(){};
/******************************************************************************
DISPARO
*******************************************************************************/
//Funcion que comprueba si algun disparo impacta con algun alien
SpaceInvaders.prototype.checkShipShoots = function(){
  // this.shipShoots = document.getElementsByClassName("shooting");
  this.shipShoots = $(".shipShooting");
  this.aliensArmy = $(".alien");
  if(this.shipShoots.length !== 0 && this.aliensArmy.length !==0){
    for(var k = 0; k < this.shipShoots.length; k++ ){
      for(var l = 0; l < this.aliensArmy.length; l++){
        if( this.checkColision(this.shipShoots[k],this.aliensArmy[l])){
          this.returnPoints(this.aliensArmy[l]);
          this.music(3);
          this.aliensArmy[l].remove();
          this.shipShoots[k].remove();
        }
      }
    }

  }
};
//Funcion que comprueba si los disparo han impactado
SpaceInvaders.prototype.checkShoots = function(){
  // this.checkAlienShoots();
  this.checkShipShoots();
};
//Funcion que comprueba si 1 shooting y 1 alien esta en la misma posicion
SpaceInvaders.prototype.checkColision = function(shoot, alien){
  var alienBottom = parseInt(window.getComputedStyle(alien).bottom);
  var alienLeft = parseInt(window.getComputedStyle(alien).left);
  var alienHeight = 50; //parseInt(alien.style.height) ahorro de accesos al DOM
  var alienWidth = 50; //parseInt(alien.style.width) ahorro de accesos al DOM
  var shootBottom = shoot && parseInt(shoot.style.bottom);
  var shootLeft = shoot && parseInt(shoot.style.left);
  var shootHeight = 15; //parseInt(alien.style.height) ahorro de accesos al DOM
  var shootWidth = 4; //parseInt(alien.style.width) ahorro de accesos al DOM
  var shootRight = shootLeft + shootWidth;
  var alienRight = alienLeft + alienWidth;
  return alienBottom < shootBottom && shootLeft > alienLeft && shootRight < alienRight;
};
//SpaceInvaders.prototype.checkAlienShoots = function(){};
/******************************************************************************
CREACION DE ELEMENTOS
*******************************************************************************/
//Funcion que crea disparos
SpaceInvaders.prototype.createShooting = function(){
  this.shipShoots = document.getElementsByClassName("shipShooting");
  // console.log("Creando disparo");
  $(".space").prepend(($("<div></div>").addClass('shipShooting')).css("left",34 + parseInt(($(".ship").css("left")))));
};

SpaceInvaders.prototype.createAlienArmy = function(n){
  for(var aa = 1; aa < 11; aa++){
    for(var ab = 1; ab< 6; ab++){
      var alien = $("<div/>").addClass(`alien tipo${n} col${aa} row${ab}`);
    $(".space").append(alien);
    }
  }
};

/******************************************************************************
PINTADO Y BORRADO
*******************************************************************************/
//Funcion que dibuja la nave
SpaceInvaders.prototype.drawShip = function() {
  $('#ship').addClass('.ship');
};
//Funcion que dibuja el alien
SpaceInvaders.prototype.drawAliens =function(){
  this.aliensArmy.addClass("ali");
};
//FUNCION QUE DIBUJA EL SCORE
SpaceInvaders.prototype.drawPoints = function(){
  $(".score").empty().append(this.score.points );
};
//Funcion que dibuja los disparos
SpaceInvaders.prototype.drawShooting = function(){
  $('#shipShooting').addClass('shipShooting');
};
//Funcion que elimina un alien
SpaceInvaders.prototype.clearAliens = function(){
  this.aliensArmy = $(".alien");
    this.aliensArmy.removeClass("ali");
};
//Funcion que borra ship
SpaceInvaders.prototype.clearShip = function() {
  $('#ship').removeClass('.ship');
};
//Funcion que elimina los disparos que se salen de espacio de juego
SpaceInvaders.prototype.clearShootingIfIsOut = function(){
  var shoots = document.getElementsByClassName("shipShooting");
   for(var r = 0; r < shoots.length; r++){
     if(parseInt(shoots[r].style.bottom) > 1000){
       document.getElementsByClassName("shipShooting")[r].remove();
     }
   }
};
/******************************************************************************
CREACION Y MANTENIMIENTO DEL JUEGO
*******************************************************************************/
//Constructor de spaceinvaders
 function SpaceInvaders(){
   this.ship = new Ship();
   this.shipShoots = [];
   this.alienShoots = [];
   this.aliensArmy = [];
   this.score = new Score();
   this.level = 1;
   this.alienSpeed = 0.1;
   this.passd = false;
   this.start();
   this.gameInterval = setInterval(this.update.bind(this), 50);
 }
//Funcion que inicia el juego
SpaceInvaders.prototype.start = function(){
  this.assignControlsToKeys();
  //setInterval(this.update.bind(this), 50);
};
//Funcion que actualiza el juego
SpaceInvaders.prototype.update = function(){
  this.moveShoots();
  this.checkShoots();
  if(this.aliensArmy.length === 0){
    this.levelUp();
  }
  this.drawPoints();
  this.drawShip();
  this.clearShip();
  this.clearShootingIfIsOut();
  this.drawShooting();
  this.drawShip();
  this.clearAliens();
  this.moveAliens();
  this.drawAliens();
};
SpaceInvaders.prototype.levelUp = function(){
 var points = this.score.points;
 this.music(2);
  if(this.score.points > 45000){
    points = this.score.points % 45000;
  }
  switch (points) {
    case 5000:
      this.level++;
      this.startStage2();
      this.update();
      break;
    case 10000:
      this.level++;
      this.startStage3();
      this.update();
      break;
    case 15000:
      this.level++;
      this.startStage4();
      this.update();
      break;
    case 20000:
      this.level++;
      this.startStage5();
      this.update();
      break;
    case 25000:
      this.level++;
      this.startStage6();
      this.update();
      break;
    case 30000:
      this.level++;
      this.startStage7();
      this.update();
      break;
    case 35000:
      this.level++;
      this.startStage8();
      this.update();
      break;
    case 40000:
      this.level++;
      this.startStage9();
      this.update();
      break;
    case 45000:
      this.level++;
      this.startStage10();
      this.update();
      break;
    case 0:
      this.level++;
      this.startStage2();
      this.update();
      break;
  }
};
/*PERSONALIZAR MENSAJES*/
SpaceInvaders.prototype.startStage2 = function(){
  this.createAlienArmy(2);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".ship").css("background-image","url(''../img/halconmilenario.png')");
  // $(".html").css("border-color","red");
};
SpaceInvaders.prototype.startStage3 = function(){
  this.createAlienArmy(3);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".info").empty().prepend("Not bad...");
};
SpaceInvaders.prototype.startStage4 = function(){
  this.createAlienArmy(4);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".info").empty().prepend("Not bad...");
};
SpaceInvaders.prototype.startStage5 = function(){
  this.createAlienArmy(5);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".info").empty().prepend("Not bad...");
};
SpaceInvaders.prototype.startStage6 = function(){
  this.createAlienArmy(6);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".info").empty().prepend("Not bad...");
};
SpaceInvaders.prototype.startStage7 = function(){
  this.createAlienArmy(7);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".info").empty().prepend("Not bad...");
};
SpaceInvaders.prototype.startStage8 = function(){
  this.createAlienArmy(8);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".info").empty().prepend("Not bad...");
};
SpaceInvaders.prototype.startStage9 = function(){
  this.createAlienArmy(9);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".info").empty().prepend("Not bad...");
};
SpaceInvaders.prototype.startStage10 = function(){
  this.createAlienArmy(10);
  this.alienSpeed += 0.1;
  $("h2").empty().prepend("LEVEL "+this.level);
  // $(".info").empty().prepend("Not bad...");
};
//Funcion que asigna las teclas izq y dcha para el movimiento de la nave y espacio para disparo
SpaceInvaders.prototype.assignControlsToKeys = function(){
  window.addEventListener('keyup',function(e){
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
          if (left + mov + parseInt(ship.css("width")) < spaceWidth + 50){
            $(".ship").css("left","+=" + mov + "");
            //$(".ship").stop().animate({left: '+=60'});
            console.log(mov);
          }
        break;
      case 32:
        this.music(1);
        this.ship.shootToAlien();
        this.createShooting();
        break;
      case 71:
        $(".pulse-g").remove();
        $(".end").remove();
        this.music(3);
        this.newGame();
        break;
      case 103:
        $(".pulse-g").remove();
        $(".end").remove();
        this.music(3);
        this.newGame();
        break;
    }
  }.bind(this));
};
SpaceInvaders.prototype.music = function(num){
  var audio;
  switch (num) {
    case 1:
      //Disparo
      audio = new Audio("./sound/Laser_Shoot8.wav");
      audio.play();
      break;
    case 2:
    //lvlup
      audio = new Audio("./sound/Powerup.wav");
      audio.play();
      break;
    case 3:
      //hit
      audio = new Audio("./sound/Hit_Hurt.wav");
      audio.play();
      break;
  }
};
SpaceInvaders.prototype.newGame = function(){
  $(".alien").remove();
  this.createAlienArmy(1);
  this.score.points = 0;
  this.level = 1;
};
//Funcion que suma puntos a score
SpaceInvaders.prototype.returnPoints = function(alien){
  this.score.points += 100;
};
//Funcion que para el juego indicando que se ha perdido
SpaceInvaders.prototype.looseGame = function(){
  $(".space").append(($("<p>YOU LOOSE<p>").addClass("end")));
  $(".space").append(($("<p>Pulse G to start a new game</p>").addClass("pulse-g")));
  $(".alien").remove();
  this.alienSpeed = 0.1;
  // alert("GAME OVER");;
};

var game = new SpaceInvaders();
