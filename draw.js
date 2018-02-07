var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var stop = document.getElementById("stop");


var clearing = function() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
}

var requestID;

var circling = function(e) {
    var radius = 25;
    var x = 0;
    var y = 250;
    requestID = 0;
    clearing();
    var draw = function() {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2*Math.PI);
	ctx.fillStyle = "#23d412";
	ctx.fill();
	x++;
	requestID = window.requestAnimationFrame(draw);
    }
    draw();
}

var stopit = function() {
    window.cancelAnimationFrame(requestID);
}

stop.addEventListener("click", stopit);
canvas.addEventListener("click", circling);

//window.requestAnimationFrame(circling);
