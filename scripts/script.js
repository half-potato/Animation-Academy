var animationArray = new Array();
var layerArray = new Array();

//Shape class, contains information to be built into a layer, if the type is image, then the style is the source
function Shape(type, style, objectName, width, height, x, y)
{
	this.type = type;
	this.style = style;
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
var animationArray = new Array();
var layerArray = new Array();

//Shape class, contains information to be built into a layer, if the type is image, then the style is the source
function Shape(type, style, objectName, width, height, x, y)
{
	this.type = type;
	this.style = style;
	this.objectName = objectName;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
}

//AnimationStep class; contains instructions for each step. The last instruction's speed is the one that determines when the next step is executed
function AnimationStep(target, x, y, rotation, color, hidden, speed)
{
	this.target = target;
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.color = color;
	this.hidden = hidden;
	this.speed = speed;
}

//TODO: Will take the animationArray and apply it the canvas
function animate(array) {
	console.log("Animating");
	var arrayOfSteps = array.shift(), i;
	for (i in arrayOfSteps)
	{
		var step = arrayOfSteps[i];
		$("canvas").animateLayer(step.target, {
			x: step.x, y: step.y,
			fillStyle: step.color,
			rotate: step.rotate
		}, step.speed, animate(array));
	}
}

//Takes the array of Shape objects and turns them into layers, which are then added to the canvas and drawn.
function addToCanvas(array)
{
	var object;
	for (object in array) {
		$('canvas').addLayer({
			type: array[object].type,
			fillStyle: array[object].style,
			x: array[object].x,
			y: array[object].y,
			width: array[object].width,
			height: array[object].height,
			draggable: true
		}).drawLayers();
	}
}

function addShape(shape) {
	if (shape.type === "image") {
		layerArray[layerArray.length] = shape;
		$('canvas').addLayer({
			type: shape.type,
			source: shape.style,
			x: shape.x,
			y: shape.y,
			draggable: true
		}).drawLayers();
	}

	else if (shape.type === "ellipse") {
		layerArray[layerArray.length] = shape;
		$('canvas').addLayer({
			type: shape.type,
			fillStyle: shape.style,
			x: shape.x,
			y: shape.y,
			width: shape.width,
			height: shape.height,
			draggable: true
		}).drawLayers();
	}	else {
		layerArray[layerArray.length] = shape;
		console.log("Adding shape");
		$('canvas').addLayer({
			type: shape.type,
			fillStyle: shape.style,
			x: shape.x,
			y: shape.y,
			width: shape.width,
			height: shape.height,
			draggable: true
		}).drawLayers();
	}
}

//Clears canvas and redraws the layers (all objects are in layers, one layer per an object)
function redraw(array) {
	$("canvas").clearCanvas().drawLayers();
}

//Temporary objects added
animationArray[0] = new AnimationStep('box', 30, 30, 0, "#000000", false, 100);

function addRect(){
	var color = document.getElementById("color");
	var X = document.getElementById("X");
	var Y = document.getElementById("Y");
	var shape = document.getElementById("shape");
	var source = document.getElementById("source");
	var outputX=parseInt(X.value);
	var outputY=parseInt(Y.value);
	var outputShape=shape.value;
	if(shape.value=="image"){
		var outputColor=source.value;
	}
	else{
		var outputColor=color.value;
	}
	addShape(new Shape(outputShape, outputColor, "box", 200, 200, outputX, outputY));
	
}

$(document).ready(function() {
	addToCanvas(layerArray);
});
