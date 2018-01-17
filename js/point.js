// Point class.
function Point(x, y) {
	// Attributes:
	this.type = "POINT";
	this.className = "Point";
	this.prevX = x;
	this.prevY = y;
	this.x = x;
	this.y = y;
	this.isPressed = false;
	this.draggable = false;

	// Methods:

	// Function to save the current position
	// coordinates into the "prev" variables.
	this.saveCurrentPos = function() {
		this.prevX = this.x;
		this.prevY = this.y;
	}

	// Function to udpate position
	// coordinates during motion.
	this.updatePos = function(startDrag_x, startDrag_y) {
		this.x = this.prevX + (mouseX - startDrag_x);
		this.y = this.prevY + (mouseY - startDrag_y);
	}

	// Function to determine if this point
	// object shares the same position
	// coordinates as the one given by
	// the argument.
	this.equals = function(pointObj) {
		return ((pointObj.x == this.x) && (pointObj.y == this.y));
	}
}