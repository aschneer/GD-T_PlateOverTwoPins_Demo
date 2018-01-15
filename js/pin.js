// Pin class.
function Pin(x, y, diam, strokeColor, fillColor) {
	// Attributes:
	this.prevX = x;
	this.prevY = y;
	this.x = x;
	this.y = y;
	this.diam = diam;
	this.strokeColor = strokeColor;
	this.fillColor = fillColor;
	this.isPressed = false;

	// Methods:

	// Determine if the mouse pointer
	// is currently covering the pin.
	// This is considered a valid
	// click and drag.
	this.isPointedByMouse = function(mouse_x, mouse_y) {
		var inPin = collidePointCircle(mouse_x, mouse_y, this.x, this.y, this.diam);
		if(inPin) {
			return true;
		}
		else {
			return false;
		}
	}

	// Function to save the current position
	// coordinates into the "prev" variables.
	this.saveCurrentPos = function() {
		this.prevX = this.x;
		this.prevY = this.y;
	}

	// Function to udpate position
	// coordinates during motion, of the
	// plate and any holes within it.
	this.updatePos = function(startDrag_x, startDrag_y) {
		this.x = this.prevX + (mouseX - startDrag_x);
		this.y = this.prevY + (mouseY - startDrag_y);
	}

	// Render the pin
	// according to the shape properties that
	// are saved in the object.
	this.display = function() {
		ellipseMode(CENTER);
		stroke(this.strokeColor);
		fill(this.fillColor);
		ellipse(this.x, this.y, this.diam, this.diam);
		return;
	}
}