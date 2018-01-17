// Hole class.
function Hole(x, y, diam, strokeColor, fillColor) {
	// Attributes:
	this.type = "CIRCLE";
	this.className = "Hole";
	this.prevX = x;
	this.prevY = y;
	this.x = x;
	this.y = y;
	this.diam = diam;
	this.strokeColor = strokeColor;
	this.fillColor = fillColor;
	this.draggable = false;

	// Methods:

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

	// Render the hole
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