//var camera, scene, renderer,  controls;
var container = document.getElementById('container')
var instructions = document.getElementById('instructions')
var blocker = document.getElementById('blocker')
var mapSize = 2000
var collidableObjects = []
// Flags to determine which direction the player is moving
var moveForward = false
var moveBackward = false
var moveLeft = false
var moveRight = false
var moveUp = false
var moveDown = false
// Velocity vectors for the player and dino
var playerVelocity = new THREE.Vector3()
var PLAYERSPEED = 800.0           // How fast the player moves
var PLAYERCOLLISIONDISTANCE = 20   // How many units away the player can get from the wall
var clock
var light1

function getPointerLock() {
    document.onclick = function () {
        container.requestPointerLock()
    }

    document.addEventListener('pointerlockchange', lockChange, false)
}

// Switch the controls on or off
function lockChange() {
    // Turn on controls
    if (document.pointerLockElement === container) {
        blocker.style.display = "none"
        controls.enabled = true;
        // Turn off the controls
    } else {
        // Display the blocker and instruction
        blocker.style.display = ""
        controls.enabled = false
    }
}

function WellPath() {
    console.log('wellpath')
    getPointerLock()
    InitWp()
}

function InitWp() {
    console.log('init wellpath')
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('#ffffff');
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Render to the container
    container = document.getElementById('container');
    instructions = document.getElementById('instructions');
    blocker = document.getElementById('blocker');
    //document.getElementById("surveydiv").appendChild(renderer.domElement);     
    container.appendChild(renderer.domElement);

    // Set camera position and view details
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
    //makes you 20 units tall
    camera.position.y = 20; // Height the camera will be looking from
    camera.position.x = 0;
    camera.position.z = 0;

    // Add the camera to the controller, then add to the scene
    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());
    controls.enabled = false;//just turn on for now
    //do stuff
   // addLights();

    light1 = createLight(0xffffff, 1, 1000, 2, .1, 3000, 30);

    light1.position.x = 0; light1.position.y = 300; light1.position.z = 0;

    scene.add(light1);
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);


    createGround();
    blocker.style.display = "";
    instructions.innerHTML = "<strong>Click to Start</strong> </br></br> W,A,S,D or arrow keys = move </br>Shift - Up, Z - down<br />Mouse = look around";


    listenForMovement();
    animateWp();
    // Listen for if the window changes sizes
    window.addEventListener('resize', onWindowResize, false);

}

function animateWp() {
    requestAnimationFrame(animateWp);
    //do stuff
    var delta = clock.getDelta();
    animatePlayer(delta);
    renderWp()

}
function renderWp() {
    //do stuff
    renderer.render(scene, camera)

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function addLights() {
    var lightOne = new THREE.DirectionalLight(0xffffff, 1);
    lightOne.castShadow = true;
    lightOne.position.set(1, 1000, 1);
    scene.add(lightOne);
}

function createGround() {
    floorMat = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffaaaa,
        metalness: 0.2,
        bumpScale: 0.0005
    })
    var textureLoader = new THREE.TextureLoader();



    textureLoader.load("textures/ground.jpg", (map) => {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.minFilter = THREE.LinearFilter;
        map.anisotropy = 4;
        map.repeat.set(20, 20);
        floorMat.map = map;
        floorMat.needsUpdate = true;
        console.log('loaded texture')
    })
  var floorGeometry = new THREE.PlaneBufferGeometry(mapSize, mapSize, 1, 1)
    var ground = new THREE.Mesh(floorGeometry, floorMat);
    ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    ground.castShadow = true;
    ground.receiveShadow = true;
    scene.add(ground);
    collidableObjects.push(ground);

}
// Add event listeners for player movement key presses
function listenForMovement() {
    // Listen for when a key is pressed
    // If it's a specified key, mark the direction as true since moving
    var onKeyDown = function (event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 16: //shift
                moveUp = true;
                break;

            case 90://z
                moveDown = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;


        }

    };

    // Listen for when a key is released
    // If it's a specified key, mark the direction as false since no longer moving
    var onKeyUp = function (event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;
            case 16: //shift
                moveUp = false;
                break;

            case 90://z
                moveDown = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };

    // Add event listeners for when movement keys are pressed and released
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
}
// Animate the player camera
function animatePlayer(delta) {
    // Gradual slowdown
    if (detectPlayerCollision() == false) {

        playerVelocity.x -= playerVelocity.x * 10.0 * delta;
        playerVelocity.z -= playerVelocity.z * 10.0 * delta;
        playerVelocity.y -= playerVelocity.y * 10.0 * delta;

        if (moveForward) {
            playerVelocity.z -= PLAYERSPEED * delta;
        }
        if (moveBackward) playerVelocity.z += PLAYERSPEED * delta;
        if (moveLeft) playerVelocity.x -= PLAYERSPEED * delta;
        if (moveRight) playerVelocity.x += PLAYERSPEED * delta;

        if (moveUp) playerVelocity.y += PLAYERSPEED * delta;
        if (moveDown) playerVelocity.y -= PLAYERSPEED * delta;

        controls.getObject().translateX(playerVelocity.x * delta);
        controls.getObject().translateZ(playerVelocity.z * delta);
        controls.getObject().translateY(playerVelocity.y * delta);
    }
    else {
        // Collision or no movement key being pressed. Stop movememnt
        playerVelocity.x = 0;
        playerVelocity.z = 0;
        playerVelocity.y = 0;
    }
}


function createLight(color, intensity, dist, decay, near, far, rad) {

    var pointLight = new THREE.PointLight(color, intensity, dist, decay);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = near;
    pointLight.shadow.camera.far = far;
    pointLight.shadow.bias = 0.01;

    var geometry = new THREE.SphereGeometry(rad, 12, 6);
    var material = new THREE.MeshBasicMaterial({ color: color });
    var sphere = new THREE.Mesh(geometry, material);
    pointLight.add(sphere);
    return pointLight

}

// Converts degrees to radians
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Converts radians to degrees
function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}

//  Determine if the player is colliding with a collidable object
function detectPlayerCollision() {
    // The rotation matrix to apply to our direction vector
    // Undefined by default to indicate ray should coming from front
    var rotationMatrix;
    // Get direction of camera
    var cameraDirection = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();

    // Check which direction we're moving (not looking)
    // Flip matrix to that direction so that we can reposition the ray
    if (moveBackward) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(180));
    }
    else if (moveLeft) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(90));
    }
    else if (moveRight) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(270));
    }

    // Player is moving forward, no rotation matrix needed
    if (rotationMatrix !== undefined) {
        cameraDirection.applyMatrix4(rotationMatrix);
    }

    // Apply ray to player camera
    var rayCaster = new THREE.Raycaster(controls.getObject().position, cameraDirection);

    // If our ray hit a collidable object, return true
    if (rayIntersect(rayCaster, PLAYERCOLLISIONDISTANCE)) {
        return true;
    } else {
        return false;
    }
}

// Takes a ray and sees if it's colliding with anything from the list of collidable objects
// Returns true if certain distance away from object
function rayIntersect(ray, distance) {
    var intersects = ray.intersectObjects(collidableObjects);
    for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].distance < distance) {
            return true;
        }
    }
    return false;
}

