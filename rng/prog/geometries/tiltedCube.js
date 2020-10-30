/**
* Specifies a TiltedCube. A subclass of Geometry.
*
* @author Talon Baker
* @this {TiltedCube}
*/
class TiltedCube extends Geometry {
	/**
	* Constructor for TiltedCube.
	*
	* @constructor
	* @param {Number} size The size of the TiltedCube drawn
	* @param {Number} centerX The center x-position of the TiltedCube
	* @param {Number} centerY The center y-position of the TiltedCube
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, colorFlag) {
		super();
		super.shape = "TiltedCube";
		super.centerPoint = {x: centerX, y: centerY};
		this.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = new Vertex();

		this.centerX = centerX;
		this.centerY = centerY;

		this.isSolidColor = colorFlag;

		this.generateTiltedCubeVertices(centerX, centerY, sizeVal);

		this.modelMatrix = new Matrix4();

		// Translation directions
		this.currentAngle = 1;
	}

	// will update model direction and travel location
	updateAnimation() {
		// console.log(this.centerX, this.centerY);
		let translateMatrix1 = new Matrix4();
		let rotateMatrix = new Matrix4();
		let translateMatrix2 = new Matrix4();

		//T
		translateMatrix1.setTranslate(-this.centerX, -this.centerY, 0);

			this.modelMatrix = translateMatrix1.multiply(this.modelMatrix);

		//R
		rotateMatrix.setRotate(this.currentAngle, this.currentAngle, this.currentAngle, this.currentAngle);

			this.modelMatrix = rotateMatrix.multiply(this.modelMatrix);

		//T
		translateMatrix2.setTranslate(this.centerX, this.centerY, 0);

			this.modelMatrix = translateMatrix2.multiply(this.modelMatrix);

		// Pass the rotation matrix to the vertex shader
		gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);
		this.render();
	}

	/**
	* Overloaded base class renders in order to update animaton / movement
	*/
	render() {
		sendUniformVec4ToGLSL(u_FragColor, [this.color.r, this.color.g, this.color.b, 1.0]);

		let renderVertices = new Float32Array(this.vertices.getArray(this.isSolidColor, this.color.r, this.color.g, this.color.b));
		let n = this.vertices.getLength() / 3;

		sendUniformMat4ToGLSL(u_ModelMatrix, this.modelMatrix.elements);

		// Render Vertices = Float32Array.
		sendAttributeBufferToGLSL(renderVertices, n);
	}

	/**
	* Generates the vertices of the TiltedCube.
	*
	* @private
	* @param {Number} size The size of the TiltedCube drawn
	* @param {Number} centerX The center x-position of the TiltedCube
	* @param {Number} centerY The center y-position of the TiltedCube
	*/
	generateTiltedCubeVertices(centerX, centerY, size) {
		/*
			Cube faces will be repeated 4 times for the sides
			and 2 more times for the top and bottom.

			Faces:

			p1*-----*p2   *p2
			  |   /     / |
			  | /     /   |
			p0*   p0*-----*p3

			First triangle: p0, p1, p2

			Second triangle: p2, p3, p0
		*/

		/*FRONT SQUARE*/
			/*012*/
				// p0
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					size // z
				);
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					size // z
				);
				// p2
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					size // z
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
			/*023*/
				// p2
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					size // z
				);
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					size // z
				);
				// p0
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					size // z
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
		/*RIGHT SQUARE*/
			/*324*/
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					size // z
				);
				// p2
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					size // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					-size // z
				);
			/*TRIANGLE 3 COLORS*/
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
			/*345*/
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					size // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					-size // z
				);
				// p5
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					-size // z
				);
			/*TRIANGLE 4 COLORS*/
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
		/*BACK SQUARE*/
			/*546*/
				// p5
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					-size // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					-size // z
				);
				// p6
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					-size // z
				);
			/*TRIANGLE 5 COLORS*/
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
			/*567*/
				// p5
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					-size // z
				);
				// p6
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					-size // z
				);
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					-size // z
				);
			/*TRIANGLE 6 COLORS*/
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
		/*LEFT SQUARE*/
			/*761*/
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					-size // z
				);
				// p6
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					-size // z
				);
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					size // z
				);
			/*TRIANGLE 7 COLORS*/
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
			/*710*/
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					-size // z
				);
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					size // z
				);
				// p0
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					size // z
				);
			/*TRIANGLE 8 COLORS*/
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
		/*TOP SQUARE*/
			/*164*/
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					size // z
				);
				// p6
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					-size // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					-size // z
				);
			/*TRIANGLE 9 COLORS*/
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
			/*142*/
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					size // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					-size // z
				);
				// p2
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					size // z
				);
			/*TRIANGLE 10 COLORS*/
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
		/*BOTTOM SQUARE*/
			/*703*/
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					-size // z
				);
				// p0
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					size // z
				);
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					size // z
				);
			/*TRIANGLE 11 COLORS*/
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
			/*735*/
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					-size // z
				);
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					size // z
				);
				// p5
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					-size // z
				);
			/*TRIANGLE 12 COLORS*/
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
	}// End generateTiltedCubeVertices
}// End class TiltedCube