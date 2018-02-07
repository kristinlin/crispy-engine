var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var stop = document.getElementById("stop");
var requestID;
ctx.fillStyle = "#23d412";

var clearing = function() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
}

//stop frames; reset frames
var stop_it = function() {
    window.cancelAnimationFrame(requestID);
    requestID = 0;
}


var circling = function(e) {

    //reset radius, mode, stop ongoing animation
    var radius = 1;
    var mode = 1;
    stop_it();
    
    var draw = function() {
	clearing();
	//change direction?
	if (radius==250 || radius == 0) {
	    mode *= -1;
	}
	//draw circle
	ctx.arc(250, 250, radius, 0, 2*Math.PI);
	ctx.fill();
	//increase or decrease radius
	radius += mode;
	//loop
	requestID = window.requestAnimationFrame(draw);
    }

    //initiate loop
    draw();
}


stop.addEventListener("click", stop_it);
canvas.addEventListener("click", circling);

