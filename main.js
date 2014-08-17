function draw(){
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext){
	  var ctx = canvas.getContext('2d');
	  var img = new Image();
	  img.src = "images/zeldaoracleofages_link_sheet.png";
	  var posx = 200;
	  var posy = 200;

	  var sprite_arr = create_sprite_array(img, 29, 30);

	  img.onload = function(){
	  	sprite_arr[0].draw(ctx, 200, 200);
	  };
	}
}

function draw_sprite(ctx, img, posx, posy, i){
	ctx.drawImage(img, (i%14)*29, (i/14)*30, 29, 30, posx, posy, 80, 120);
}

// function show_key(e){
// 	var key = e.keyCode ? e.keyCode : e.which;

// 	if (key == 38){
// 		posx += 10;
// 	}
// }

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
	this.scaling = 5;
}

Sprite.prototype.draw = function(ctx, dest_posx, dest_posy){
	ctx.drawImage(this.img, this.xpos, this.ypos, this.width, this.height, dest_posx, dest_posy, this.scaling*this.width, this.scaling*this.height);
};