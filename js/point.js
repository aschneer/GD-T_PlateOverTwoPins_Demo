// Point class.
function Point(x, y) {
	// Attributes:
	this.type = "POINT";
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
}