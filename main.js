function draw(){
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext){
	  var ctx = canvas.getContext('2d');
	  var img = new Image();
	  img.onload = function(){
	  	ctx.drawImage(img, 0, 0, 800, 600);
	  };
	  img.src = "images/zeldaoracleofages_link_sheet.png";
	}
}
