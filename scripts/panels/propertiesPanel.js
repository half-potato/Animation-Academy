function propertiesPanel(){
    currentPanel = "Properties";
	$("#menu").html('<ul id="nav"> <li onClick = "objectPanel()"><a href="#">Draw Image</a></li> <li><a href="#" onClick = "animatePanel()">Animate</a></li><li><a href="#" class="selected">Properties</a></li> </ul><div id="menuWrapper"> <div id="selectedObject"></div> <fieldset id="properties"> <div id="selectedObject"></div> color: <select id="colorProperty"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option> <option value="#FFCC00">Orange</option> <option value="#FFFF00">Yellow</option> <option value="#00FF00">Green</option> <option value="#0000FF">Blue</option> <option value="#663366">Indigo</option> <option value="#FF00FF">Violet</option> </select> <br> X: <INPUT type="text" value="0" id="XProperty"><br> Y: <INPUT type="text" value="0" id="YProperty"><br> Width: <INPUT type="text" value="333" id="widthProperty"><br> Height: <INPUT type="text" value="333" id="heightProperty"><br> Rotation: <INPUT type="text" value="0" id="rotationProperty"><br> </fieldset> </div>');
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

function changeProperties(selector, style, width, height, x, y) {
	$("canvas").setLayer(selector, {
		width: width,
		height: height,
		fillStyle: style,
		x: x, y: y,
		draggable: true
	}).drawLayers();
}