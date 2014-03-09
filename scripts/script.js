//TODO: Will take the animationArray and apply it the canvas
var animationArray = new Array();
var layerArray = new Array();

//holds mouse X and Y positions
var mouseX;
var mouseY;

//
//        Classes
//

//sends mouse positions to variables
$("#canvas").ready(function(){
  $("#canvas").mousemove(function(e){
     mouseX=e.pageX;
	 mouseY=e.pageY-118;
	 console.log(mouseY);
  });
});


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

	this.getClass = function() {
		return "Shape";
	}
}

//AnimationStep class; contains instructions for each step. The last instruction's speed is the one that determines when the next step is executed
function AnimationStep(target, x, y, width, height, rotation, color, hidden, speed)
{
	this.target = target;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.rotation = rotation;
	this.color = color;
	this.hidden = hidden;
	this.speed = speed;

	this.getClass = function() {
		return "AnimationStep";
	}
}

function Delay(delay)
{
	this.delay = delay;

	this.getClass = function() {
		return "Delay";
	}
}

//
//      Animation Functions
//

//TODO: Will take the animationArray and apply it the canvas
function animate(array) {
	var arrayOfSteps = array.shift(), i, step;
	for (i in arrayOfSteps) {
		if (i == arrayOfSteps.length - 1) {
			step = arrayOfSteps[i];
			console.log(step);
			if (step.getClass()==="delay") {
				console.log("Delaying");
				$("canvas").animateLayer("delay", {
					x: "+=1"
				}, step.delay);
			} else {
				$("canvas").animateLayer(step.target, {
					x: step.x, y: step.y,
					fillStyle: step.color,
					rotate: step.rotate,
					height: step.height,
					width: step.width,
				}, step.speed, function() {
					setTimeout(animate(array), 1);
				});
			}
		} else {
			step = arrayOfSteps[i];
			console.log(step);
			if (step.getClass()==="delay") {
				$("canvas").animateLayer("delay", {
					x: "+=1"
				}, step.delay);
			} else {
				$("canvas").animateLayer(step.target, {
					x: step.x, y: step.y,
					fillStyle: step.color,
					rotate: step.rotate,
					height: step.height,
					width: step.width,
				}, step.speed);
			}
		}
	}
}

//
//      Shape Functions
//

//Takes the array of Shape objects and turns them into layers, which are then added to the canvas and drawn.
function reloadObjects(array)
{
	$("canvas").removeLayers();
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

//add shapes to layer and draws
function addShape(shape) {
	if (shape.type === "image") {
		layerArray[layerArray.length] = shape;
		$('canvas').addLayer({
			type: shape.type,
			source: shape.style,
			x: shape.x,
			y: shape.y,
			name: shape.objectName,
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
			name: shape.objectName,
			draggable: true
		}).drawLayers();
	}	else {
		layerArray[layerArray.length] = shape;
		$('canvas').addLayer({
			type: shape.type,
			fillStyle: shape.style,
			x: shape.x,
			y: shape.y,
			width: shape.width,
			height: shape.height,
			name: shape.objectName,
			draggable: true,
		}).drawLayers();
	}
}

//
//      Input Functions
//

//adds shapes to canvas
function addRect(){
	//accesses html elements
	var color = document.getElementById("color");
	var X = document.getElementById("X");
	var Y = document.getElementById("Y");
	var shape = document.getElementById("shape");
	var source = document.getElementById("source");
	var width = document.getElementById("width");
	var height = document.getElementById("height");
	var name = document.getElementById("name");
	//sets variables equal to what's in the hmtl elements
	var outputWidth=parseInt(width.value);
	var outputHeight=parseInt(height.value);
	var outputX=parseInt(X.value);
	var outputY=parseInt(Y.value);
	var outputShape=shape.value;
	var outputName=name.value;
	//checks if image or shape
	if(shape.value=="image"){
		var outputColor=source.value;
	}
	else{
		var outputColor=color.value;
	}
	//applies values to create new shape
	addShape(new Shape(outputShape, outputColor, outputName, outputHeight, outputWidth, outputX, outputY));
}
var i = 0;
//Takes info and puts in animate array
function animateObject(){
	//accesses html elements
	var name = document.getElementById("nameAnimation");
	var X = document.getElementById("XAnimate");
	var Y = document.getElementById("YAnimate");
	var width = document.getElementById("widthAnimate");
	var height = document.getElementById("heightAnimate");
	var rotation = document.getElementById("rotation");
	var color = document.getElementById("colorAnimation");
	//sets variables equal to what's in the hmtl elements
	var outputColor = color.value;
	var outputRotation = rotation.value;
	var outputWidth=parseInt(width.value);
	var outputHeight=parseInt(height.value);
	var outputX=parseInt(X.value);
	var outputY=parseInt(Y.value);
	var outputName=name.value;
	//checks if image or shape
	//applies values to create new shape
	animationArray[animationArray.length] = new Array();
	animationArray[animationArray.length - 1][0] = new AnimationStep(outputName, outputX, outputY, outputWidth, outputHeight, outputRotation, outputColor, false, 1000);
}

function drawImage(){
console.log("HI");
	$("#menu").html('<ul id="nav"> <li><a href="#" class="selected">Draw Image</a></li> <li><a href="#">Animate</a></li> </ul><div id="menuWrapper"> <form action=""> <fieldset> color: <select id="color"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> shape: <select id="shape"> <option value="rectangle">rectangle</option> <option value="ellipse">ellipse</option> <option value="image">image</option> </select> <br> X: <INPUT type="text" value="0" id="X"><br> Y: <INPUT type="text" value="0" id="Y"><br> Width: <INPUT type="text" value="333" id="width"><br> Height: <INPUT type="text" value="333" id="height"><br> image source: <INPUT type="text" value="0" id="source"><br> name: <INPUT type="text" value="0" id="name"><br> <input type="button" onClick="addRect()" value="Add Object"/> </fieldset> </div> </div>');
}
//
//     Startup
//

$(document).ready(function() {
	addShape(new Shape("rectangle", "#e2e2e2", "delay", 1, 1, 0, 0));
});

