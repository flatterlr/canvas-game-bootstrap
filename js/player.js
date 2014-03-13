"use strict"; 

var app = app || {}; 

app.Player = function(){

		function Player(pos, size, coll_Pos, coll_Size, speed) {
			this.pos = pos; 
			this.size = size; 
			this.coll_Pos = coll_Pos; 
			this.coll_Size = coll_Size; 
			this.speed = typeof speed === 'number' ? speed : 0;
			
			this.sprite = undefined; 
			this.facingRight = true; 
		};

		Player.prototype = {
			update: function(dt) {
				this.sprite.update(dt); 
				this.sprite.parentPos = this.pos; 
			},

			draw: function(ctx) {
				this.sprite.draw(ctx); 
			},
			
			load: function() {
				this.idleRightSprite = new app.Sprite('img/idleAnim.png',[0,0],this.pos,[this.size[0],this.size[1]],6,[0,1,2,3]);
	
				this.idleLeftSprite = new app.Sprite('img/idleAnim.png',[0,this.size[1]],this.pos,[this.size[0],this.size[1]],6,[0,1,2,3]);
				
				this.runRightSprite = new app.Sprite('img/runCycle.png',[0,0],this.pos,[this.size[0],this.size[1]],12,[0,1,2,3,4,5,6,7]);
				
				this.runLeftSprite = new app.Sprite('img/runCycle.png',[0,this.size[1]],this.pos,[this.size[0],this.size[1]],12,[0,1,2,3,4,5,6,7]);
			},
			
			init: function() {
				this.sprite = this.idleRightSprite; 
				this.pos = [50, 300];
				
				this.load(); 
			},
		};

		return Player; 
		
}();