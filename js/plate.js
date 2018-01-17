// Plate class.
function Plate(x, y, width, height, strokeColor, fillColor) {

	// Attributes:
	this.type = "RECT";
	this.className = "Plate";
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
			inHole |= collidePointCircle(mouse_x, mouse_y, this.holes[i].x, this.holes[i].y, this.holes[i].diam);
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
		var collision = false;
		switch(obj.type) {
			case "POINT":
				var inRect = collidePointRect(obj.x, obj.y, this.x, this.y, this.width, this.height);
				var inHole = false;
				for(var i = 0; i < this.holes.length; i++) {
					inHole |= collidePointCircle(obj.x, obj.y, this.holes[i].x, this.holes[i].y, this.holes[i].diam);
				}
				collision = (inRect && (!inHole));
				break;
			case "CIRCLE":
				var inRect = collideRectCircle(this.x, this.y, this.width, this.height, obj.x, obj.y, obj.diam);
				var completelyInHole = false;
				// Special formula is used to determine if one circle
				// is fully contained within the other. This is true
				// when the center point of the pin is colliding
				// with a circle centered in the hole with diameter
				// equal to the difference between the hole and pin
				// diameters, or if the circles are equal diameter and
				// share a center point.
				for(var i = 0; i < this.holes.length; i++) {
					if(this.holes[i].diam > obj.diam) {
						completelyInHole |= collidePointCircle(obj.x, obj.y, this.holes[i].x, this.holes[i].y, (this.holes[i].diam - obj.diam));
					}
					else if(this.holes[i].diam == obj.diam) {
						completelyInHole |= ((obj.x == this.holes[i].x) && (obj.y == this.holes[i].y));
					}
					// Hole diam < obj diam.
					else {
						completelyInHole = false;
					}
				}
				collision = (inRect && (!completelyInHole));
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
		for(var i = 0; i < this.holes.length; i++) {
			this.holes[i].saveCurrentPos();
		}
	}

	// Function to udpate position
	// coordinates during motion, of the
	// plate and any holes within it.
	this.updatePos = function(startDrag_x, startDrag_y, objList, dragObj) {
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
			for(var i = 0; i < this.holes.length; i++) {
				this.holes[i].updatePos(startDrag_x, startDrag_y);
			}
		// }
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





















