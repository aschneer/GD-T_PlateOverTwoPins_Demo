// Plate class.
function Plate(x, y, width, height, strokeColor, fillColor) {

	// Attributes:
	this.type = "RECT";
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
	this.draggable = true;

	// Methods:

	this.addHole = function(x, y, diam, strokeColor, fillColor) {
		var newHole = new Hole(x, y, diam, strokeColor, fillColor);
		this.holes.push(newHole);
		return newHole;
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
	// the argument is colliding with
	// this plate. The argument must be
	// a shape object that contains the
	// information necessary to determine
	// if it is colliding, such as its
	// x and y position, width and height
	// or diameter, etc.
	//
	// Valid objType's include POINT,
	// CIRCLE, LINE, RECT, TRIANGLE,
	// ARC, and POLY. These are defined
	// by the definitions in the collide2d
	// library.
	this.isBeingCollidedBy = function(obj) {
		switch(obj.type) {
			case "POINT":
				var inRect = collidePointRect(obj.x, obj.y, this.x, this.y, this.width, this.height);
				var inHole = false;
				for(var i = 0; i < this.holes.length; i++) {
					inHole = inHole || collidePointCircle(obj.x, obj.y, this.holes[i].x, this.holes[i].y, this.holes[i].diam);
				}
				break;



			// FOR THE REST OF THESE CASES, I NEED TO FIGURE OUT
			// HOW TO DISTINGUISH A SHAPE BEING IN A HOLE FROM BEING
			// INSIDE THE PLATE. RIGHT NOW, SINCE THE HOLE IS CONSIDERED
			// PLATE AREA BY THE COLLOSION DETECTION LIBRARY, THERE IS NO
			// WAY TO DISTINGUISH USING THE LIBRARY'S FUNCTIONS. IN OTHER
			// WORDS, A SHAPE THAT IS PARTIALLY INSIDE AND OUTSIDE THE
			// HOLE IS CONSIDERED INSIDE BOTH, WHICH IS TRUE, BUT THERE
			// IS NO DISTINCTION BETWEEN INSIDE BOTH AND ONLY INSIDE
			// THE HOLE, BECAUSE THE LIBRARY CONSIDERS "ONLY INSIDE
			// THE HOLE" TO ALSO BE INSIDE THE PLATE.

			case "CIRCLE":
				var inRect = collideRectCircle(this.x, this.y, this.width, this.height, obj.x, obj.y, obj.diam);
				var inHole = false;
				for(var i = 0; i < this.holes.length; i++) {
					inHole = inHole || collideCircleCircle(obj.x, obj.y, obj.diam, this.holes[i].x, this.holes[i].y, this.holes[i].diam);
				}
				break;
			case "LINE":
				break;
			case "RECT":
				break;
			case "TRIANGLE":
				break;
			case "ARC":
				break;
			case "POLY":
				break;
			default:
				break;
		}
		if(obj.type == "POINT") {
			if(inRect && (!inHole)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {

		}
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
		return;
	}
}





















