import * as THREE from './three.module.js';
import { OBJLoader2 } from '../three.js-master/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from '../three.js-master/examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from '../three.js-master/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

//set anime running at the beginning
var isAnime = false;

// sample cube
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
// sample sphere
const sphereGeometry = new THREE.SphereBufferGeometry(0.7, 12, 8);
// sample torus
const torusGeometry = new THREE.TorusBufferGeometry(1, 0.4, 8, 24);

// set canvas and render
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0x194BB0, 1);

// set main camera
const fov = 90;
const aspect = canvas.width / canvas.height;
const near = 1;
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 8);


// set scene
const scene = new THREE.Scene();

// represent current score 
var score = 0;
document.getElementById("score").innerHTML = score;


// make geometry instance and return shape mesh
function makeInstance(geometry, color, position) {
    const material = new THREE.MeshPhongMaterial({ color });
    const shape = new THREE.Mesh(geometry, material);
    shape.position.x = position.x;
    shape.position.y = position.y;
    shape.position.z = position.z;
    shape.castShadow = true;

    return shape;
}

// intial shapes and add the first cube into shape list
// return array shapes
window.shapeFactory = function shapeFactory() {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    var cube = makeInstance(cubeGeometry, randomColor, new THREE.Vector3(0, 0, 3));
    cube.castShadow = true;

    var shapes = [cube];

    scene.add(cube);
    return shapes;
}

// intial shapes
const shapes = shapeFactory();


// add a new 3d geometry object into shapes array with random position, random color,
// and random types including cube, sphere, and torus
// return shapes array
window.addShape = function addShape() {
    var tx = Math.floor(Math.random() * 20 - 10);
    var ty = 0;
    var tz = Math.floor(Math.random() * 20 - 10);

    var position = new THREE.Vector3(tx, ty, tz);

    var type = Math.floor(Math.random() * 3);

    var shape;

    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    if (type === 0) {
        shape = makeInstance(cubeGeometry, randomColor, position);
    }
    else if (type === 1) {
        shape = makeInstance(sphereGeometry, randomColor, position);
    }
    else if (type === 2) {
        shape = makeInstance(torusGeometry, randomColor, position);
    }

    scene.add(shape);
    return shape;
}

// create floor
window.addFloor = function addFloor() {
    const planeSize = 40;
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./grass.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo =
        new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat =
        new THREE.MeshPhongMaterial({
            map: texture, side: THREE.DoubleSide,
        });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    mesh.position.y = -2;
    mesh.receiveShadow = true;
    scene.add(mesh);
}

// load 3D obj file with mtl
window.loadOBJ_files_with_mtl = function loadOBJ_files_with_mtl(obj, mtl, position, scale) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtl, (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        materials.castShadow = true;
        objLoader.addMaterials(materials);
        objLoader.load(obj, (root) => {
            root.position.x = position.x;
            root.position.y = position.y;
            root.position.z = position.z;
            root.castShadow = true;
            root.scale.x = scale.x;
            root.scale.y = scale.y;
            root.scale.z = scale.z;
            root.quaternion.receiveShadow = true;

            //add shadow to obj
            root.traverse(function (child) {
                child.castShadow = true;
            });
            scene.add(root);
        });
    });
}

// read OBJ file and put jpg texture
// if give bump texture, render it. Otherwise ignore it.
window.loadOBJ_files_with_jpg = function loadOBJ_files_with_jpg(obj, jpg, bump, position) {

    var textureLoader = new THREE.TextureLoader();
    // if user does not give bump map, then ignore it.
    if (bump !== '') {
        var bumpSource = textureLoader.load(bump);
    }

    var texture = textureLoader.load(jpg);


    const loader = new OBJLoader2();
    loader.load(obj, function (geometry) {

        var material = new THREE.MeshStandardMaterial();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        material.metalness = 0;
        material.map = texture;
        // if user does not give bump map, then ignore it.
        if (bump !== '') {
            material.bumpMap = bumpSource;
        }

        // add texture and shadow to obj
        geometry.traverse(function (child) {
            child.material = material;
            child.castShadow = true;
        });
        geometry.scale.x = 0.01;
        geometry.scale.y = 0.01;
        geometry.scale.z = 0.01;
        //set position for bench
        geometry.position.x = position.x;
        geometry.position.y = position.y;
        geometry.position.z = position.z;


        scene.add(geometry);
    });
}

// create a point light
window.createPointLight = function createPointLight(color, position, distance, intensity) {
    const pointlight = new THREE.PointLight(color, 1, 100);
    pointlight.position.set(position.x, position.y, position.z);
    pointlight.distance = distance;
    pointlight.intensity = intensity;
    pointlight.castShadow = true;
    scene.add( pointlight );
}


// main funciton
window.main = function main() {
    // use mouse wheel to change fov
    document.addEventListener('mousewheel', (event) => {
        camera.fov += event.deltaY / 80;
        //calculate camera by projection matrix 
        camera.updateProjectionMatrix();
    });

    // load a tree in the scene
    loadOBJ_files_with_mtl('./lowpolytree.obj', './lowpolytree.mtl', new THREE.Vector3(0, 4, -2), new THREE.Vector3(3, 3, 3));
    loadOBJ_files_with_mtl('./lowpolytree.obj', './lowpolytree.mtl', new THREE.Vector3(10, 2, 3), new THREE.Vector3(2, 2, 2));
    loadOBJ_files_with_mtl('./lowpolytree.obj', './lowpolytree.mtl', new THREE.Vector3(-12, 2, -9), new THREE.Vector3(2, 2, 2));
    loadOBJ_files_with_mtl('./lowpolytree.obj', './lowpolytree.mtl', new THREE.Vector3(10, 0, -5), new THREE.Vector3(1, 1, 1));
    loadOBJ_files_with_mtl('./lowpolytree.obj', './lowpolytree.mtl', new THREE.Vector3(-15, 0, 7), new THREE.Vector3(1, 1, 1));

    // load bench wiht bump mapping
    loadOBJ_files_with_jpg('./bench.obj', './Bench_2K_Diffuse.jpg', 'Bench_2K_Bump.jpg', new THREE.Vector3(0, -2, 2));

    // load street lamp 1
    loadOBJ_files_with_mtl('./street lamp.obj', './street lamp.mtl', new THREE.Vector3(-5, -2, 2), new THREE.Vector3(0.3, 0.3, 0.3));
    // create a point light for lamp 1
    createPointLight(0xF0C529, new THREE.Vector3(-3, 3, 2.5), 10, 3);
    // load street lamp 2
    loadOBJ_files_with_mtl('./street lamp.obj', './street lamp.mtl', new THREE.Vector3(5, -2, -5), new THREE.Vector3(0.3, 0.3, 0.3));
        // create a point light for lamp 1
        createPointLight(0xF0C529, new THREE.Vector3(5, 3, -5), 10, 3);

    // render animation
        requestAnimationFrame(render);

    // create a direction light and make it receive shadow
    // represents moon light
    const color = 0xFFFFFF;
    const intensity = 0.3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(2, 5, 3);
    light.castShadow = true;
    light.shadow.camera = new THREE.OrthographicCamera(-50, 50, 50, -50, 0.5, 500);
    scene.add(light);
    renderer.shadowMap.enabled = true;


    // add floor in scene
    addFloor();

    // recat to keyboard event
    utils_func.updateCamera(event);
    
    renderer.render(scene, camera);
}



// update canvas every seoncd
window.render = function render(time) {
    time *= 0.001;  // convert time to seconds

    // check if collision
    if (utils_func.is_collision(camera, shapes[0], 1.5) && shapes[1] === undefined) {
        scene.remove(shapes[0]);
        shapes.pop();
        shapes.push(addShape());
        //update score
        score++;
        document.getElementById("score").innerHTML = score;
    }
    
    // add animation for  all objects in shapes 
    shapes.forEach((cube, ndx) => {
        var speed = 1 + ndx * .1;
        if (isAnime) {
            speed = 1 + ndx * .1;
        }
        else {
            speed = 0;
        }
        
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


// camera movement
window.camera_forward = function camera_forward() {
    camera.translateZ(-0.5);
}
window.camera_backward = function camera_backward() {
    camera.translateZ(+0.5);
}
window.camera_left = function camera_left() {
    camera.translateX(-0.5);
}
window.camera_right = function camera_right() {
    camera.translateX(+0.5);
}
window.camera_turn_left = function camera_turn_left() {
    camera.rotateY(0.1);
}
window.camera_turn_right = function camera_turn_right() {
    camera.rotateY(-0.1);
}


// replace texture on current shape
window.replaceTexture = function replaceTexture(file) {
    const loader = new THREE.TextureLoader();
    loader.load(file, (texture) => {
    const material = new THREE.MeshBasicMaterial({
    map: texture,
    })

    shapes[0].traverse(function (child) {
        child.material = material;
    });
    });
}

// stop/play animation
window.stopOrPlay = function stopOrPlay() {
    isAnime = !isAnime;
}
    

