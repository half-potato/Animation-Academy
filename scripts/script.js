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

//Set the previous frame when the current frame has changed

//Changes frame, sets previous frame
//Done

function alert(text) {
    $("#readout").text(text);
    $("#readout").effect("highlight");
}

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
});
