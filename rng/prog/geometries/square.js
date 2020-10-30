/**
* Specifies a Square. A subclass of Geometry.
*
* @author Talon Baker
* @this {Square}
*/
class Square extends Geometry {
	/**
	* Constructor for Square.
	*
	* @constructor
	* @param {Number} size The size of the square drawn
	* @param {Number} centerX The center x-position of the square
	* @param {Number} centerY The center y-position of the square
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
		super();
		super.shape = "square";
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = new Vertex();

		this.generateSquareVertices(centerX, centerY, sizeVal);
	}

	/**
	* Generates the vertices of the square.
	*
	* @private
	* @param {Number} size The size of the square drawn
	* @param {Number} centerX The center x-position of the square
	* @param {Number} centerY The center y-position of the square
	*/
	generateSquareVertices(centerX, centerY, size) {
		/*
			p1*-----*p2   *p2
			  |   /     / |
			  | /     /   |
			p0*   p0*-----*p3

			First triangle: p0, p1, p2

			Second triangle: p2, p3, p0
		*/

	/*TRIANGLE 1 VERTICES*/
		// p0
		this.vertices.addPoints(
			(centerX - size), // x
			(centerY - size), // y
			0.0 // z
		);
		// p1
		this.vertices.addPoints(
			(centerX - size), // x
			(centerY + size), // y
			0.0 // z
		);
		// p2
		this.vertices.addPoints(
			(centerX + size), // x
			(centerY + size), // y
			0.0 // z
		);
	/*TRIANGLE 1 COLORS*/
		// c0
		this.vertices.addColors(
			Math.random(),
			Math.random(),
			Math.random()
		)
		// c1
		this.vertices.addColors(
			Math.random(),
			Math.random(),
			Math.random()
		)
		// c2
		this.vertices.addColors(
			Math.random(),
			Math.random(),
			Math.random()
		)

	/*TRIANGLE 2 VERTICES*/
		// p2
		this.vertices.addPoints(
			(centerX + size), // x
			(centerY + size), // y
			0.0 // z
		);

		// p3
		this.vertices.addPoints(
			(centerX + size), // x
			(centerY - size), // y
			0.0 // z
		);

		// p0
		this.vertices.addPoints(
			(centerX - size), // x
			(centerY - size), // y
			0.0 // z
		);
	/*TRIANGLE 2 COLORS*/
		// c0
		this.vertices.addColors(
			Math.random(),
			Math.random(),
			Math.random()
		)
		// c1
		this.vertices.addColors(
			Math.random(),
			Math.random(),
			Math.random()
		)
		// c2
		this.vertices.addColors(
			Math.random(),
			Math.random(),
			Math.random()
		)
	}// End generateSquareVertices
}// End class Square