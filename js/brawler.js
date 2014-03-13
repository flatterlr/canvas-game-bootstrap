"use strict"; 

var app = app || {}; 

app.brawler = {

ctx : undefined, 
canvas : undefined, 

gameTime : 0,
updateTime: 0, 
player : undefined,
lastTime : 0,

GameStates : {
	splashScreen : "SPLASH_STATE",
	menu : "MENU_STATE",
	game : "GAME_STATE",
	gameover : "GAME_OVER_STATE"
},

gameState : undefined,

// The main game loop
loop : function() {
    var now = Date.now();
    var dt = (now - app.brawler.lastTime) / 1000.0;
	
    app.brawler.update(dt);
    app.brawler.draw();

    app.brawler.lastTime = now;
    requestAnimationFrame(this.loop.bind(this));
},

// Reset game to original state
reset:function() {
    app.brawler.gameState = app.brawler.GameStates.game; 
    app.brawler.gameTime = 0;
},

init:function() {
    app.brawler.lastTime = Date.now();
	
	// Create the canvas
	app.brawler.canvas = document.createElement("canvas");
	app.brawler.ctx = app.brawler.canvas.getContext("2d");
	app.brawler.canvas.width = 1000;
	app.brawler.canvas.height = 480;
	document.body.appendChild(app.brawler.canvas);
	
	app.brawler.reset();
	
	app.brawler.gameState  = app.brawler.GameStates.game;
	
	//function Player(pos, size, coll_Pos, coll_Size, speed) 
	app.brawler.player = new app.Player([50,300],[160,128],[0,0],[0,0],500); 
	app.brawler.player.init();
	
    app.brawler.loop();
},

// Update game objects
update : function(dt) {
    app.brawler.gameTime += dt;

    app.brawler.handleInput(dt);
    app.brawler.player.update(dt);
},

handleInput: function(dt) {
	var player = app.brawler.player; 
	
	if(player.facingRight)
	{
		player.sprite = player.idleRightSprite; 
	}
	else{
		player.sprite = player.idleLeftSprite; 
	}
	
    if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= player.speed * dt;
		player.facingRight = false; 
		player.sprite = player.runLeftSprite; 
    }
    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += player.speed * dt;
		player.facingRight = true; 
		player.sprite = player.runRightSprite;  
    }
	
	app.brawler.player = player; 
},

// Collisions

collides: function(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
},

boxCollides: function(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
},

checkCollisions:function() {
    app.brawler.checkPlayerBounds();
},

checkPlayerBounds:function() {

},

// Draw everything
draw:function() {
    app.brawler.ctx.fillStyle = 'white';
    app.brawler.ctx.fillRect(0, 0, app.brawler.canvas.width, app.brawler.canvas.height);

    // draw the player if the game isn't over
    if(app.brawler.gameState === 'GAME_STATE') {
		app.brawler.player.draw(app.brawler.ctx); 
    }

},

// Game over
gameOver:function() {
	app.brawler.gameState = app.brawler.GameStates.gameOver; 
},

}; 