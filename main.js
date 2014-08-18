function draw(){
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext){
	  canvas.style.background = "purple";
	  var ctx = canvas.getContext('2d');
	  var img = new Image();
	  img.src = "images/la_link.png";
	  var posx = 200;
	  var posy = 200;


	  img.onload = function(){
	  	var game = new Game(img, ctx);
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
		for (j=0; j<columns; j++){
			sprite_arr[i*columns+j] = new Sprite(img, j*sprite_width, i*sprite_height, sprite_width, sprite_height);
		}
	}

	return sprite_arr;

}

function Link(sprite_arr){
	this.states = ["shield", "defending", "jumping", "swimming", "walking", "standing"]
	self.facing = "down";
	this.x = 0;
	this.y = 0;
	this.sprite_arr = sprite_arr;
	self.walking = false;
	self.shield = false;
}

Link.prototype.draw = function(ctx) {
  // draw_sprite(ctx, this.img, this.x, this.y, 16);
  this.sprite_arr[0].draw(ctx, this.x, this.y);
};

Link.prototype.move_left = function() {
  this.x -= 10;
};

Link.prototype.move_right = function() {
  this.x += 10;
};

Link.prototype.move_up = function() {
  this.y -= 10;
};

Link.prototype.move_down = function() {
  this.y += 10;
};

//constructor takes coordinate of upper left
function Sprite(img, xpos, ypos, width, height){
	this.img = img;
	this.xpos = xpos; //xpos in the original sprite pic
	this.ypos = ypos; //ypos in ....
	this.width = width;
	this.height = height;
	this.scaling = 2;
}

Sprite.prototype.draw = function(ctx, dest_posx, dest_posy){
	ctx.drawImage(this.img, this.xpos, this.ypos, this.width, this.height, dest_posx, dest_posy, this.scaling*this.width, this.scaling*this.height);
};

function Game(img, ctx){
	this.fps = 5;
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
	console.log(this.buttons_pressed);

	if (this.buttons_pressed["left"] == true){
		this.link.move_left();
	}
	if (this.buttons_pressed["right"] == true){
		this.link.move_right();
	}
	if (this.buttons_pressed["up"] == true){
		this.link.move_up();
	}
	if (this.buttons_pressed["down"] == true){
		this.link.move_down();
	}

};

Game.prototype.draw = function(){
	var sa = this.sprite_arr;
	// if (this.i == this.sprite_arr.length){
	// 	this.i = 0;
	// }
	// console.log(sa[this.i].width);
	this.ctx.clearRect(this.link.x, this.link.y, this.link.sprite_arr[0].width*this.link.sprite_arr[0].scaling, this.link.sprite_arr[0].height*this.link.sprite_arr[0].scaling);
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