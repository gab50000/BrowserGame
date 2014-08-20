function draw(){
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext){
	  canvas.style.background = "purple";
	  var ctx = canvas.getContext('2d');
	  var img = new Image();
	  img.src = "images/la_link.png";
	  // img.src = "images/la_link.png";
	  var posx = 200;
	  var posy = 200;


	  img.onload = function(){
	  	var game = new Game(img, ctx, canvas.width, canvas.height);
   	    window.addEventListener('keydown',game.check_push.bind(game),false);
	    window.addEventListener('keyup',game.check_release.bind(game),false);
	  	// game.draw();
	  	// game.update();
	  	game.run();
		  // var sprite_arr = create_sprite_array(img, 32, 32);
		  // sprite_arr[22].draw(ctx, 200, 200);
	  };
	}
}

function create_sprite_array(img, sprite_width, sprite_height){
	var lines = Math.floor(img.height / sprite_height);
	var columns = Math.floor(img.width / sprite_width);
	var i, j;
	var sprite_arr = new Array(lines*columns);
	for (i=0; i<lines; i++){
		for (var j=0; j<columns; j++){
			sprite_arr[i*columns+j] = new Sprite(img, j*sprite_width, i*sprite_height, sprite_width, sprite_height);
		}
	}

	return sprite_arr;

}

function Link(sprite_arr){
	this.moves = {};
	this.facing = "down";
	this.walking = false;
	this.x = 0;
	this.y = 0;
	this.sprite_arr = sprite_arr;
	this.walking = false;
	this.shield = true;
	this.tact = 0;
	this.assign_sprites(this.moves);
}

Link.prototype.assign_sprites = function(moves){

	moves["walk_down_free"]  = [0, [0,1,2]];
	moves["walk_left_free"]  = [1, [0,1,2]];
	moves["walk_right_free"] = [2, [0,1,2]];
	moves["walk_up_free"]    = [3, [0,1,2]];

	moves["stand_down_free"]  = [0,1];
	moves["stand_left_free"]  = [1,1];
	moves["stand_right_free"] = [2,1];
	moves["stand_up_free"]    = [3,1];

};

Link.prototype.draw = function(ctx){
	var cols, line

	if (this.walking == true){
		// console.log("walking");
		line = this.moves["walk_"+this.facing+"_free"][0];
		cols = this.moves["walk_"+this.facing+"_free"][1];
		this.sprite_arr[12*line+cols[this.tact]].draw(ctx, this.x, this.y);
	}
	else{
		// console.log("standing");
		line = this.moves["stand_"+this.facing+"_free"][0];
		cols = this.moves["stand_"+this.facing+"_free"][1];
		this.sprite_arr[12*line+cols].draw(ctx, this.x, this.y);		
	}
};

Link.prototype.update = function(buttons_pressed){
	if (buttons_pressed["left"] == true){
		this.move_left();
		if (this.walking == false){
			this.walking = true;
		}
		this.facing = "left";
	}
	if (buttons_pressed["right"] == true){
		this.move_right();
		if (this.walking == false){
			this.walking = true;
		}
		this.facing = "right";
	}
	if (buttons_pressed["up"] == true){
		this.move_up();
		if (this.walking == false){
			this.walking = true;
		}
		this.facing = "up";
	}
	if (buttons_pressed["down"] == true){
		this.move_down();
		if (this.walking == false){
			this.walking = true;
		}
		this.facing = "down";
	}

	if (!(buttons_pressed["left"] || buttons_pressed["up"] || buttons_pressed["right"] || buttons_pressed["down"])){
		this.walking = false;
	}

  if (this.tact == 2){
  	this.tact = 0;
  }
  else{
  	this.tact += 1;
  }
};

Link.prototype.move_left = function() {
  this.x -= 8;
};

Link.prototype.move_right = function() {
  this.x += 8;
};

Link.prototype.move_up = function() {
  this.y -= 8;
};

Link.prototype.move_down = function() {
  this.y += 8;
};

//constructor takes coordinate of upper left
function Sprite(img, xpos, ypos, width, height){
	this.img = img;
	this.xpos = xpos; //xpos in the original sprite pic
	this.ypos = ypos; //ypos in ....
	this.width = width;
	this.height = height;
	this.scaling = 1.3;
}

Sprite.prototype.draw = function(ctx, dest_posx, dest_posy){
	ctx.drawImage(this.img, this.xpos, this.ypos, this.width, this.height, dest_posx, dest_posy, this.scaling*this.width, this.scaling*this.height);
};

function Game(img, ctx, width, height){
	this.canvas_width = width;
	this.canvas_height = height;
	this.fps = 30;
	this.i = 0;
	sprite_arr = create_sprite_array(img, 32, 32);
	this.ctx = ctx;
	this.buttons_pressed = {"up":false, "down":false, "right":false, "left":false};
	this.link = new Link(sprite_arr);
}

Game.prototype.check_push = function(e){
	// console.log("just checking push");
	var code = e.keyCode;
	switch (code){
		case 37 : this.buttons_pressed["left"] = true; break;
		case 38 : this.buttons_pressed["up"] = true; break;
		case 39 : this.buttons_pressed["right"] = true; break;
		case 40 : this.buttons_pressed["down"] = true; break;

	}
};
Game.prototype.check_release = function(e){
	// console.log("just checking release");
	var code = e.keyCode;
	switch (code){
		case 37 : this.buttons_pressed["left"]  = false; break;
		case 38 : this.buttons_pressed["up"]    = false; break;
		case 39 : this.buttons_pressed["right"] = false; break;
		case 40 : this.buttons_pressed["down"]  = false; break;

	}
};

Game.prototype.run = function(){
	// console.log("Ich bin"+this);
	this.update();
	this.draw();
	var that = this;
	setTimeout(function(){
		window.requestAnimationFrame(that.run.bind(that));
	}, 1000/that.fps); 
	//bind the this pointer to the function run
	//requestAnimationFrame needs the function as argument, not the result of the function!!
};

Game.prototype.update = function(){
	this.link.update(this.buttons_pressed);
};

Game.prototype.draw = function(){
	var sa = this.sprite_arr;
	// if (this.i == this.sprite_arr.length){
	// 	this.i = 0;
	// }
	// console.log(sa[this.i].width);
	// this.ctx.clearRect(this.link.x, this.link.y, this.link.sprite_arr[0].width*this.link.sprite_arr[0].scaling, this.link.sprite_arr[0].height*this.link.sprite_arr[0].scaling);
	this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
	this.link.draw(this.ctx);

};

//Event Listener

function check(e){
	var code = e.keyCode;
	switch (code){
		case 37 : console.log("left"); break;
		case 38 : console.log("up"); break;
		case 39 : console.log("right"); break;
		case 40 : console.log("down"); break;
	}

}