// Pin class.
function Pin(x, y, diam, strokeColor, fillColor) {
	// Attributes:
	this.type = "CIRCLE";
	this.className = "Pin";
	this.prevX = x;
	this.prevY = y;
	this.x = x;
	this.y = y;
	this.diam = diam;
	this.strokeColor = strokeColor;
	this.fillColor = fillColor;
	this.isPressed = false;
	this.draggable = true;

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

	// Determine if the object given by
	// the argument is colliding with
	// this pin. The argument must be
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
		var collision = false;
		switch(obj.type) {
			case "POINT":
				var inPin = collidePointCircle(obj.x, obj.y, this.x, this.y, this.diam);
				collision = inPin;
				break;
			case "CIRCLE":
				var inPin = collideCircleCircle(obj.x, obj.y, obj.diam, this.x, this.y, this.diam);
				collision = inPin;
				break;
			// case "LINE":
			// 	break;
			// case "RECT":
			// 	break;
			// case "TRIANGLE":
			// 	break;
			// case "ARC":
			// 	break;
			// case "POLY":
			// 	break;
			default:
				collision = false;
				break;
		}
		return collision;
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
		// // Determine if this
		// // object is colliding with
		// // any other objects in the
		// // list.
		// var colliding = false;
		// for(var i = 0; i < objList.length; i++) {
		// 	// Don't test if this object
		// 	// is colliding with itself. Also, skip
		// 	// holes because they can't be collided with.
		// 	if((i != dragObj) && (objList[i].className != "Hole")) {
		// 		colliding |= objList[i].isBeingCollidedBy(objList[dragObj]);
		// 	}
		// }
		// if(!colliding) {
			this.x = this.prevX + (mouseX - startDrag_x);
			this.y = this.prevY + (mouseY - startDrag_y);
		// }
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