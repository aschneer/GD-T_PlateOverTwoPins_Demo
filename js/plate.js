// Plate class.
function Plate(x, y, width, height, strokeColor, fillColor) {

	// Attributes:
	this.prevX = x;
	this.prevY = y;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.strokeColor = strokeColor;
	this.fillColor = fillColor;
	this.holes = [];
	this.isPressed = false;

	// Methods:

	this.addHole = function(x, y, diam, strokeColor, fillColor) {
		var newHole = new Hole(x, y, diam, strokeColor, fillColor);
		this.holes.push(newHole);
		return;
	}

	// Determine if the mouse pointer
	// is currently covering the plate,
	// but not in one of the holes.
	// This is considered a valid
	// click and drag.
	this.isPointedByMouse = function(mouse_x, mouse_y) {
		var inRect = collidePointRect(mouse_x, mouse_y, this.x, this.y, this.width, this.height);
		var inHole = false;
		for(var i = 0; i < this.holes.length; i++) {
			inHole = inHole || collidePointCircle(mouse_x, mouse_y, this.holes[i].x, this.holes[i].y, this.holes[i].diam);
		}
		if(inRect && (!inHole)) {
			return true;
		}
		else {
			return false;
		}
	}

	// Determine if the object given by
	// the arguments is colliding with
	// this plate.
	this.isBeingCollided = function() {




		return;
	}

	// Function to save the current position
	// coordinates into the "prev" variables.
	this.saveCurrentPos = function() {
		for(var i = 0; i < 1000; i++) {
			this.prevX = this.x;
			this.prevY = this.y;
		}
		for(var i = 0; i < this.holes.length; i++) {
			this.holes[i].saveCurrentPos();
		}
	}

	// Function to udpate position
	// coordinates during motion, of the
	// plate and any holes within it.
	this.updatePos = function(startDrag_x, startDrag_y) {


//		console.log(this.prevX, this.prevY, this.x, this.y);
		

		this.x = this.prevX + (mouseX - startDrag_x);
		this.y = this.prevY + (mouseY - startDrag_y);
		for(var i = 0; i < this.holes.length; i++) {
			this.holes[i].updatePos(startDrag_x, startDrag_y);
		}
	}

	// Render the plate and any holes in it
	// according to the shape properties that
	// are saved in each object.
	this.display = function() {
		rectMode(CORNER);
		stroke(this.strokeColor);
		fill(this.fillColor);
		rect(this.x, this.y, this.width, this.height);
		for(var i = 0; i < this.holes.length; i++) {
			this.holes[i].display();
		}
		return;
	}
}





















