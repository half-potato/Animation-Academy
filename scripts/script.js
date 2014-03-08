var animationArray = new Array();
var layerArray = new Array();

function AnimationStep(objectName, width, height, x, y)
{
	this.objectName = objectName;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;

	this.getObjectName = function()
	{
		return objectName;
	}
	this.width = function()
	{
		return width;
	}
	this.height = function()
	{
		return height;
	}
	this.x = function()
	{
		return x;
	}
	this.y = function()
	{
		return y;
	}
}

layerArray[0] = new AnimationStep("box", 150, 150, 20, 20);

function animate(array) {
	var step = animationArray.shift(), i;
	for (i = 0; i < step.length; i++) {
		if(i == step.length - 1) {

		} else {

		}
	}
}

function addToCanvas(array) {
	var
	for
}

function redraw() {
	$("canvas").clearCanvas();
}

$(document).ready(function() {
	$("canvas").drawRect({
	  fillStyle: '#000',
	  x: layerArray[0][0], y: 100,
	  width: 200,
	  height: 100
	});

});
