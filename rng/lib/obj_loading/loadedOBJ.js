/**
 * Specifies the geometry contained within an OBJ file. A subclass of Geometry.
 * NOTE: The geometry is transformed to display correctly using its modelMatrix.
 *
 * @author Alfredo Rivero
 * @this {LoadedOBJ}
 */
class LoadedOBJ extends Geometry {
  /**
   * Constructor for LoadedOBJ
   *
   * @constructor
   * @param {String} objStr An OBJ file in string form
   * @returns {LoadedOBJ} Constructed LoadedOBJ
   */
  constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, objStr) {
    super();
	super.shape = "obj";
	super.centerPoint = {x: centerX, y: centerY};
	super.color = {r: rVal, g: gVal, b: bVal};
	super.size = sizeVal;
	super.vertices = [];

	this.centerX = centerX;
	this.centerY = centerY;

	this.modelMatrix = new Matrix4();

	this.flattenedArray = [];

	// Translation directions
	this.currentAngle = 1;

    // Construct the Mesh object containg the OBJ file's information
    var objMesh = new OBJ.Mesh(objStr);

    this.verticesVertices = objMesh.vertices;

    // console.log(this.verticesVertices);

    // // Construct the necessary amount of vertex objects within this.vertices
    // for (var i = 0; i < objMesh.indices.length; i++) {
    //   this.vertices[i] = new Vertex();
    // }

    // // Add the vertex points, normals, and uv coordinates in OBJ
    // var transAndScaleVal = this.addVertexPoints(objMesh.indices, objMesh.vertices);
    // this.addVertexNormals(objMesh.indices, objMesh.vertexNormals);
    // this.addVertexTextureCoordinates(objMesh.indices, objMesh.textures);

    // // Modify loadedOBJ's modelMatrix to present OBJ correctly
    // this.moveOBJToCenterOfScreen(transAndScaleVal[0]);
    // this.scaleOBJToFitOnScreen(transAndScaleVal[1]);
  }

  /**
   * Adds the point information to the vertices of LoadedOBJ. Also keeps
   * track of the largest x-y-z coordinate absolute value and the center of
   * the LoadedOBJ. Does so for displaying geometry correctly. Uses indices to
   * put points in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ
   * @param {Array} points The points being added
   * @returns {Array} centerPoint at index 0, necessary scale at index 1
   */
  addVertexPoints(indices, points) {
    var vertexHasNotBeenEncountered = new Array(points.length / 3);
    vertexHasNotBeenEncountered.fill(true);

    var largestCoordinateValue = 1.0;
    var centerPoint = [0.0, 0.0, 0.0];

    for (var i = 0; i < indices.length; i++) {
      var index = indices[i];
      var xyz = [points[index * 3], points[index * 3 + 1], points[index * 3 + 2]];

      if (vertexHasNotBeenEncountered[index]) {
        // Compare xyz to largestCoordinateValue
        for (var j = 0; j < 3; j++) {
          if (Math.abs(xyz[j]) > largestCoordinateValue) {
            largestCoordinateValue = Math.abs(xyz[j]);
          }
        }

        // Continue computing the centerPoint of LoadedOBJ
        centerPoint[0] += xyz[0];
        centerPoint[1] += xyz[1];
        centerPoint[2] += xyz[2];

        vertexHasNotBeenEncountered[index] = false;
      }

      this.vertices[i].points = new Vector3(xyz);
    }

    centerPoint[0] /= -(points.length / 3);
    centerPoint[1] /= -(points.length / 3);
    centerPoint[2] /= -(points.length / 3);

    return [centerPoint, 1 / largestCoordinateValue];
  }

  /**
   * Adds the normals information to LoadedOBJ's vertices. Uses indices to
   * add normals in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ
   * @param {Array} normals The normals being added
   */
  addVertexNormals(indices, normals) {
    // If normals information is invalid, set all normals to just null
    if (this.isInvalidParameter(normals)) {
      for (var i = 0; i < indices.length; i++) {
        this.vertices[i].normal = null;
      }
    }
    else {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var xyz = [normals[index * 3], normals[index * 3 + 1], normals[index * 3 + 2]];

        this.vertices[i].normal = new Vector3(xyz);
      }
    }
  }

  /**
   * Adds the texture information to LoadedOBJ's vertices. Uses indices to
   * add texture coordinates in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ's vertices
   * @param {Array} textures The textures being added
   */
  addVertexTextureCoordinates(indices, textures) {
    // If textures information is invalid, set vertex.uv to null for all vertices.
    if (this.isInvalidParameter(textures)) {
      for (var i = 0; i < indices.length; i++) {
        this.vertices[i].uv = null;
      }
    }
    else {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var uv = [textures[index * 2], textures[index * 2 + 1]];

        this.vertices[i].uv = uv;
      }
    }
  }

  /**
   * Determines if a parameter (points, normals, textures) is invalid.
   *
   * @private
   */
  isInvalidParameter(parameter) {
    if (parameter == null) {
      return true;
    }
    if (parameter == []) {
      return true;
    }
    if (isNaN(parameter[0])) {  // Can be array of just NaN
      return true;
    }

    return false;
  }

  /**
   * Modifes the LoadedOBJ's modelMatrix to move the LoadedOBJ to the
   * center of the canvas.
   *
   * @private
   * @param {Array} transValue An array containing translation value for x, y, z
   * axis (indices: 0, 1, 2)
   */
  moveOBJToCenterOfScreen(transValue) {
    this.modelMatrix.setTranslate(transValue[0], transValue[1], transValue[2]);
  }

  /**
   * Modifies the LoadedOBJ's modelMatrix to scale the LoadedOBJ to fit
   * within the canvas. Assumes moveOBJToCenterOfScreen() has been called
   * beforehand and modelMatrix is defined.
   *
   * @private
   * @param {Number} scaleValue Amount LoadedOBJ will be scaled by
   */
  scaleOBJToFitOnScreen(scaleValue) {
    var scaleMatrix = new Matrix4();
    scaleMatrix.setScale(scaleValue, scaleValue, scaleValue);
    this.modelMatrix = scaleMatrix.multiply(this.modelMatrix);
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

  	let renderVertices = new Float32Array(this.verticesVertices);
  	let n = this.verticesVertices.length / 3;

  	sendUniformMat4ToGLSL(u_ModelMatrix, this.modelMatrix.elements);

  	// Render Vertices = Float32Array.
  	sendAttributeBufferToGLSL(renderVertices, n);
  }

}
