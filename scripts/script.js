//TODO: Will take the animationArray and apply it the canvas
var selectedObject = "hi";
var animationArray = [];
var layerArray = [];
var propertiesObject = "hi";
var needsUpdate = false;
var NUCLEOTIDE_WIDTH = 50, NUCLEOTIDE_HEIGHT = 90;
var currentPanel;

var stepHTML = '<div id = "name"></div> color: <select id="colorAnimation"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option><option value="#FFCC00">Orange</option><option value="#FFFF00">Yellow</option><option value="#00FF00">Green</option><option value="#0000FF">Blue</option><option value="#663366">Indigo</option><option value="#FF00FF">Violet</option></select> <br>X: <INPUT type="text" value="0" id="x"><br> Y: <INPUT type="text" value="0" id="y"><br> Width: <INPUT type="text" value="333" id="width"><br> Height: <INPUT type="text" value="333" id="height"><br>';

var shove = [];

//
//        Classes
//

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
    
    this.doesContain = function(n) {
        this.autoObjects();
        for (i in objects) {
            if(steps[i].target === n) {
                return true;
            }
            return false;
        }
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
	var arrayOfSteps = array[currentFrame].steps, i, step, n;
	console.log(animationArray);
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
                shape.x = $("canvas").getLayer(selectedObject).x;
                shape.y = $("canvas").getLayer(selectedObject).y;
                shape.width = $("canvas").getLayer(selectedObject).width;
                shape.height = $("canvas").getLayer(selectedObject).height;
                layerArray[shape.arrayIndex] = shape;
				needsUpdate = true;
			}
		}).drawLayers();
	} else if (shape.type === "Nucleotides") {
		DNA = document.getElementById("DNA");
		dnaOutput = DNA.value;
		for(var i = 0; i<dnaOutput.length; i++){
			shove.push(dnaOutput[i]);
		}
		for (nucleo in shove) {;
			switch (shove[nucleo]) {
				case "A":
					addShape(new Shape("image", "media/A.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "T":
					addShape(new Shape("image", "media/T.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "C":
					addShape(new Shape("image", "media/C.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "G":
					addShape(new Shape("image", "media/G.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "U":
					addShape(new Shape("image", "media/U.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "a":
					addShape(new Shape("image", "media/A.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "t":
					addShape(new Shape("image", "media/T.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "c":
					addShape(new Shape("image", "media/C.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "g":
					addShape(new Shape("image", "media/G.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				case "u":
					addShape(new Shape("image", "media/U.png", "DNA" + shape.objectName + "" + nucleo, 50, 90, shape.x + (nucleo * NUCLEOTIDE_WIDTH), shape.y, 1));
					break;
				default:
					break;
			}
		}
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
				shape.x = $("canvas").getLayer(selectedObject).x;
                shape.y = $("canvas").getLayer(selectedObject).y;
                shape.width = $("canvas").getLayer(selectedObject).width;
                shape.height = $("canvas").getLayer(selectedObject).height;
                layerArray[shape.arrayIndex] = shape;
				needsUpdate = true;
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
                shape.width = $("canvas").getLayer(selectedObject).width;
                shape.height = $("canvas").getLayer(selectedObject).height;
				layerArray[shape.arrayIndex] = shape;
				needsUpdate = true;
			}
		}).drawLayers();
	}
}

//
//      Input Functions
//

function reverseDNA() {
	var output = [], stringOutput;
	DNA = document.getElementById("DNA");
	dnaOutput = DNA.value;
	for(var i = 0; i<dnaOutput.length; i++){
		shove.push(dnaOutput[i]);
	}

	for (var n in shove) {
		switch (shove[n]) {
			case "A":
				output[n] = T;
				break;
			case "T":
				output[n] = A;
				break;
			case "a":
				output[n] = T;
				break;
			case "t":
				output[n] = A;
				break;
			case "C":
				output[n] = G;
				break;
			case "G":
				output[n] = C;
				break;
			case "G":
				output[n] = C;
				break;
			case "c":
				output[n] = G;
				break;
		}
	}

	for (var n in output) {
		if(n == output.length - 1) {
			stringOutput += output[n];
		} else {
			stringOutput += output[n] + " ";
		}
	}
}

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
    currentPanel = "Draw";
	$("#menu").html('<ul id="nav"> <li><a href="#" class="selected">Draw Image</a></li> <li onClick = "animatePage()"><a href="#">Animate</a></li><li><a href="#"onClick = "propertiesPage()">Properties</a></li> </ul><form action=""> DNA Sequence: <INPUT type="text" value="0" id="DNA"><br> <fieldset> color: <select id="color"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> shape: <select id="shape"> <option value="rectangle">rectangle</option> <option value="ellipse">ellipse</option> <option value="image">image</option> <option value="Nucleotides">Nucleotides</option> </select> <br> X: <INPUT type="text" value="0" id="X"><br> Y: <INPUT type="text" value="0" id="Y"><br> Width: <INPUT type="text" value="333" id="width"><br> Height: <INPUT type="text" value="333" id="height"><br> Image: <INPUT type="text" value="0" id="source"><br> Name: <INPUT type="text" value="0" id="name"><br> <input type="button" onClick="addRect()" value="Add Object"/> <input type="button" onClick="reverseDNA()" value="Reverse DNA"/> </fieldset> </div> </div>');
}

var stepHTML = '<div id = "name" value = "name"></div> color: <select id="color"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option><option value="#FFCC00">Orange</option><option value="#FFFF00">Yellow</option><option value="#00FF00">Green</option><option value="#0000FF">Blue</option><option value="#663366">Indigo</option><option value="#FF00FF">Violet</option></select><br>X:<INPUT type="text" value="0" id="X"><br> Y: <INPUT type="text" value="0" id="Y"><br> Width: <INPUT type="text" value="333" id="width"><br> Height: <INPUT type="text" value="333" id="height"><br>';
var previousSelectedFrame = "hi";
var selectedFrame = 0;

//Set the previous frame when the current frame has changed

//Call everytime the frame has changed; removes old frame if it was there and adds content of frame
//Done
function initAnimationPanel() {
    //If this is not the first frame
    if (previousSelectedFrame!="hi") {
        //Clear the panel
        for (var i in animationArray[previousSelectedFrame].steps) {
            $("#containercontainer").remove("<div id = 'container" + i +"'></div>");
        }
    }
    //Go through all of the steps and add them to the containercontainer, a container inside of the panel
	for (var i in animationArray[selectedFrame].steps) {
        $("#containercontainer").append("<div id = 'container" + i +"'></div>");
		$("#container" + i).append(stepHTML);
		$("#container" + i + " > #X").val(animationArray[selectedFrame].steps[i].x);
		$("#container" + i + " > #Y").val(animationArray[selectedFrame].steps[i].y);
		$("#container" + i + " > #width").val(animationArray[selectedFrame].steps[i].width);
		$("#container" + i + " > #height").val(animationArray[selectedFrame].steps[i].height);
		$("#container" + i + " > #colorAnimation").val(animationArray[selectedFrame].steps[i].color);
		$("#container" + i + " > #name").val(animationArray[selectedFrame].steps[i].target);
	}
}

//Assigns the value of the textboxes to the animation array, only call once panel has been initiated
//Done
function parseAnimationPanel() {
	for (var i in animationArray[selectedFrame].steps) {
		console.log($("#container > #step" + i + " > #x").val());
		animationArray[selectedFrame].steps[i].x = $("#container" + i + " > #X").val();
		animationArray[selectedFrame].steps[i].y = $("#container" + i + " > #Y").val();
		animationArray[selectedFrame].steps[i].width = $("#container" + i + " > #width").val();
		animationArray[selectedFrame].steps[i].height = $("#container" + i + " > #height").val();
		animationArray[selectedFrame].steps[i].color = $("#container" + i + " > #colorAnimation").val();
		animationArray[selectedFrame].steps[i].target = $("#container" + i + " > #name").val();
	}
}

//Changes frame, sets previous frame
//Done

function setFrameTo(frame) {
    if(selectedFrame!=frame) {
        previousSelectedFrame = selectedFrame;
        selectedFrame = frame;
        initAnimationPanel();
    }
}

//Adds step with properties of currentSelectedObject (only if it is initialized)
//Done, contains todo

function addStepAfterCurrent() {
    if(selectedObject!="hi") {
        var currentObject = $("canvas").getLayer(selectedObject);
        var step = new AnimationStep(selectedObject, currentObject.x, currentObject.y, currentObject.width, currentObject.height, 0, 
                                     currentObject.style, false, 20);
        animationArray[currentFrame].steps[animationArray[currentFrame].steps.length] = step;
    } else {
        //Alert box show message
    }
}

//Adds frame after the current one and switches the view to that frame. Updates the frames slider.
//Done, contains todo

function addFrameAfterCurrent() {
    if (selectedObject!="hi") {
        selectedFrame = animationArray[currentFrame].steps.length;
        previousSelectedFrame = animationArray[currentFrame].steps.length - 1;
        var currentObject = $("canvas").getLayer(selectedObject);
        var step = new AnimationStep(selectedObject, currentObject.x, currentObject.y, currentObject.width, currentObject.height, 0, 
                                     currentObject.style, false, 20);
        animationArray[currentFrame] = new Frame([step], [selectedObject]);
    } else {
        //Alert box show message
    }
}

//Parses slider and calls setFrameTo
//Done

function parseSlider() {
    if (previousSelectedFrame != $("#frames").slider("option", "value")) {
        previousSelectedFrame = selectedFrame;
        selectedFrame = $("#frames").slider("option", "value");
        console.log(selectedFrame);
        setFrameTo(selectedFrame);
    }
}

//On first startup, animationArray must start with a blank step.
function animatePage(){
    currentPanel = "Animate";
	$("#menu").html('<ul id="nav"> <li onClick = "drawImage()"><a href="#">Draw Image</a></li> <li><a href="#" class="selected">Animate</a></li><li><a href="#"onClick = "propertiesPage()">Properties</a></li> </ul><div id="menuWrapper"><div id="frames"></div><br><div id = "containercontainer"></div><input type="button" onClick="animateObject()" value="Add Step"/><input type = "button" onClick = "animate(animationArray)" value = "Play"/></div><input type = "button" onClick = "addFrameAfterCurrent()" value = "Add Frame"/></div>');
    $( "#frames" ).slider({
        slide: function( event, ui ) {parseSlider();},
        max: animationArray.length - 1,
        min: 0
    });
}

function propertiesPage(){
    currentPanel = "Properties";
	$("#menu").html('<ul id="nav"> <li onClick = "drawImage()"><a href="#">Draw Image</a></li> <li><a href="#" onClick = "animatePage()">Animate</a></li><li><a href="#" class="selected">Properties</a></li> </ul><div id="menuWrapper"> <div id="selectedObject"></div> <fieldset id="properties"> <div id="selectedObject"></div> color: <select id="colorProperty"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> X: <INPUT type="text" value="0" id="XProperty"><br> Y: <INPUT type="text" value="0" id="YProperty"><br> Width: <INPUT type="text" value="333" id="widthProperty"><br> Height: <INPUT type="text" value="333" id="heightProperty"><br> Rotation: <INPUT type="text" value="0" id="rotationProperty"><br> </fieldset> </div>');
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
	$("#selectedObject").text(selectedObject);
}

setInterval(function() {
    switch(currentPanel) {
            case "Properties":
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
            break;
            case "Animate":
            
            break;
            default:
            break;
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
	$("#selectedObject").text("Unselected");
	animationArray[0] = new Frame([new AnimationStep("#delay", 0, 0, 333, 333, 0, "#000000", false, 1000)], "delay");
});
