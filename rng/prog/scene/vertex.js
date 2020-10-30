/**
* Specifies a vertex. Currently only contains the vertex's position.
*
* @author Talon Baker
* @this {Vertex}
*/
class Vertex {
	// Default constructor
	constructor() {
		this.points = []; // x, y, z coords
		this.normal = [];
		this.uv = [];
		this.colors = []; // r, g, b values
	}

	// Adding x, y, z coords
	addPoints(xCoord, yCoord, zCoord) {
		this.points.push(xCoord);
		this.points.push(yCoord);
		this.points.push(zCoord);
	}

	// Adding r, g, b colors
	addColors(rColor, gColor, bColor) {
		this.colors.push(rColor);
		this.colors.push(gColor);
		this.colors.push(bColor);
	}

	getArray(isSolidColor, r, g, b) {
		let returnArray = [];

		for(let i = 0; i < this.points.length; i+=3) {
			// Getting the x, y, z coords of the vector
			returnArray.push(this.points[i]);
			returnArray.push(this.points[i+1]);
			returnArray.push(this.points[i+2]);

			if(isSolidColor) {
				returnArray.push(r);
				returnArray.push(g);
				returnArray.push(b);
			}
			else {
				// Getting the r, g, b values of each point
				returnArray.push(this.colors[i]);
				returnArray.push(this.colors[i+1]);
				returnArray.push(this.colors[i+2]);
			}
			
		}

		return returnArray;
	}

	getLength() {
		return this.points.length;
	}
}// End class Vertex
