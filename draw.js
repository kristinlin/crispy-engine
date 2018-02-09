var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var stop = document.getElementById("stop");
var gas = document.getElementById("gas");
var dvd = document.getElementById("dvd");
var requestID;

var clearing = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
}

//stop frames; reset frames
var stop_it = function() {
    window.cancelAnimationFrame(requestID);
    requestID = 0;
}

var values = '0123456789ABCDEF';
var rand_color = function() {
    var color = '#';
    for (var x = 0; x < 6; x++) {
	color += values[Math.floor(Math.random() * 16)];
    }
    return color;
}


var grow_n_shrink = function(e) {

    //reset radius, mode, stop ongoing animation
    stop_it();
    var radius = 1;
    var mode = 1;
    ctx.fillStyle=rand_color();
    
    var draw = function() {
	clearing();
	//change direction?
	if (radius==canvas.height/2 || radius == 0) {
	    mode *= -1;
	}
	//draw circle
	ctx.arc(canvas.width/2, canvas.height/2, radius, 0, 2*Math.PI);
	ctx.fill();
	//increase or decrease radius
	radius += mode;
	//loop
	requestID = window.requestAnimationFrame(draw);
    }

    //initiate loop
    draw();
}

var dvd_mimic = function(e) {

    //stop any ongoing animations
    //reset location; direction; set height and width; 
    stop_it();
    var width = 120;
    var height = 75;
    var x = canvas.width/2;
    var y = canvas.height/2;
    var y_mode = -3;
    var x_mode = -3;
    
    var draw = function() {
	clearing();
	//draw rect
	ctx.fillRect(x, y, width, height);
	//change direction
	if (y <= 0 || y+height >= canvas.height) {
	    y_mode *= -1;
	    ctx.fillStyle = rand_color();
	}
	if (x <= 0 || x+width >= canvas.width) {
	    x_mode *= -1;
	    ctx.fillStyle = rand_color();
	}
	//move the rect
	x += x_mode;
	y += y_mode;
	//loop
	requestID = window.requestAnimationFrame(draw);
    }

    //initiate loop
    draw();
}


stop.addEventListener("click", stop_it);
gas.addEventListener("click", grow_n_shrink);
dvd.addEventListener("click", dvd_mimic);
