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
	newObj.addHole(200, 200, 50, 0, 255);
	newObj.addHole(400, 200, 50, 0, 255);
	objList.push(newObj);

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

	if(mouseIsPressed) {
		// Intentionally loop through this
		// array backwards so objects at the
		// end of the list get "clicked" first.
		// This ensures that the objects at the
		// "top" of the stack are selected
		// when the mouse button is clicked.
		for(var i = (objList.length - 1); i >= 0; i--) {
			if(objList[i].isPointedByMouse(startDrag_x, startDrag_y)) {
				objList[i].saveCurrentPos();
				// Move dragged object to the
				// end of the list so it
				// gets selected first in the future,
				// and so that it gets rendered last,
				// therefore appearing on "top" of
				// all of the other objects.
				var temp = objList[i];
				objList.splice(i, 1);
				objList.push(temp);
				dragging = true;
				dragObj = (objList.length - 1);
				return;
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

























