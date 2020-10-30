/**
* Specifies a FluctuatingTriangle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {FluctuatingTriangle}
*/
class FluctuatingTriangle extends Triangle {
	/**
	* Constructor for FluctuatingTriangle.
	*
	* @constructor
	* @param {Number} size The size of the FluctuatingTriangle drawn
	* @param {Number} centerX The center x-position of the FluctuatingTriangle
	* @param {Number} centerY The center y-position of the FluctuatingTriangle
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, colorFlag) {
		super(centerX, centerY, rVal, gVal, bVal, sizeVal);
		
		this.centerX = centerX;
		this.centerY = centerY;

		this.color = {r: rVal, g: gVal, b: bVal};
		this.isSolidColor = colorFlag;

		super.shape = "fluctuatingTriangle";

		this.modelMatrix = new Matrix4();

		this.scale = 1.01;

		this.growFlag = true;
	}

	// will update model direction and travel location
	updateAnimation() {
		let translateMatrix1 = new Matrix4();
		let scaleMatrix = new Matrix4();
		let translateMatrix2 = new Matrix4();

		let timeNow = performance.now();

		//T
		translateMatrix1.setTranslate(-this.centerX, -this.centerY, 0);
			this.modelMatrix = translateMatrix1.multiply(this.modelMatrix);

		// Every time tickFlag is true (once every second)
		// shrink / grow triangle
		if(tickFlag) {
			if(this.growFlag) {
				this.growFlag = false;
			}
			else {
				this.growFlag = true;
			}
		}

		//S
		if(this.growFlag) {
			scaleMatrix.setScale(1.01, 1.01, 0);
		}
		else {
			scaleMatrix.setScale(0.99, 0.99, 0);
		}
		
		this.modelMatrix = scaleMatrix.multiply(this.modelMatrix);


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
}// End class FluctuatingTriangle