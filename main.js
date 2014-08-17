function draw(){
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext){
	  var ctx = canvas.getContext('2d');
	  var img = new Image();
	  img.src = "images/la_link.png";
	  var posx = 200;
	  var posy = 200;

	  img.onload = function(){
	  	var game = new Game(img, ctx);
	  	game.draw();
	  	game.update();
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

function Link(img){
	this.x = 0;
	this.y = 0;
	this.img = img;
}

Link.prototype.draw = function(ctx) {
  draw_sprite(ctx, this.img, this.x, this.y, 16);
};

Link.prototype.moveLeft = function() {
  this.x -= 1;
};

Link.prototype.moveRight = function() {
  this.x += 1;
};

Link.prototype.moveUp = function() {
  this.y -= 1;
};

Link.prototype.moveRight = function() {
  this.y += 1;
};

//constructor takes coordinate of upper left
function Sprite(img, xpos, ypos, width, height){
	this.img = img;
	this.xpos = xpos;
	this.ypos = ypos;
	this.width = width;
	this.height = height;
	this.scaling = 3;
}

Sprite.prototype.draw = function(ctx, dest_posx, dest_posy){
	ctx.drawImage(this.img, this.xpos, this.ypos, this.width, this.height, dest_posx, dest_posy, this.scaling*this.width, this.scaling*this.height);
};

function Game(img, ctx){
	this.fps = 60;
	this.i = 0;
	this.sprite_arr = create_sprite_array(img, 32, 32);
	this.ctx = ctx;
}

Game.prototype.run = function(){
	var that = this;
	console.log("Ich bin"+that);
	this.update();
	this.draw();
	window.requestAnimationFrame(this.run.bind(this));
	//bind the this pointer to the function run
	//requestAnimationFrame needs the function as argument, not the result of the function!!
};

Game.prototype.update = function(){
	console.log(this.i);
	this.i += 1;
};

Game.prototype.draw = function(){
	this.ctx.
	this.sprite_arr[this.i%this.sprite_arr.length].draw(this.ctx, 200,200);

};