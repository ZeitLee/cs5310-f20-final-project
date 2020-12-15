const utils_func = {
    // update camera positon by key events
    updateCamera: (event) => {
        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            var keyCode = event.which;
            if (keyCode == 87) {
                camera_forward();
            }
            else if (keyCode == 83) {
                camera_backward();
            }
            else if (keyCode == 65) {
                camera_left();
            }
            else if (keyCode == 68) {
                camera_right();
            }
            else if (event.keyCode === 81) {
                camera_turn_left();
            }
            else if (event.keyCode === 69) {
                camera_turn_right();
            }
        }
    },
    // when collision happened, remove old shape and load a new shape
    collision: (camera, shapes, new_shape, scene) => {
        if (utils_func.is_collision(camera, shapes[0], 1)) {
            scene.remove(shapes[0]);
            var new_shape = utils_func.createRandomShape();
            scene.add(new_shape);
            shapes.push(new_shape);
        }
    },
    // check if the given two position less than the given distance
    is_collision: (camera, shape, distance) => {
        let x1 = camera.position.x;
        let y1 = camera.position.y;
        let z1 = camera.position.z;
        let x2 = shape.position.x;
        let y2 = shape.position.y;
        let z2 = shape.position.z;

        let distance_x = Math.abs(x1 - x2)
        let distance_y = Math.abs(y1 - y2)
        let distance_z = Math.abs(z1 - z2)

        return Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2) + Math.pow(distance_z, 2)) <= distance;
    },
}




