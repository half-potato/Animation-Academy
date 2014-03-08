var animationArray = new Array();
var layerArray = new Array();

function Shape(type, color, objectName, width, height, x, y)
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

function AnimationStep(target, x, y, rotation) {

}

layerArray[0] = new Shape("rectangle", "#000000", "box", 150, 150, 200, 200);

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
			type: array[object].type,
			fillStyle: array[object].getColor(),
			x: array[object].x(), y: array[object].y(),
			width: array[object].width(), height: array[object].height()
		}).drawLayers();
	}
}

function redraw(array) {
	$("canvas").clearCanvas().drawLayers();
}

$(document).ready(function() {
	addToCanvas(layerArray);
	redraw(layerArray);
});
