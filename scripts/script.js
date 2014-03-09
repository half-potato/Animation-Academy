//TODO: Will take the animationArray and apply it the canvas
var selectedObject = "hi";
var animationArray = [];
var layerArray = [];
var currentFrame = 0;

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
	 //console.log(mouseY);
  });
});


//Shape class, contains information to be built into a layer, if the type is image, then the style is the source
function Shape(type, style, objectName, width, height, x, y, arrayIndex)
{
	this.type = type;
	this.style = style;
	this.objectName = objectName;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.arrayIndex = arrayIndex;

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
	var arrayOfSteps = array[currentFrame], i, step;
	if (currentFrame !== array.length - 1) {
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
						visible: !step.hidden
					}, step.speed, function() {
						currentFrame++;
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
					//Problem
					$("canvas").animateLayer(step.target, {
						x: step.x, y: step.y,
						fillStyle: step.color,
						rotate: step.rotate,
						height: step.height,
						width: step.width,
						visible: !step.hidden
					}, step.speed);
				}
			}
		}
	} else {
		for (i in arrayOfSteps) {
			step = arrayOfSteps[i];
			console.log(step);
			if (step.getClass()==="delay") {
				$("canvas").animateLayer("delay", {
					x: "+=1"
				}, step.delay);
			} else {
				//Problem
				$("canvas").animateLayer(step.target, {
					x: step.x, y: step.y,
					fillStyle: step.color,
					rotate: step.rotate,
					height: step.height,
					width: step.width,
					visible: !step.hidden
				}, step.speed, function() {
					$("canvas").setLayer(step.target, {
						x: step.x, y: step.y,
						fillStyle: step.color,
						rotate: step.rotate,
						height: step.height,
						width: step.width,
						visible: !step.hidden
					});
				});
			}
		}
		currentFrame = 0;
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
			draggable: true,
			click: function() {
				selectedObject = shape.objectName;
				console.log(selectedObject);
                shape.x = $("canvas").getLayer(selectedObject).x;
                shape.y = $("canvas").getLayer(selectedObject).y;
                shape.width = $("canvas").getLayer(selectedObject).width;
                shape.height = $("canvas").getLayer(selectedObject).height;
			}
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
			draggable: true,
			click: function() {
				selectedObject = shape.objectName;
				console.log(selectedObject);
			}
		}).drawLayers();
	}	else {
		shape.arrayIndex = layerArray.length;
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
			click: function() {
				selectedObject = shape.objectName;
                $('canvas').addLayer({
                    type: "rectangle",
                    fillStyle: "#000000",
                    x: shape.x,
                    y: shape.y + 30,
                    width: 50,
                    height: 50,
                    name: shape.objectName + "topHandle",
                    draggable: true,
                    click: function() {
                        $('canvas').setLayer({
							type: "rectangle",
							fillStyle: "#000000",
							x: shape.x,
							y: shape.y + 30,
							width: 50,
							height: 50,
							name: shape.objectName + "topHandle",
							draggable: true,
						});
                    }
                });
				shape.x = $("canvas").getLayer(selectedObject).x;
				shape.y = $("canvas").getLayer(selectedObject).y;
				layerArray[shape.arrayIndex] = shape;
			}
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
	addShape(new Shape(outputShape, outputColor, outputName, outputWidth, outputHeight, outputX, outputY));
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

	console.log(X.value + ", " + Y.value);
	console.log(animationArray);
	animationArray[animationArray.length] = [];
	animationArray[animationArray.length - 1][0] = new AnimationStep(outputName, outputX, outputY, outputWidth, outputHeight, outputRotation, outputColor, false, 1000);
}

function getCurrentLayer() {
	return $("canvas").getLayer(selectedObject);
}

function changeScale(selector, topEdge, rightEdge, bottomEdge, leftEdge) {
	$("canvas").setLayer(selector, {
		width: ((rightEdge) + (leftEdge)),
		height: ((topEdge) + (bottomEdge)),
		left: "+=" + ((leftEdge/2) - (rightEdge/2)) + "",
		top: "+=" + ((topEdge/2) - (bottomEdge/2)) + ""
	});
}

//Problem
function changeProperties(selector, style, width, height, x, y) {
	$("canvas").setLayer(selector, {
		width: width,
		height: height,
		fillStyle: style,
		x: x, y: y,
		draggable: true
	}).drawLayers();
}

function drawImage(){
console.log("HI");
	$("#menu").html('<ul id="nav"> <li><a href="#" class="selected">Draw Image</a></li> <li onClick = "animatePage()"><a href="#">Animate</a></li><li><a href="#"onClick = "propertiesPage()">Properties</a></li> </ul><div id="menuWrapper"><fieldset> color: <select id="color"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> shape: <select id="shape"> <option value="rectangle">rectangle</option> <option value="ellipse">ellipse</option> <option value="image">image</option> </select> <br> X: <INPUT type="text" value="0" id="X"><br> Y: <INPUT type="text" value="0" id="Y"><br> Width: <INPUT type="text" value="333" id="width"><br> Height: <INPUT type="text" value="333" id="height"><br> image source: <INPUT type="text" value="0" id="source"><br> name: <INPUT type="text" value="0" id="name"><br> <input type="button" onClick="addRect()" value="Add Object"/> </fieldset> </div> </div>');
}

var framePos;
function getValue(){
	var name = document.getElementById("nameAnimation");
	var x = document.getElementById("XAnimate");
	var y = document.getElementById("YAnimate");
	var width = document.getElementById("widthAnimate");
	var height = document.getElementById("heightAnimate");
	var rotation = document.getElementById("rotation");
	var color = document.getElementById("colorAnimation");
	var frame = document.getElementById("frames");


	$("#frames").prop("max", animationArray.length);

	framePos=parseInt(frame.value);

	console.log(framePos);
	console.log(frame.max);
	console.log(frame.value);
	console.log(animationArray[framePos][0].name);

	name.val(animationArray[framePos][0].name);
	color.val(animationArray[framePos][0].color);
	x.val(animationArray[framePos][0].x);
	y.val(animationArray[framePos][0].y);
	width.val(animationArray[framePos][0].width);
	height.val(animationArray[framePos][0].height);
	rotation.val(animationArray[framePos][0].rotation);
	console.log(framePos);
}

function animatePage(){
	$("#menu").html('<ul id="nav"> <li onClick = "drawImage()"><a href="#">Draw Image</a></li> <li><a href="#" class="selected">Animate</a></li><li><a href="#"onClick = "propertiesPage()">Properties</a></li> </ul><div id="menuWrapper"><div id="menuWrapper"> <fieldset> <input type="image" class="arrow" id="saveform" src="left.png"/> <input type="range" class="slider" name="frames" id="frames" min="0" max="50"> <input type="image" class="arrow" id="saveform" src="right.png"/><br> color: <select id="colorAnimation"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> X: <INPUT type="text" value="0" id="XAnimate"><br> Y: <INPUT type="text" value="0" id="YAnimate"><br> Width: <INPUT type="text" value="333" id="widthAnimate"><br> Height: <INPUT type="text" value="333" id="heightAnimate"><br> Name: <INPUT type="text" value="0" id="nameAnimation"><br> Rotation: <INPUT type="text" value="0" id="rotation"><br> <input type="button" onClick="animateObject()" value="Add Object"/> <input type = "button" onClick = "animate(animationArray)" value = "Play"/> </fieldset> </div>')
	getValue();
}



function propertiesPage(){
	$("#menu").html('<ul id="nav"> <li onClick = "drawImage()"><a href="#">Draw Image</a></li> <li><a href="#" onClick = "animatePage()">Animate</a></li><li><a href="#" class="selected">Properties</a></li> </ul><div id="menuWrapper"> <fieldset id="properties"> color: <select id="colorProperty"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> X: <input type="text" value="0" id="XProperty"><br> Y: <input type="text" value="0" id="YProperty"><br> Width: <input type="text" value="333" id="widthProperty"><br> Height: <input type="text" value="333" id="heightProperty"><br> Rotation: <input type="text" value="0" id="rotationProperty"><br> </fieldset> </div>');
	console.log("Hi");
	var color = $("#colorProperty");
	var x = $("#XProperty");
	var y = $("#YProperty");
	var width = $("#widthProperty");
	var height = $("#heightProperty");
	var rotation = $("#rotationProperty");
	color.val($("canvas").getLayer(selectedObject).fillStyle);
	x.val($("canvas").getLayer(selectedObject).x);
	y.val($("canvas").getLayer(selectedObject).y);
	width.val($("canvas").getLayer(selectedObject).width);
	height.val($("canvas").getLayer(selectedObject).height);
	rotation.val($("canvas").getLayer(selectedObject).rotation);
}

function propertiesPanelUpdate() {
	var color = document.getElementById("colorProperty");
	var x = document.getElementById("XProperty");
	var y = document.getElementById("YProperty");
	var width = document.getElementById("widthProperty");
	var height = document.getElementById("heightProperty");
	var rotation = document.getElementById("rotationProperty");

	$("#colorProperty").change(function() {

		changeProperties(selectedObject, color.value, width.value, height.value, x.value, y.value);
	});
	$("#XProperty").on("input", function() {
		console.log(document.getElementById("XProperty").value);
		changeProperties(selectedObject, color.value, width.value, height.value, x.value, y.value);
	});
	$("#YProperty").on("input", function() {
		changeProperties(selectedObject, color.value, width.value, height.value, x.value, y.value);
	});
	$("#widthProperty").on("input", function() {
		changeProperties(selectedObject, color.value, width.value, height.value, x.value, y.value);
	});
	$("#heightProperty").on("input", function() {
		changeProperties(selectedObject, color.value, width.value, height.value, x.value, y.value);
	});
	$("#rotationProperty").on("input", function() {
		changeProperties(selectedObject, color.value, width.value, height.value, x.value, y.value);
	});
}

setInterval(function() {
	if(selectedObject!=="hi") {
		propertiesPanelUpdate();
	}
}, 100);
//
//     Startup
//

$(document).ready(function() {
	addShape(new Shape("rectangle", "#e2e2e2", "delay", 1, 1, 0, 0));

});

