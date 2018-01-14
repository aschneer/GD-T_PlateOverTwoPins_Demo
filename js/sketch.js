// Global Variables:
var leftHole_x;
var leftHole_y;
var leftHole_diam;
var rightHole_x;
var rightHole_y;
var rightHole_diam;
var leftPin_x;
var leftPin_y;
var leftPin_diam;
var rightPin_x;
var rightPin_y;
var rightPin_diam;

var plate_pressed;
var leftPin_pressed;
var rightPin_pressed;

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

	objList = [];
	dragging = false;
	// Array index in objList corresponding to
	// the object currently being dragged.
	dragObj = -99;

	// Create plate.
	var newObj = new Plate(100, 100, 400, 200, 0, 80);
//	plate.addHole();
	objList.push(newObj);

	// Create left pin.
//	newObj = new pin();

}

function draw() {
	background(255);

	// Draw two holes in the plate.
	// fill(255);
	// ellipse(leftHole_x, leftHole_y, leftHole_diam, leftHole_diam);
	// ellipse(rightHole_x, rightHole_y, rightHole_diam, rightHole_diam);

	// Draw two pins that lie inside the
	// holes in the plate.
	// fill(80);
	// ellipse(leftPin_x, leftPin_y, leftPin_diam, leftPin_diam);
	// ellipse(rightPin_x, rightPin_y, rightPin_diam, rightPin_diam);

	// Update positions of all objects
	// and draw them to the canvas.
	for(var i = 0; i < objList.length; i++) {
		if(dragging) {
			objList[dragObj].x = objList[dragObj].prevX + (mouseX - startDrag_x);
			objList[dragObj].y = objList[dragObj].prevY + (mouseY - startDrag_y);
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
				objList[i].prevX = objList[i].x;
				objList[i].prevY = objList[i].y;
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

























