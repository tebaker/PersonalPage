/**
* Specifies a Triangle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {Triangle}
*/
class Triangle extends Geometry {
	/**
	* Constructor for Triangle.
	*
	* @constructor
	* @param {Number} size The size of the triangle drawn
	* @param {Number} centerX The center x-position of the triangle
	* @param {Number} centerY The center y-position of the triangle
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
		super();
		super.shape = "triangle";
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = new Vertex();

		this.generateTriangleVertices(sizeVal, centerX, centerY)

	}

	/**
	* Generates the vertices of the Triangle.
	*
	* @private
	* @param {Number} size The size of the triangle drawn
	* @param {Number} centerX The center x-position of the triangle
	* @param {Number} centerY The center y-position of the triangle
	*/
	generateTriangleVertices(size, centerX, centerY) {
		/*
			   p1*
			    / \
			   /   \
			p0*-----*p2

			First triangle: p0, p1, p2
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
			centerX, // x
			(centerY + size), // y
			0.0 // z
		);

		// p2
		this.vertices.addPoints(
			(centerX + size), // x
			(centerY - size), // y
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

	}// End generateTriangleVertices
}// End class Triangle