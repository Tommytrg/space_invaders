
/*******************************************
SHIP
*******************************************/
function Ship(){
  this.position = {
    row : 10,
    column : 5
  };
}

Ship.prototype.move = function(direction){
  switch (direction) {
    case "right":
      this.moveRight();
      break;
    case "left":
      this.moveLeft();
      break;
  }
};

Ship.prototype.moveRight = function(){
  this.position.column += 1;
};

Ship.prototype.moveLeft = function(){
  this.position.row += 1;
};

Ship.prototype.shoot = function(){
  return new Shooting(this.position.row-1, this.position.column);
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
Alien.prototype.removeLife = function(){
  this.life -= 1;
};

//funcion que mueve al alien derecha
Alien.prototype.moveRight = function(){
  this.position.row += 1;
};
//funcion mover alien izquierda
Alien.prototype.moveLeft = function(){
  this.position.row -= 1;
};
//funcion mover alien hacia abajo
Alien.prototype.moveDown = function(){
  this.position.column += 1;
};
//funcion eliminar alien?

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
Shooting.prototype.goForward = function(){
  var head = this.position[0];
  this.position.unshift({
    row: head.row - 1,
    column: head.column
  });
  this.body.pop();
};
//Funcion que comprueba si el disparo ha acertado a un alien.
/********************************************
ELEGIR UNA FUNCION DE LAS DOS?
******************************************/
Shooting.prototype.alienImpacted = function(alien){
  return alien.position.row === this.position[0].row &&
   alien.position.column === this.position[0].column;
};

function alienIsImpacted(shoot, alien){
  return alien.position.row === shoot.position[0].row &&
   alien.position.column === shoot.position[0].column;
}
/*******************************************
SCORE
*******************************************/
function Score(){
  this.score = 0;
}

Score.prototype.getPoints = function(points){
  this.score += points;
};
