// Dimension Class:

function Dim {
	// Attributes:
	var type;
		// Valid Types:
		//		DIAMETER
		//		RADIUS
		//		LENGTH
		//		ANGLE
	var modifier;
		// Valid Modifiers:
		//		BASIC
		//		REFERENCE
	var nom;
	var lowTol;
	var highTol;

	// Constructor:
	constructor(type, modifier, nom, lowTol, highTol) {
		this.type = type;
		this.modifier = modifier;
		this.nom = nom;
		this.lowTol = lowTol;
		this.highTol = highTol;
	}

	// Methods:
}