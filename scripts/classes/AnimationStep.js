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