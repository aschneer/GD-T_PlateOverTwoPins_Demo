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

	// this.addHole = function(x, y, diam) {
	// 	var newHole = new hole(x, y, diam);
	// 	this.holes.push(newHole);
	// 	return;
	// }

	// Determine if the mouse pointer
	// is currently covering the plate,
	// but not in one of the holes.
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





















