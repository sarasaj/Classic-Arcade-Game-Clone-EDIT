var modal;
var span
// Enemies our player must avoid
//initiate enemy
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //initial location at (x,y) postion and speed
    this.x = x;
    this.y = y;
    this.speed = this.generateRandomSpeed();
};
//return a random number for the enemy speed between 80 - 250
Enemy.prototype.generateRandomSpeed = function(){
    return Math.floor(Math.random() * (280 - 80)) + 80;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    //ensure enemy object move within canvas width which is 505
    if(this.x > 505){
        this.x = -100;
        this.speed = this.generateRandomSpeed()
    }

    if(this.x < player.x + 50 && this.x + 50 > player.x 
        && this.y < player.y + 50 && this.y + 50 > player.y) {
        document.getElementById("modalText").textContent ="you LOST =(";
        modal.style.display = "block";
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //set the image
    this.sprite = 'images/char-princess-girl.png';
    //initial location at (x,y) postion and speed
    this.x = 200;
    this.y = 400;
}
Player.prototype.update = function(dt) {
    
    //when player reaches water
    if(this.y < 0 ){
        document.getElementById("modalText").textContent ="you WON =)";
        modal.style.display = "block";
    }
};
//draw player image
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(allowedKey) {
    //if player hits any wall left right up or down 
    switch(allowedKey){
        case "left":
            if(this.x > 0){
                this.x -=100;
            }
        break;
        case "right":
            if(this.x < 400 ){
                this.x +=100;
            }
        break;
        case "up":
            if(this.y > 0){
                this.y -= 90;
            }
        break;
        case "down":
            if(this.y < 400){
                this.y +=90
            }
        break;
    }

}
//resets the player position to the middle
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}


// Now instantiate your objects.
var enemy1 = new Enemy(-200,60); //send x and y positions
var enemy2 = new Enemy(-100, 140);
var enemy3 = new Enemy(-150, 230);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
 function modalHandler(){
    // Get the modal
    modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
        player.reset();
    }
 }
modalHandler();