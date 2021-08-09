/// store key codes and currently pressed ones
var keys = {};
    keys.LEFT = 37;
    keys.RIGHT = 39;
    keys.UP = 38;
    keys.DOWN = 40;

/// store reference to character's position and element
var character = {
    x: 700,
    y: 500,
    element: document.querySelector(".character")
};
var enemy = {
    x: 300,
    y: 300,
    element: document.querySelector('.enemy')
};
var isCollided = false;

/// key detection (better to use addEventListener, but this will do)
document.body.onkeyup = 
document.body.onkeydown = function(e){
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown';
};

/// character movement update
var moveCharacter = function(dx, dy){
  character.x += dx||0;
  character.y += dy||0;
  character.element.style.left = character.x + 'px';
  character.element.style.top = character.y + 'px';
};

/// character control
var detectCharacterMovement = function(){
    if (isCollided == false) {
        if (keys[keys.LEFT]) {
        moveCharacter(-2, 0);
        }
        if (keys[keys.RIGHT]) {
        moveCharacter(2, 0);
        }
        if (keys[keys.UP]) {
        moveCharacter(0, -2);
        }
        if (keys[keys.DOWN]) {
        moveCharacter(0, 2);
        }
    };
};





function checkCollision() {
    let charCenter = {
        x: character.x - 50,
        y: character.y - 50
    };
    let enemyCenter = {
        x: enemy.x - 50,
        y: enemy.y - 50
    };
    let distance = Math.hypot((charCenter.x - enemyCenter.x), (charCenter.y - enemyCenter.y));
    if (distance >= 101) {
        isCollided = false;
    }
    //'Correcting' position of character so it doesn't freeze; allows for general movement to continue in direction pressed
    else {
        isCollided = true;
        if (keys[keys.LEFT] && charCenter.y >= enemyCenter.y) {
            moveCharacter(1, 1);
        }
        else if (keys[keys.LEFT] && charCenter.y <= enemyCenter.y) {
            moveCharacter(1, -1);
        }
        else if (keys[keys.LEFT]) {
            moveCharacter(1, 0);
        }
        if (keys[keys.RIGHT] && charCenter.y >= enemyCenter.y) {
            moveCharacter(-1, 1);
        }
        else if (keys[keys.RIGHT] && charCenter.y <= enemyCenter.y) {
            moveCharacter(-1, -1);
        }
        else if (keys[keys.RIGHT]) {
            moveCharacter(-1, 0);
        }
        if (keys[keys.UP] && charCenter.x >= enemyCenter.x) {
            moveCharacter(1, 1);
        }
        else if (keys[keys.UP] && charCenter.x <= enemyCenter.x) {
            moveCharacter(-1, 1);
        }
        else if (keys[keys.UP]) {
            moveCharacter(0, 1);
        }
        if (keys[keys.DOWN] && charCenter.x >= enemyCenter.x) {
            moveCharacter(1, -1);
        }
        else if (keys[keys.DOWN] && charCenter.x <= enemyCenter.x) {
            moveCharacter(-1, -1);
        }
        else if (keys[keys.DOWN]) {
            moveCharacter(0, -1);
        }
    }
};





/// game loop
setInterval(function(){
  detectCharacterMovement();
  checkCollision();
}, 1000/240);