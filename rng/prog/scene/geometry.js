/**
 * Specifies a geometric object
 *
 * @author Talon Baker
 * @this {Geometry}
 */
class Geometry {

	constructor() {
		// Shape name. TBD in child class
		this.shape = "";
		// Clicked x, y coords
		this.centerPoint = {x: 0.0, y: 0.0};
		// Color
		this.color = {r: 0.0, g: 0.0, b: 0.0};
		// Normally the length of the side/radius
		this.size = 0.0;
		// Holding all vertices to make up the shape
		this.vertices;
		// Holding toggle for wireframe option
		this.wireframe = false;
		// Holding toggle for solid vs. rainbow color option
		this.solidColor = solidColorFlag;
	}

	/**
	* Renders this Geometry within your webGL scene.
	*/
	render() {
		sendUniformVec4ToGLSL(u_FragColor, [this.color.r, this.color.g, this.color.b, 1.0]);
		
		let renderVertices = new Float32Array(this.vertices.getArray(this.solidColor, this.color.r, this.color.g, this.color.b));
		let n = this.vertices.getLength() / 3;

		sendAttributeBufferToGLSL(renderVertices, n, this.vertices);
	}
}
