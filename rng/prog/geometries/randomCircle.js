/**
* Specifies a RandomCircle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {RandomCircle}
*/
class RandomCircle extends Circle {
	/**
	* Constructor for RandomCircle.
	*
	* @constructor
	* @param {Number} radius The radius of the Randomcircle being constructed
	* @param {Integer} segments The number of segments composing the Randomcircle
	* @param {Number} centerX The central x-position of the Randomcircle
	* @param {Number} centerY The central y-position of the Randomcircle
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, segVal, colorFlag) {
		super(centerX, centerY, rVal, gVal, bVal, sizeVal, segVal);

		this.centerX = centerX;
		this.centerY = centerY;

		this.color = {r: rVal, g: gVal, b: bVal};

		super.shape = "randomCricle";

		this.isSolidColor = colorFlag;

		this.modelMatrix = new Matrix4();

		//	Current direction the shape is traveling in
		this.currentAngle = Math.floor(Math.random() * 360) + 1;
		this.currentAngle = Math.random();

		// Translation directions
		this.varTx = 0.0;
		this.varTy = 0.0;
		this.varTa = 0.0;
		this.varTb = 0.0;
	}

	// will update model direction and travel location
	updateAnimation() {
		// console.log(this.centerX, this.centerY);
		let translateMatrix1 = new Matrix4();
		let rotateMatrix = new Matrix4();
		let translateMatrix2 = new Matrix4();

		if(tickFlag) {
			let var1 = Math.floor(Math.random() * (2));
			let var2 = Math.floor(Math.random() * (2));
			let var3 = Math.floor(Math.random() * (2));
			let var4 = Math.floor(Math.random() * (2));

			if(var1) {
				this.varTx = 0.001;
			}
			else {
				this.varTx = -0.001;
			}

			if(var2) {
				this.varTy = 0.001;
			}
			else {
				this.varTy = -0.001;
			}

			if(var3) {
				this.varTa = 0.001;
			}
			else {
				this.varTa = -0.001;
			}

			if(var4) {
				this.varTb = 0.001;
			}
			else {
				this.varTb = -0.001;
			}
		}

		//T
		translateMatrix2.setTranslate(this.varTx + this.varTa, this.varTy + this.varTb, 0);
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
}// End class RandomCircle