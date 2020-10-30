/**
* Specifies a SpinningSquare. A subclass of Geometry.
*
* @author Talon Baker
* @this {SpinningSquare}
*/
class SpinningSquare extends Square {
	/**
	* Constructor for SpinningSquare.
	*
	* @constructor
	* @param {Number} size The size of the SpinningSquare drawn
	* @param {Number} centerX The center x-position of the SpinningSquare
	* @param {Number} centerY The center y-position of the SpinningSquare
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, colorFlag) {
		super(centerX, centerY, rVal, gVal, bVal, sizeVal);
		
		this.centerX = centerX;
		this.centerY = centerY;

		this.color = {r: rVal, g: gVal, b: bVal};
		this.isSolidColor = colorFlag;

		super.shape = "spinningSquare";

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
		rotateMatrix.setRotate(this.currentAngle, 0, 0, 1);

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

		// Setting shader to the default shader
		useShader(gl, defaultShaderProgram);

		// Get the location of attribute variable a_Position
		a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		if (a_Position < 0) {
			console.log('Fail to get the storage location of a_Position');
			return;
		}

		u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
		if (!u_ModelMatrix) { 
			console.log('Failed to get the storage location of u_ModelMatrix');
			return;
		}

		// Get the location of attribute variable of a_PointSize
		a_Color = gl.getAttribLocation(gl.program, 'a_Color');
		if (a_Color < 0) {
			console.log('Fail to get the storage location of a_Color');
			return;
		}


		sendUniformVec4ToGLSL(u_FragColor, [this.color.r, this.color.g, this.color.b, 1.0]);

		let renderVertices = new Float32Array(this.vertices.getArray(this.isSolidColor, this.color.r, this.color.g, this.color.b));
		let n = this.vertices.getLength() / 3;

		sendUniformMat4ToGLSL(u_ModelMatrix, this.modelMatrix.elements);

		// Render Vertices = Float32Array.
		sendAttributeBufferToGLSL(renderVertices, n);
	}
}// End class SpinningSquare