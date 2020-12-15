async function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
      return;
    }

    
  
    // setup GLSL program
    var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-3d", "fragment-shader-3d"]);
  
    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var colorLocation = gl.getAttribLocation(program, "a_color");
  
    // lookup uniforms
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");
  
    // // Create a buffer to put positions in
    // var positionBuffer = gl.createBuffer();
    // // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // // Put geometry data into buffer
    // setLetterF(gl);
  
    // // Create a buffer to put colors in
    // var colorBuffer = gl.createBuffer();
    // // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // // Put color data into buffer
    // setColors(gl);


    const response = await fetch('https://webglfundamentals.org/webgl/resources/models/cube/cube.obj'); 
    const text = await response.text();
    const data = parseOBJ(text);

    const bufferInfo = webglUtils.createBufferInfoFromArrays(gl, data);
  
    function radToDeg(r) {
      return r * 180 / Math.PI;
    }
  
    function degToRad(d) {
      return d * Math.PI / 180;
    }
  
    var cameraAngleRadians = degToRad(0);
    var cameraAngleRadiansX = degToRad(0);
    var cameraAngleTransX = 0
    var cameraAngleTransY = 0
    var cameraAngleTransZ = 0
    var fieldOfViewRadians = degToRad(90);

    var translation = [45, 150, 0];
    var rotation = [degToRad(40), degToRad(25), degToRad(325)];
    var scale = [1, 1, 1];
  
    drawScene();
  
    // Setup a ui.
    
    webglLessonsUI.setupSlider("#cameraAngle", {value: radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: -360, max: 360});
    webglLessonsUI.setupSlider("#cameraAngleX", {value: radToDeg(cameraAngleRadiansX), slide: updateCameraAngleX, min: -360, max: 360});
    webglLessonsUI.setupSlider("#cameraTransX", {value: cameraAngleTransX, slide: updateCameraAngleX, min: -100, max: 100});
    webglLessonsUI.setupSlider("#cameraTransY", {value: cameraAngleTransY, slide: updateCameraTransY, min: -100, max: 100});
    webglLessonsUI.setupSlider("#cameraTransZ", {value: cameraAngleTransZ, slide: updateCameraTransZ, min: -100, max: 100});
    webglLessonsUI.setupSlider("#FOV", {value: radToDeg(fieldOfViewRadians), slide: updateCameraFOV, min: 30, max: 150});
    
    function updateCameraAngle(event, ui) {
      cameraAngleRadians = degToRad(ui.value);
      drawScene();
    }

    function updateCameraAngleX(event, ui) {
        cameraAngleRadiansX = degToRad(ui.value);
        drawScene();
      }
    
    function updateCameraFOV(event, ui) {
        fieldOfViewRadians = degToRad(ui.value);
        drawScene();
    }

    function updateCameraTransX(event, ui) {    
        cameraAngleTransX = ui.value;
        drawScene();
    }

    function updateCameraTransY(event, ui) {
        cameraAngleTransY = ui.value;
        drawScene();
    }

    function updateCameraTransZ(event, ui) {
        cameraAngleTransZ = ui.value;
        drawScene();
    }

    function updateFudgeFactor(event, ui) {
        fudgeFactor = ui.value;
        drawScene();
      }
    
      function updatePosition(index) {
        return function(event, ui) {
          translation[index] = ui.value;
          drawScene();
        };
      }
    
      function updateRotation(index) {
        return function(event, ui) {
          var angleInDegrees = ui.value;
          var angleInRadians = angleInDegrees * Math.PI / 180;
          rotation[index] = angleInRadians;
          drawScene();
        };
      }
    
      function updateScale(index) {
        return function(event, ui) {
          scale[index] = ui.value;
          drawScene();
        };
      }
  
    // Draw the scene.
    function drawScene() {
      webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  
      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
      // Clear the canvas AND the depth buffer.
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
      // Turn on culling. By default backfacing triangles
      // will be culled.
      gl.enable(gl.CULL_FACE);
  
      // Enable the depth buffer
      gl.enable(gl.DEPTH_TEST);
  
      // Tell it to use our program (pair of shaders)
      gl.useProgram(program);
  
      // Turn on the position attribute
      gl.enableVertexAttribArray(positionLocation);
  
      // Bind the position buffer.
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
      // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
      var size = 3;          // 3 components per iteration
      var type = gl.FLOAT;   // the data is 32bit floats
      var normalize = false; // don't normalize the data
      var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
      var offset = 0;        // start at the beginning of the buffer
      gl.vertexAttribPointer(
          positionLocation, size, type, normalize, stride, offset);
  
      // // Turn on the color attribute
      // gl.enableVertexAttribArray(colorLocation);
  
      // // Bind the color buffer.
      // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  
      // // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
      // var size = 3;                 // 3 components per iteration
      // var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
      // var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
      // var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
      // var offset = 0;               // start at the beginning of the buffer
      // gl.vertexAttribPointer(
      //     colorLocation, size, type, normalize, stride, offset);
  
  
      // Compute the projection matrix
      var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      var zNear = 1;
      var zFar = 2000;
      var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);

      const radius = 200;
  
      // Compute a matrix for the camera
      var cameraMatrix;
      cameraMatrix = m4.translation(cameraAngleTransX, cameraAngleTransY, cameraAngleTransZ)
      cameraMatrix = m4.xRotate(cameraMatrix, cameraAngleRadiansX);
      cameraMatrix = m4.yRotate(cameraMatrix, cameraAngleRadians);
      cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5);
  
      // Make a view matrix from the camera matrix
      var viewMatrix = m4.inverse(cameraMatrix);
  
      // Compute a view projection matrix
      var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
      
        // var x = 0
        // var y = 0
  
        // // starting with the view projection matrix
        // // compute a matrix for the F
        // var matrix = m4.translate(viewProjectionMatrix, x, 0, y);
  
        // // Set the matrix.
        // gl.uniformMatrix4fv(matrixLocation, false, matrix);
  
        // //Draw the geometry.

        // var primitiveType = gl.TRIANGLES;
        // var offset = 0;
        // var count = 16 * 6;
        // gl.drawArrays(primitiveType, offset, count);

        const sharedUniforms = {
          u_lightDirection: m4.normalize([-1, 3, 5]),
          u_view: viewMatrix,
          u_projection: projectionMatrix,
        };

        gl.useProgram(program);

        webglUtils.setUniforms(program, sharedUniforms);

        webglUtils.setBuffersAndAttributes(gl, program, bufferInfo);

        webglUtils.setUniforms(program, {
          u_world: m4.yRotation(0),
          u_diffuse: [1, 0.7, 0.5, 1],
        });

        webglUtils.drawBufferInfo(gl, bufferInfo);


    }
  }

  