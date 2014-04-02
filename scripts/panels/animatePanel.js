var stepHTML = '<div id = "name" value = "name"></div> color: <select id="color"> <option value="#FFFFFF">White</option> <option value="#FF0000">Red</option><option value="#FFCC00">Orange</option><option value="#FFFF00">Yellow</option><option value="#00FF00">Green</option><option value="#0000FF">Blue</option><option value="#663366">Indigo</option><option value="#FF00FF">Violet</option></select><br>X:<INPUT type="text" value="0" id="X"><br> Y: <INPUT type="text" value="0" id="Y"><br> Width: <INPUT type="text" value="333" id="width"><br> Height: <INPUT type="text" value="333" id="height"><br>';
var previousSelectedFrame = "hi";
var selectedFrame = 0;
var animationArray = [];

function setFrameTo(frame) {
    if(selectedFrame!=frame) {
        previousSelectedFrame = selectedFrame;
        selectedFrame = frame;
        initAnimationPanel();
    }
}

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

//Adds step with properties of currentSelectedObject (only if it is initialized)
//Done, contains todo

function addStepAfterCurrent() {
    if(selectedObject!="hi") {
        var currentObject = $("canvas").getLayer(selectedObject);
        var step = new AnimationStep(selectedObject, currentObject.x, currentObject.y, currentObject.width, currentObject.height, 0, 
                                     currentObject.style, false, 20);
        animationArray[selectedFrame].steps[animationArray[selectedFrame].steps.length] = step;
        var i = animationArray[selectedFrame].steps.length;
        $("#containercontainer").append("<div id = 'container" + i +"'></div>");
        $("#container" + i).append(stepHTML);
		$("#container" + i + " > #X").val(currentObject.x);
		$("#container" + i + " > #Y").val(currentObject.y);
		$("#container" + i + " > #width").val(currentObject.width);
		$("#container" + i + " > #height").val(currentObject.height);
		$("#container" + i + " > #colorAnimation").val(currentObject.color);
		$("#container" + i + " > #name").val(selectedObject);
    } else {
        //Alert box show message
    }
}

//Adds frame after the current one and switches the view to that frame. Updates the frames slider.
//Done, contains todo

function addFrameAfterCurrent() {
    console.log(animationArray);
    if (selectedObject!="hi") {
        selectedFrame = animationArray.length;
        previousSelectedFrame = animationArray.length - 1;
        var currentObject = $("canvas").getLayer(selectedObject);
        var step = new AnimationStep(selectedObject, currentObject.x, currentObject.y, currentObject.width, currentObject.height, 0, 
                                     currentObject.style, false, 20);
        animationArray[selectedFrame] = new Frame([step], [selectedObject]);
        initAnimationPanel();
        $( "#frames" ).slider({
            change: function( event, ui ) {parseSlider();},
            max: animationArray.length - 1,
            min: 0
        });
    } else {
        alert("No target object selected.");
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
function animatePanel(){
    currentPanel = "Animate";
	$("#menu").html('<ul id="nav"> <li onClick = "objectPanel()"><a href="#">Draw Image</a></li> <li><a href="#" class="selected">Animate</a></li><li><a href="#"onClick = "propertiesPanel()">Properties</a></li></ul>' + '<div id="menuWrapper"><div id="frames"></div><br><div id = "containercontainer"></div><input type="button" onClick="addStepAfterCurrent()" value="Add Step"/><input type = "button" onClick = "addFrameAfterCurrent()" value = "Add Frame"/><input type = "button" onClick = "animate(animationArray)" value = "Play"/></div>');
    $( "#frames" ).slider({
        slide: function( event, ui ) {parseSlider();},
        max: animationArray.length - 1,
        min: 0
    });
}