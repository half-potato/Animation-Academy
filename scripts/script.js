var animationArray = new Array();
var layerArray = new Array();

function AnimationStep(type, color, objectName, width, height, x, y)
{
	this.type = type;
	this.color = color;
	this.objectName = objectName;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;

	this.getType = function() {
		return type;
	}
	this.getColor = function() {
		return color;
	}
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
	var object;
	for (object in array) {
		$('canvas').addLayer({
			type: array[object].getType(),
			fillStyle: array[object].getColor()
		});
	}
}

function redraw() {
	$("canvas").clearCanvas();
}

$(document).ready(function() {
	addToCanvas(layerArray);

});
