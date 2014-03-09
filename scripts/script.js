//TODO: Will take the animationArray and apply it the canvas
var selectedObject = "hi";
var animationArray = [];
var layerArray = [];
var currentFrame = 0;
var propertiesObject = "hi";
var needsUpdate = false;
var NUCLEOTIDE_WIDTH = 50, NUCLEOTIDE_HEIGHT = 90;

//holds mouse X and Y positions
var mouseX;
var mouseY;

var shove = [];


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

function Frame(steps, objects) {
	this.objects = objects;
	this.steps = steps;

	this.autoObjects = function() {
		var i;
		objects = [];
		for(i in steps) {
			objects[objects.length] = steps[i].target;
		}
	}

	this.getClass = function() {
		return "Frame";
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
//      Extensions
//

$.jCanvas.extend({
	name: "drawDNA",
	type: "DNA",
	props: {},
	fn: function(ctx, params) {
		var p = params;
		var sequence = p.sequence;
		var nucleo;
		var nucleotide;

		for (nucleo in sequence) {
			nucleotide = sequence[nucleo];
			switch (nucleotide) {
				case "A":
					addShape(new Shape("image", "media/A.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "T":
					addShape(new Shape("image", "media/T.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "C":
					addShape(new Shape("image", "media/C.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "G":
					addShape(new Shape("image", "media/G.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "U":
					addShape(new Shape("image", "media/U.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "a":
					addShape(new Shape("image", "media/A.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "t":
					addShape(new Shape("image", "media/T.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "c":
					addShape(new Shape("image", "media/C.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "g":
					addShape(new Shape("image", "media/G.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "u":
					addShape(new Shape("image", "media/U.png", "DNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
			}
		}
	}
});

$.jCanvas.extend({
	name: "drawRNA",
	type: "RNA",
	props: {},
	fn: function(ctx, params) {
		var p = params;
		var sequence = p.sequence;
		var nucleo;
		var nucleotide;

		for (nucleo in sequence) {
			nucleotide = sequence[nucleo];
			switch (nucleotide) {
				case "A":
					addShape(new Shape("image", "media/A.png", "RNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "U":
					addShape(new Shape("image", "media/U.png", "RNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "C":
					addShape(new Shape("image", "media/C.png", "RNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "G":
					addShape(new Shape("image", "media/G.png", "RNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "a":
					addShape(new Shape("image", "media/A.png", "RNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "u":
					addShape(new Shape("image", "media/U.png", "RNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "c":
					addShape(new Shape("image", "media/C.png", "RNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
				case "g":
					addShape(new Shape("image", "media/G.png", "RNA" + p.name + nucleo, 50, 90, p.x + (nucleo * NUCLEOTIDE_WIDTH), p.y, 1));
					break;
			}
		}
	}
});

//
//      Animation Functions
//

//TODO: Will take the animationArray and apply it the canvas
function animate(array) {
	var arrayOfSteps = array[currentFrame].steps, i, step, n;
	if (currentFrame !== array.length - 1) {
		for (i in arrayOfSteps) {
			if (i == arrayOfSteps.length - 1) {
				step = arrayOfSteps[i];
				console.log(step);
				if (step.getClass()==="delay") {
					console.log("Delaying");
					$("canvas").animateLayer("delay", {
						x: "+=1"
					}, step.delay, function() {
						currentFrame++;
						setTimeout(animate(array), 1);
					});
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
		console.log(arrayOfSteps);
		for (i in arrayOfSteps) {
			step = arrayOfSteps[i];
			if (i == arrayOfSteps.length - 1) {
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
						i = 0;
						for (i in array) {
							arrayOfSteps = array[i].steps;
							for (n in arrayOfSteps) {
								step = arrayOfSteps[n];
								$("canvas").setLayer(step.target, {
									x: step.x, y: step.y,
									fillStyle: step.color,
									rotate: step.rotate,
									height: step.height,
									width: step.width,
									visible: !step.hidden
								});
							}
						}
						i = 0;
					});
				}
			} else {
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
	} else if (shape.type === "Nucleotides") {
			DNA = document.getElementById("DNA");
		dnaOutput = DNA.value;
		for(var i = 0; i<dnaOutput.length; i++){
			shove.push(dnaOutput[i]);
		}
		console.log(shove);
		$("canvas").drawDNA({
			x: 100, y: 100,
			sequence: shove,
			name: 1,
			layer: true
		}).drawLayers();
		shove = [];
	} else if (shape.type === "ellipse") {
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
				console.log(selectedObject);
                /*$('canvas').addLayer({
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
                });*/
				shape.x = $("canvas").getLayer(selectedObject).x;
				shape.y = $("canvas").getLayer(selectedObject).y;
				layerArray[shape.arrayIndex] = shape;
				needsUpdate = true;
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
	addFrame();
	addStepTo(animationArray.length - 1, new AnimationStep(outputName, outputX, outputY, outputWidth, outputHeight, outputRotation, outputColor, false, 1000));
}

//Adds frame to the end
function addFrame() {
	if (animationArray[animationArray.length] == null) {
		animationArray[animationArray.length] = new Frame([], []);
	}

}

function addFrameToIndex(index) {
	animationArray.splice(index, 0, new Frame([], []));
}

function addStepTo(index, step) {
	console.log(animationArray[index].steps);
	animationArray[index].steps[animationArray[index].steps.length] = step;
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
	$("#menu").html('<ul id="nav"> <li><a href="#" class="selected">Draw Image</a></li> <li onClick = "animatePage()"><a href="#">Animate</a></li><li><a href="#"onClick = "propertiesPage()">Properties</a></li> </ul><form action=""> DNA Sequence: <INPUT type="text" value="0" id="DNA"><br> <fieldset> color: <select id="color"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> shape: <select id="shape"> <option value="rectangle">rectangle</option> <option value="ellipse">ellipse</option> <option value="image">image</option> <option value="Nucleotides">Nucleotides</option> </select> <br> X: <INPUT type="text" value="0" id="X"><br> Y: <INPUT type="text" value="0" id="Y"><br> Width: <INPUT type="text" value="333" id="width"><br> Height: <INPUT type="text" value="333" id="height"><br> Image: <INPUT type="text" value="0" id="source"><br> Name: <INPUT type="text" value="0" id="name"><br> <input type="button" onClick="addRect()" value="Add Object"/> </fieldset> </div> </div>');
}

var framePos;
function getValue(){
	$("#frames").prop("max", animationArray.length-1);
	var name = document.getElementById("nameAnimation");
	var x = document.getElementById("XAnimate");
	var y = document.getElementById("YAnimate");
	var width = document.getElementById("widthAnimate");
	var height = document.getElementById("heightAnimate");
	var rotation = document.getElementById("rotation");
	var color = document.getElementById("colorAnimation");
	var frame = document.getElementById("frames");
	
	framePos = frame.value;
	console.log(animationArray.length);
	console.log("Name "+animationArray[framePos].steps[0].target);
	console.log("Array length "+animationArray.length);
	console.log("frameMax "+frame.max);
	console.log("frameValue "+frame.value);
	console.log("x "+animationArray[framePos].steps[0].x);
	console.log("y "+animationArray[framePos].steps[0].y);
	console.log("color "+animationArray[framePos].steps[0].color);
	console.log("widthAnimate "+animationArray[framePos].steps[0].width);
	console.log("heightAnimate "+animationArray[framePos].steps[0].height);

	//change whats in array
	
	$('#nameAnimation').val(animationArray[framePos].steps[0].target);
	$('#XAnimate').val(animationArray[framePos].steps[0].x);
	$('#YAnimate').val(animationArray[framePos].steps[0].y);
	$('#widthAnimate').val(animationArray[framePos].steps[0].width);
	$('#heightAnimate').val(animationArray[framePos].steps[0].height);
	
	if(animationArray[framePos].steps[0].color==="#ffffff" || animationArray[framePos].steps[0].color==="#FFFFFF" ){
		$('#colorAnimation')[0].val("White");
	}
	else if(animationArray[framePos].steps[0].color==="#ff0000" || animationArray[framePos].steps[0].color==="##FF0000" ){
		$('#colorAnimation')[1].val("Red");
	}
	else if(animationArray[framePos].steps[0].color==="#ffcc00" || animationArray[framePos].steps[0].color==="#FFCC00" ){
		$('#colorAnimation')[2].val("Orange");
	}
	else if(animationArray[framePos].steps[0].color==="#ffff00" || animationArray[framePos].steps[0].color==="#FFFF00" ){
		$('#colorAnimation')[3].val("Yellow");
	}
	else if(animationArray[framePos].steps[0].color==="#00ff00" || animationArray[framePos].steps[0].color==="#00FF00" ){
		$('#colorAnimation')[4].val("Green");
	}
	else if(animationArray[framePos].steps[0].color==="#0000ff" || animationArray[framePos].steps[0].color==="#0000FF" ){
		$('#colorAnimation')[5].val("Blue");
	}
	else if(animationArray[framePos].steps[0].color==="#663366" || animationArray[framePos].steps[0].color==="#663366" ){
		$('#colorAnimation')[6].val("Indigo");
	}
	else if(animationArray[framePos].steps[0].color==="#ff00ff" || animationArray[framePos].steps[0].color==="#FF00FF" ){
		$('#colorAnimation')[7].val("Violet");
	}
	else{
		$('#colorAnimation')[8].val("I failed");
	}


	
}


function animatePage(){
	$("#menu").html('<ul id="nav"> <li onClick = "drawImage()"><a href="#">Draw Image</a></li> <li><a href="#" class="selected">Animate</a></li><li><a href="#"onClick = "propertiesPage()">Properties</a></li> </ul><div id="menuWrapper"> <fieldset> <input type="image" class="arrow" id="saveform" src="left.png"/> <input type="range" class="slider" name="frames" id="frames" min="0" max="50"> <input type="image" class="arrow" id="saveform" src="right.png"/><br> color: <select id="colorAnimation"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> X: <INPUT type="text" id="XAnimate"><br> Y: <INPUT type="text" id="YAnimate"><br> Width: <INPUT type="text" id="widthAnimate"><br> Height: <INPUT type="text" id="heightAnimate"><br> Name: <INPUT type="text" id="nameAnimation"><br> Rotation: <INPUT type="text" id="rotation"><br> <input type="button" onClick="animateObject()" value="Add Object"/> <input type = "button" onClick = "animate(animationArray)" value = "Play"/> </fieldset> </div>')
}

setInterval( 'getValue()',1000);

function propertiesPage(){
	$("#menu").html('<ul id="nav"> <li onClick = "drawImage()"><a href="#">Draw Image</a></li> <li><a href="#" onClick = "animatePage()">Animate</a></li><li><a href="#" class="selected">Properties</a></li> </ul><div id="menuWrapper"> <div id="selectedObject"></div> <fieldset id="properties"> color: <select id="colorProperty"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> X: <INPUT type="text" value="0" id="XProperty"><br> Y: <INPUT type="text" value="0" id="YProperty"><br> Width: <INPUT type="text" value="333" id="widthProperty><br> Height: <INPUT type="text" value="333" id="heightProperty"><br> Rotation: <INPUT type="text" value="0" id="rotationProperty"><br> <input type="button" onClick="animateObject()" value="Add Object"/> </fieldset> </div>');
	console.log("Hi");
	propertiesPanelUpdate();
}

function propertiesPanelParse() {
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

function propertiesPanelUpdate() {
	needsUpdate = false;
	propertiesObject = selectedObject;
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
	propertiesPanelParse();
}

setInterval(function() {
	if (needsUpdate) {
		propertiesPanelUpdate();
	}
	//If nothing has been selected yet
	if(selectedObject=="hi") {

	//If its the first object selected
	} else if(selectedObject!=="hi" && propertiesObject=="hi") {
		propertiesPanelUpdate();
	//If a different object has been selected
	} else if(selectedObject!=="hi" && propertiesObject!=="hi" && propertiesObject!==selectedObject) {
		propertiesPanelUpdate();
	} else if(selectedObject!=="hi" && propertiesObject!=="hi" && propertiesObject==selectedObject) {
		propertiesPanelParse();
	}
}, 100);

//
//     Saving
//

function save() {
	localStorage.setItem("arrayAnimation", arrayAnimation);
	localStorage.setItem("layerArray", layerArray);
}

//
//     Startup
//




$(document).ready(function() {
	addShape(new Shape("rectangle", "#e2e2e2", "delay", 1, 1, 0, 0));
});
