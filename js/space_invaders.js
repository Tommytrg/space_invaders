//JUNTAR FUNCIONES REMOVELIFE Y SHOOT EN ALIEN Y SHIP
/*******************************************
SHIP
*******************************************/
function Ship(life){
  this.life=life;
  this.position = {
    row : 10,
    column : 5
  };
}

Ship.prototype.shipMove = function(direction){
  switch (direction) {
    case "right":
      this.moveRightShip();
      break;
    case "left":
      this.moveLeftShip();
      break;
  }
};

Ship.prototype.moveRightShip = function(){
  this.position.column += 1;
};

Ship.prototype.moveLeftShip = function(){
  this.position.row += 1;
};

Ship.prototype.shootToAlien = function(){
  return new Shooting(this.position.row-1, this.position.column);
};

Ship.prototype.removeLifeShip = function(){
this.life -= 1;
};
/*******************************************
ALIEN
*******************************************/
function Alien(points,life,positionX, positionY){
  this.life = life;
  this.points = points;
  this.position = {
    row : positionY,
    column : positionX
  };
}

//function que resta vida al alien
Alien.prototype.removeLifeAlien = function(){
  this.life -= 1;
};

//funcion que mueve al alien derecha
Alien.prototype.moveRightAlien = function(){
  this.position.row += 1;
};
//funcion mover alien izquierda
Alien.prototype.moveLeftAlien = function(){
  this.position.row -= 1;
};
//funcion mover alien hacia abajo
Alien.prototype.moveDownAlien = function(){
  this.position.column += 1;
};
//funcion eliminar alien?
Alien.prototype.shootToShip = function(){
  return new Shooting(this.position.row-4,thi.position.column);
};

//funcion disparo alien
//JUNTAR LA FUNCION DE DISPARO DE ALIEN Y SHIP?
//funcion de acierto de disparo alien
//JUNTAR LA FUNCION DE IMPACTO PARA ALIEN Y SHIP?
/*******************************************
SHOOTING
*******************************************/
function Shooting(positionX,positionY){
  this.position = [
    {row: positionY, column: positionX + 4},
    {row: positionY, column: positionX + 3},
    {row: positionY, column: positionX + 2},
    {row: positionY, column: positionX + 1},
    {row: positionY, column: positionX}
];}
//COMO HACER QUE DETECTE SI HA IMPACTADO CON UN ALIEN?
// Shooting.prototype.move = function(){
//   while(!this.impacted(alienPosition) || this.isOutOfSpace()){
//     this.goForward();
//   }
// };
Shooting.prototype.goForwardShooting = function(){
  var head = this.position[0];
  this.position.unshift({
    row: head.row - 1,
    column: head.column
  });
  this.position.pop();
};

Shooting.prototype.goBackwardShooting = function(){
  var head = this.position[4];
  this.position.push(this.position.shift({
    row: head.row,
    column: head.column
  }));
};

//Funcion que comprueba si el disparo ha acertado a un alien.
//recorrer el array de aliens comrpobando si alguno ha sido impactado
/********************************************
ELEGIR UNA FUNCION DE LAS DOS?
******************************************/
Shooting.prototype.isAlienImpacted = function(alien){
  return alien.position.row === this.position[0].row &&
   alien.position.column === this.position[0].column;
};

// function alienIsImpacted(shoot, alien){
//   return alien.position.row === shoot.position[0].row &&
//    alien.position.column === shoot.position[0].column;
// }


/*******************************************
SCORE
*******************************************/
function Score(){
  this.score = 0;
}
Score.prototype.getPoints = function(points){
  this.score += points;
};
