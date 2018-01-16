// Global Variables:
var startDrag_x;
var startDrag_y;
var objList;
var dragging;
var dragObj;

// Setup function.
function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CORNER);
	ellipseMode(CENTER);

	startDrag_x = 0;
	startDrag_y = 0;
	objList = [];
	dragging = false;
	// Array index in objList corresponding to
	// the object currently being dragged.
	dragObj = -99;

	// Create plate with holes in it.
	var newObj = new Plate(100, 100, 400, 200, 0, 80);
	objList.push(newObj);
	// Simultaneously add holes to the plate,
	// and push the hole objects that are
	// returned onto the end of the objList array.
	// All objects and sub-objects are rendered
	// on the root level.
	objList.push(newObj.addHole(200, 200, 50, 0, 255));
	objList.push(newObj.addHole(400, 200, 50, 0, 255));

	// Create 2 pins to sit inside the plate holes.
	var newObj = new Pin(200, 200, 20, 0, 80);
	objList.push(newObj);
	var newObj = new Pin(400, 200, 20, 0, 80);
	objList.push(newObj);
}

// Draw loop.
function draw() {
	background(255);

	// Update positions of all objects
	// and draw them to the canvas.
	for(var i = 0; i < objList.length; i++) {
		if(dragging) {
			objList[dragObj].updatePos(startDrag_x, startDrag_y);
		}
		objList[i].display();
	}
}

// Interrupt function that runs once
// when the mouse button is pressed.
function mousePressed() {
	startDrag_x = mouseX;
	startDrag_y = mouseY;
	var startDragPoint = new Point(startDrag_x, startDrag_y);

	if(mouseIsPressed) {
		// Intentionally loop through this
		// array backwards so objects at the
		// end of the list get "clicked" first.
		// This ensures that the objects at the
		// "top" of the stack are selected
		// when the mouse button is clicked.
		for(var i = (objList.length - 1); i >= 0; i--) {
			if(objList[i].draggable) {
				if(objList[i].isPointedByMouse(startDrag_x, startDrag_y)) {
					objList[i].saveCurrentPos();
					dragging = true;
					dragObj = i;
					return;
				}
			}
		}
	}
	return;
}

// Interrupt function that runs once
// when the mouse button is released.
function mouseReleased() {
	dragging = false;
	dragObj = -99;
	return;
}

























