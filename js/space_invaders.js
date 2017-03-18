/*******************************************
SHIP
*******************************************/
function Ship() {
    this.position = {
        row: 10,
        column: 5
    };
}

Ship.prototype.move = function(direction) {
    switch (direction) {
        case "right":
            this.moveRight();
            break;
        case "left":
            this.moveLeft();
            break;
    }
};

Ship.prototype.moveRight = function() {
    this.position.column += 1;
};

Ship.prototype.moveLeft = function() {
    this.position.row += 1;
};
/*******************************************
ALIEN
*******************************************/
function Alien(points, life) {
    this.life = life;
    this.points = points;
    this.position = {
        row: 1,
        column: 1
    };
}

/*******************************************
SHOOTING
*******************************************/
function Shooting() {
    this.position = [{
            row: 1,
            column: 5
        },
        {
            row: 1,
            column: 4
        },
        {
            row: 1,
            column: 3
        },
        {
            row: 1,
            column: 2
        },
        {
            row: 1,
            column: 1
        }
    ];
}
Shooting.prototype.goForward = function() {
    var head = this.position[0];
    this.position.unshift({
        row: head.row - 1,
        column: head.column
    });
    this.body.pop();
};
