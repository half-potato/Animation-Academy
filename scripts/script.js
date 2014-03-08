var animationArray = new Array();
var layerArray = new Array();

//Shape class, contains information to be built into a layer
function Shape(type, color, objectName, width, height, x, y)
{
	this.type = type;
	this.color = color;
	this.objectName = objectName;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
}

//AnimationStep class; contains instructions for each step.
function AnimationStep(target, x, y, rotation, hidden) {
	this.target = target;
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.hidden = hidden;
}

//TODO: Will take the animationArray and apply it the canvas
function animate(array) {
	var step = animationArray.shift(), i;
	for (i = 0; i < step.length; i++) {
		if(i == step.length - 1) {

		} else {

		}
	}
}

//Takes the array of Shape objects and turns them into layers, which are then added to the canvas and drawn.
function addToCanvas(array) {
	var object;
	for (object in array) {
		$('canvas').addLayer({
			type: array[object].type,
			fillStyle: array[object].color,
			x: array[object].x, 
			y: array[object].y,
			width: array[object].width, 
			height: array[object].height
		}).drawLayers();
	}
}

function addShape(shape) {
	layerArray[layerArray.length] = shape;
	$('canvas').addLayer({
		type: shape.type,
		fillStyle: shape.color,
		x: shape.x, y: shape.y,
		width: shape.width, height: shape.height
	}).drawLayers();
}

//Clears canvas and redraws the layers (all objects are in layers, one layer per an object)
function redraw(array) {
	$("canvas").clearCanvas().drawLayers();
}

//Temporary objects added
animationArray[0] = new AnimationStep('rectangle', 30, 30, 0, false);
addShape(new Shape("rectangle", "#000000", "box", 20, 20, 20, 20));

$(document).ready(function() {
	addToCanvas(layerArray);
	redraw(layerArray);
});
