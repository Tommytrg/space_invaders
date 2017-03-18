/*jshint esversion:6*/
/******************************************************************************
MOVIMIENTO
*******************************************************************************/
SpaceInvaders.prototype.moveAliens = function() {
    // var mov =0.25;
    this.aliensArmy = $(".alien");
    // if(parseInt($(".alien").css("bottom")) > 350){
    if (this.aliensArmy.length !== 0) {
        console.log(parseInt(this.aliensArmy[this.aliensArmy.length - 1].style.bottom));
        if (parseInt(this.aliensArmy[this.aliensArmy.length - 1].style.bottom) < 86) {
            this.looseGame();
        } else {
            $(".alien").css("bottom", "-=" + this.alienSpeed + "");
        }
    }
};

SpaceInvaders.prototype.moveShoots = function() {
    if (this.shipShoots.length !== 0) {
        this.moveShipShoots();
    }
};

SpaceInvaders.prototype.moveShipShoots = function() {
    const mov = 60;
    $(".shipShooting").css("bottom", "+=" + mov + "");
};
/******************************************************************************
DISPARO
*******************************************************************************/
SpaceInvaders.prototype.checkShipShoots = function() {
    this.shipShoots = $(".shipShooting");
    this.aliensArmy = $(".alien");
    if (this.shipShoots.length !== 0 && this.aliensArmy.length !== 0) {
        for (let k = 0; k < this.shipShoots.length; k++) {
            for (let l = 0; l < this.aliensArmy.length; l++) {
                if (this.checkColision(this.shipShoots[k], this.aliensArmy[l])) {
                    this.returnPoints(this.aliensArmy[l]);
                    this.music(3);
                    this.aliensArmy[l].remove();
                    this.shipShoots[k].remove();
                }
            }
        }

    }
};
SpaceInvaders.prototype.checkShoots = function() {
    this.checkShipShoots();
};

SpaceInvaders.prototype.checkColision = function(shoot, alien) {
    let alienBottom = parseInt(window.getComputedStyle(alien).bottom);
    let alienLeft = parseInt(window.getComputedStyle(alien).left);
    let alienHeight = 50;
    let alienWidth = 50;
    let shootBottom = shoot && parseInt(shoot.style.bottom);
    let shootLeft = shoot && parseInt(shoot.style.left);
    let shootHeight = 15;
    let shootWidth = 4;
    let shootRight = shootLeft + shootWidth;
    let alienRight = alienLeft + alienWidth;
    return alienBottom < shootBottom && shootLeft > alienLeft && shootRight < alienRight;
};
/******************************************************************************
CREACION DE ELEMENTOS
*******************************************************************************/
SpaceInvaders.prototype.createShooting = function() {
    this.shipShoots = document.getElementsByClassName("shipShooting");
    $(".space").prepend(($("<div></div>").addClass('shipShooting')).css("left", 34 + parseInt(($(".ship").css("left")))));
};

SpaceInvaders.prototype.createAlienArmy = function(n) {
    for (let aa = 1; aa < 11; aa++) {
        for (let ab = 1; ab < 6; ab++) {
            const alien = $("<div/>").addClass(`alien tipo${n} col${aa} row${ab}`);
            $(".space").append(alien);
        }
    }
};

/******************************************************************************
PINTADO Y BORRADO
*******************************************************************************/
SpaceInvaders.prototype.drawShip = function() {
    $('#ship').addClass('.ship');
};

SpaceInvaders.prototype.drawAliens = function() {
    this.aliensArmy.addClass("ali");
};

SpaceInvaders.prototype.drawPoints = function() {
    $(".score").empty().append(this.score.points);
};

SpaceInvaders.prototype.drawShooting = function() {
    $('#shipShooting').addClass('shipShooting');
};

SpaceInvaders.prototype.clearAliens = function() {
    this.aliensArmy = $(".alien");
    this.aliensArmy.removeClass("ali");
};

SpaceInvaders.prototype.clearShip = function() {
    $('#ship').removeClass('.ship');
};

SpaceInvaders.prototype.clearShootingIfIsOut = function() {
    let shoots = document.getElementsByClassName("shipShooting");
    for (let r = 0; r < shoots.length; r++) {
        if (parseInt(shoots[r].style.bottom) > 1000) {
            document.getElementsByClassName("shipShooting")[r].remove();
        }
    }
};
/******************************************************************************
CREACION Y MANTENIMIENTO DEL JUEGO
*******************************************************************************/
function SpaceInvaders() {
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

SpaceInvaders.prototype.start = function() {
    this.assignControlsToKeys();
};

SpaceInvaders.prototype.update = function() {
    this.moveShoots();
    this.checkShoots();
    if (this.aliensArmy.length === 0) {
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
SpaceInvaders.prototype.levelUp = function() {
    let points = this.score.points;
    this.music(2);
    if (this.score.points > 45000) {
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
SpaceInvaders.prototype.startStage2 = function() {
    this.createAlienArmy(2);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);

};

SpaceInvaders.prototype.startStage3 = function() {
    this.createAlienArmy(3);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);
};

SpaceInvaders.prototype.startStage4 = function() {
    this.createAlienArmy(4);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);
};

SpaceInvaders.prototype.startStage5 = function() {
    this.createAlienArmy(5);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);
};

SpaceInvaders.prototype.startStage6 = function() {
    this.createAlienArmy(6);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);
};

SpaceInvaders.prototype.startStage7 = function() {
    this.createAlienArmy(7);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);
};

SpaceInvaders.prototype.startStage8 = function() {
    this.createAlienArmy(8);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);
};

SpaceInvaders.prototype.startStage9 = function() {
    this.createAlienArmy(9);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);
};

SpaceInvaders.prototype.startStage10 = function() {
    this.createAlienArmy(10);
    this.alienSpeed += 0.1;
    $("h2").empty().prepend("LEVEL " + this.level);
};

SpaceInvaders.prototype.assignControlsToKeys = function() {
    window.addEventListener('keyup', function(e) {
        const space = $(".space");
        const ship = $(".ship");
        const left = parseInt(ship.css("left"));
        const spaceWidth = parseInt(space.css("width")) - parseInt(ship.css("width"));
        const mov = 20;
        switch (e.keyCode) {
            case 37:
                this.ship.shipMove("left");
                if (left - mov > 0) {
                    $(".ship").css("left", "-=" + mov + "");
                }
                break;
            case 39:
                this.ship.shipMove("right");
                if (left + mov + parseInt(ship.css("width")) < spaceWidth + 50) {
                    $(".ship").css("left", "+=" + mov + "");
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
                this.newGame();
                break;
            case 103:
                $(".pulse-g").remove();
                $(".end").remove();
                this.newGame();
                break;
        }
    }.bind(this));
};

SpaceInvaders.prototype.music = function(num) {
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

SpaceInvaders.prototype.newGame = function() {
    $(".alien").remove();
    this.createAlienArmy(1);
    this.score.points = 0;
    this.level = 1;
};

SpaceInvaders.prototype.returnPoints = function(alien) {
    this.score.points += 100;
};

SpaceInvaders.prototype.looseGame = function() {
    $(".space").append(($("<p>YOU LOOSE<p>").addClass("end")));
    $(".space").append(($("<p>Pulse G to start a new game</p>").addClass("pulse-g")));
    $(".alien").remove();
    this.alienSpeed = 0.1;
};

var game = new SpaceInvaders();
