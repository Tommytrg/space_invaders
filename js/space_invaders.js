//JUNTAR FUNCIONES REMOVELIFE Y SHOOT EN ALIEN Y SHIP
/*******************************************
SHIP
*******************************************/
//Constructor de ship
function Ship(life){
  this.life=life;
  this.position = {
    row : 10,
    column : 5
  };
}
//Funcion que mueve ship a la derecha o izquierda
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
//Funcion que mueve ship a la derecha
Ship.prototype.moveRightShip = function(){
  this.position.column += 1;
};
//Funcion que mueve ship a la izquierda
Ship.prototype.moveLeftShip = function(){
  this.position.row += 1;
};
//Funcion que hace que ship dispare
Ship.prototype.shootToAlien = function( ){
  return new Shooting(this.position.row-1, this.position.column);
};
//Funcion que le resta 1 pto de vida a ship
Ship.prototype.removeLifeShip = function(){
this.life -= 1;
};
/*******************************************
ALIEN
*******************************************/
//Constructor de alien
function Alien(points,life,positionX, positionY){
  this.life = life;
  this.points = points;
  this.position = {
    row : positionY,
    column : positionX
  };
}

//Function que resta vida al alien
Alien.prototype.removeLifeAlien = function(){
  this.life -= 1;
};

//Funcion que mueve al alien derecha
Alien.prototype.moveRightAlien = function(){
  this.position.row += 1;//? cambiar a el movimiento de la nave
};
//Funcion mover alien izquierda
Alien.prototype.moveLeftAlien = function(){
  this.position.row -= 1;
};
//uncion mover alien hacia abajo
Alien.prototype.moveDownAlien = function(){
  this.position.column += 1;
};
//funcion eliminar alien?
Alien.prototype.shootToShip = function(){
  return new Shooting(this.position.row-4,thi.position.column);
};

//JUNTAR LA FUNCION DE DISPARO DE ALIEN Y SHIP?
//JUNTAR LA FUNCION DE IMPACTO PARA ALIEN Y SHIP?
/*******************************************
SHOOTING
*******************************************/
//Constructor de Shooting
function Shooting(positionX,positionY){
  this.position = [
    {row: positionY, column: positionX + 4},
    {row: positionY, column: positionX + 3},
    {row: positionY, column: positionX + 2},
    {row: positionY, column: positionX + 1},
    {row: positionY, column: positionX}
];}
// Shooting.prototype.move = function(){
//   while(!this.impacted(alienPosition) || this.isOutOfSpace()){
//     this.goForward();
//   }
// };
//Funcion que mueve shooting hacia la parte superior
Shooting.prototype.goForwardShooting = function(){
  var head = this.position[0];
  this.position.unshift({
    row: head.row - 1,
    column: head.column
  });
  this.position.pop();
};
//Funcion que mueve shooting a la parte inferior
Shooting.prototype.goBackwardShooting = function(){
  var head = this.position[4];
  this.position.push(this.position.shift({
    row: head.row,
    column: head.column
  }));
};

/************** ******************************
ELEGIR UNA FUNCION DE LAS DOS ?
******************************************/
//Funcion que devuelve true si shooting impacta con un alien
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
//Constructor de Score
function Score(){
  this.points = 0;
  this.history = [];
}
Score.prototype.sortScores = function(){
  this.history = this.history.sort(function(a,b){
    return a.score-b.score;
  });
};
//Funcion que añade puntos a score
Score.prototype.getPoints = function(points){
  this.score += points;
};

function ScoresHistory(name,number){
  this.name = name;
  this.number =number;
}
