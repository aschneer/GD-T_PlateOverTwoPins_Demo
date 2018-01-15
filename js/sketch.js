// Global Variables:
var leftPin_x;
var leftPin_y;
var leftPin_diam;
var rightPin_x;
var rightPin_y;
var rightPin_diam;

var startDrag_x;
var startDrag_y;
var objList;
var dragging;
var dragObj;

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CORNER);
	ellipseMode(CENTER);

	leftHole_x = 100;
	leftHole_y = 100;
	leftHole_diam = 50;
	rightHole_x = 300;
	rightHole_y = 100;
	rightHole_diam = 50;
	leftPin_x = 100;
	leftPin_y = 100;
	leftPin_diam = 20;
	rightPin_x = 300;
	rightPin_y = 100;
	rightPin_diam = 20;

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

	// Create 2 pins to sit inside the holes.
	var newObj = new Pin(200, 200, 20, 0, 80);
	objList.push(newObj);
	var newObj = new Pin(400, 200, 20, 0, 80);
	objList.push(newObj);

	// Create left pin.
//	newObj = new pin();

}

function draw() {
	background(255);

	// Draw two pins that lie inside the
	// holes in the plate.
	// fill(80);
	// ellipse(leftPin_x, leftPin_y, leftPin_diam, leftPin_diam);
	// ellipse(rightPin_x, rightPin_y, rightPin_diam, rightPin_diam);

	// Update positions of all objects
	// and draw them to the canvas.
	for(var i = 0; i < objList.length; i++) {
		if(dragging) {
			objList[dragObj].updatePos(startDrag_x, startDrag_y);
		}
		objList[i].display();
	}
}

function mousePressed() {
	startDrag_x = mouseX;
	startDrag_y = mouseY;

	if(mouseIsPressed) {
		for(var i = 0; i < objList.length; i++) {
			if(objList[i].isPointedByMouse(startDrag_x, startDrag_y)) {
				dragging = true;
				dragObj = i;
				objList[i].saveCurrentPos();
				return;
			}
		}
	}
	return;
}

function mouseReleased() {
	dragging = false;
	dragObj = -99;
	return;
}

























