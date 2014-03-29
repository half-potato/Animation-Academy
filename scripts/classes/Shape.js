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