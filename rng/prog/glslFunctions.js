/**
 * Sends data to an attribute variable using a buffer.
 *
 * @private
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 */
function sendAttributeBufferToGLSL(data, dataCount) {
	let vertexBuffer = gl.createBuffer();
	if(!vertexBuffer) {
		console.log("Vertex buffer failed to create");
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// gl.bufferData(gl.ARRAY_BUFFER, attribName, gl.STATIC_DRAW);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);


	// Getting the bytes per element
	let FSIZE = data.BYTES_PER_ELEMENT;


	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*6, 0);

	gl.enableVertexAttribArray(a_Position);

	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*6, FSIZE*3);

	gl.enableVertexAttribArray(a_Color);
	
	tellGLSLToDrawCurrentBuffer(dataCount);
}

/**
 * Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
 *
 * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
 */
function tellGLSLToDrawCurrentBuffer(dataCount) {
	if(wireFrameFlag) {
		gl.drawArrays(gl.LINE_STRIP, 0, dataCount);
	}
	else {
		gl.drawArrays(gl.TRIANGLES, 0, dataCount);
	}
}

/**
 * Sends a float value to the specified uniform variable within GLSL shaders.
 * Prints an error message if unsuccessful.
 *
 * @param {float} val The float value being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformFloatToGLSL(gl, val, uniformName) {
	// Pass vertex position to attribute variable
    gl.vertexAttrib3f(uniformName, val[0], val[1], val[2]);
}

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformVec4ToGLSL(uniformName, val) {
    gl.uniform4f(uniformName, val[0], val[1], val[2], val[3]);
}

function sendUniformMat4ToGLSL(uniformName, matElements) {
    gl.uniformMatrix4fv(uniformName, false, matElements);
}