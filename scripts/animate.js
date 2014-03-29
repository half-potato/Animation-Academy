
//TODO: Will take the animationArray and apply it the canvas
function animate(array) {
	var arrayOfSteps = array[currentFrame].steps, i, step, n;
	if (currentFrame !== array.length - 1) {
		for (i in arrayOfSteps) {
			if (i == arrayOfSteps.length - 1) {
				step = arrayOfSteps[i];
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