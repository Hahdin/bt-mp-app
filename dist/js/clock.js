if (!Detector.webgl) Detector.addGetWebGLMessage();
//console.log("clock")
var camera, scene, renderer, stats, controls;
//point lights
var p1, p2, p3, p4, p5, p6, prot, pmoon;
var loaded = false;
//text
var textGeometry, textMaterial, txtmesh = -1;
var loader = new THREE.FontLoader();
var TheFont;
//sec ring
var ORmat, g2, t2;
//min ring
var Mmat, buf2, mesh2;
//hour ring
var Hmat, buf3, mesh3;
//milli ring
var milimat, buf4, mesh4;
//mirror
var verticalMirror, groundMirror;
//text
var loader = new THREE.FontLoader();
var mintimer;
var timestr;
var centerOffset = 0;
var ani = true;

function clearAll() {

    ClearRippleTimers();
    clearInterval(drawTimerInterval)
    clearInterval(fadeTimerInterval)
    canvas = null
    ani = false
   // console.log('cleared all')

}

function StartClock() {
    if (document.getElementById("clockdiv").hasChildNodes())
        return
    getTime();
    init();
    animate();

}


function getTime() {
    var d = new Date();
    mintimer = d.getMinutes();
    var hour, min, tm;
    tm = " AM";
    hour = d.getHours(); min = d.getMinutes();

    if (d.getHours() > 12) {
        tm = " PM";
        hour = d.getHours() - 12;
    }

    if (min < 10)
        min = "0" + min;

    timestr = hour + ":" + min + tm;

}



function init() {
    //console.log("init")
    var d = new Date();
    var mirrorsize = 600.1;
    camera = new THREE.PerspectiveCamera(45, (window.innerWidth) / (window.innerHeight), 1, 10000);
    camera.position.set(0, 0, 300);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    var planeGeo = new THREE.PlaneBufferGeometry(mirrorsize, mirrorsize);
    //document.body.removeChild(renderer.domElement);

    // MIRROR planes
    groundMirror = new THREE.Mirror(renderer, camera, { clipBias: 0.003, textureWidth: window.innerWidth, textureHeight: window.innerHeight, color: 0x777777 });
    var mirrorMesh = new THREE.Mesh(planeGeo, groundMirror.material);
    mirrorMesh.add(groundMirror);
    mirrorMesh.rotateX(- Math.PI / 2);
    mirrorMesh.position.y = -mirrorsize / 2;
    scene.add(mirrorMesh);

    verticalMirror = new THREE.Mirror(renderer, camera, { clipBias: 0.003, textureWidth: window.innerWidth, textureHeight: window.innerHeight, color: 0x889999 });

    var verticalMirrorMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(mirrorsize, mirrorsize), verticalMirror.material);

    verticalMirrorMesh.add(verticalMirror);

    verticalMirrorMesh.position.z = -mirrorsize / 2;

    verticalMirrorMesh.position.y = 0;

    scene.add(verticalMirrorMesh);

    //light

    var boxsz = mirrorsize + 10;

    var dist = boxsz / 2 - 30;

    var pbtm = createLight(0xffffff, 5, mirrorsize, 1, 1, 300, 0.1);

    pbtm.position.x = 0; pbtm.position.y = -mirrorsize / 2; pbtm.position.z = -dist;

    scene.add(pbtm);



    p6 = createLight(0xffffff, 5, 400, 1, 1, 300, .1);

    p6.position.x = 0; p6.position.y = 0; p6.position.z = dist;

    scene.add(p6);

    prot = createLight(0xffffff, 3, mirrorsize / 2, 1, 1, 300, 3);

    prot.position.x = 0; prot.position.y = 0; prot.position.z = dist;

    scene.add(prot);



    mesh4 = AddTorusRing(dist / 20, 5, 64, 64, 0xff0000, 100, 0xffffff, buf4, milimat, mesh4);

    t2 = AddTorusRing(dist / 6, 5, 64, 64, 0xff0000, 100, 0xffffff, g2, ORmat, t2);

    mesh2 = AddTorusRing(dist / 3, 5, 64, 64, 0xff0000, 100, 0xffffff, buf2, Mmat, mesh2);

    mesh3 = AddTorusRing(dist / 2, 5, 64, 64, 0xff0000, 100, 0xffffff, buf3, Hmat, mesh3);



    //text

    LoadText(timestr);



    //box the scene

    AddBox(boxsz, 0x777777, 1, 0xffffff);



    //render scene
    render.name = 'renderer'
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // document.body.appendChild(renderer.domElement);
    document.getElementById("clockdiv").appendChild(renderer.domElement);     

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.target.set(0, 10, 0);

    controls.update();

   // stats = new Stats();

   // document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);

}



function LoadText(str) {
    //console.log(location.href)
    loader.load('/js/fonts/optimer_regular.typeface.json', function (font) {
        loaded = true

        textGeometry = new THREE.TextGeometry(str, {

            font: font,

            size: 35,

            height: 20,

            curveSegments: 12,

            bevelThickness: 1,

            bevelSize: 1,

            bevelEnabled: true

        });

        TheFont = font;

        textMaterial = new THREE.MeshPhongMaterial(

            { color: 0x000000, specular: 0xffffff, opacity: 0.3, transparent: true }

        );

        txtmesh = new THREE.Mesh(textGeometry, textMaterial);

        textGeometry.computeBoundingBox();

        centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) + 10;

        txtmesh.position.x = centerOffset;

        txtmesh.position.y = 120;

        txtmesh.position.z = 15;

        txtmesh.castShadow = true;

        txtmesh.receiveShadow = true;

        scene.add(txtmesh);

    });

}



function AddBox(sz, color, shiny, spec) {

    var geometry = new THREE.BoxGeometry(sz, sz, sz);

    var material = new THREE.MeshPhongMaterial({

        color: color,

        shininess: shiny,

        specular: spec,

        side: THREE.BackSide

    })

    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 0;

    mesh.receiveShadow = true;

    scene.add(mesh);

}



function AddTorusRing(radius, tube, radialSegments, tubularSegments, color, shiny, spec, buffer, mat, mesh) {

    buffer = new THREE.TorusBufferGeometry(radius, tube, radialSegments, tubularSegments);

    mat = new THREE.MeshStandardMaterial(

        {
            color: color,

            roughness: 0.0,

            metalness: .7,

            emissive: 0x000000,

            refractionRatio: 0.98,

            shading: THREE.SmoothShading,

            opacity: 0.8,

            transparent: false
        });



    mesh = new THREE.Mesh(buffer, mat);

    mesh.position.set(0, 5, 0);

    mesh.castShadow = true;

    mesh.receiveShadow = true;

    scene.add(mesh);

    return mesh;

}



function animate() {
    if (!ani)
        return;
    //console.log('animate')
    requestAnimationFrame(animate);

    var d = new Date();

    if (mintimer != d.getMinutes()) {

        getTime();

        scene.remove(txtmesh);

        LoadText(timestr);

    }

    render();

}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}



function render() {
    if (loaded == false)
        return
    var time = performance.now() * 0.001;

    var d = new Date();

    var s, m, h;

    s = (d.getSeconds() + d.getMilliseconds() / 1000) / 60 * 100;

    m = (d.getMinutes() + d.getSeconds() / 60 + d.getMilliseconds() / 1000 / 60) / 60 * 100;

    h = (d.getHours() + d.getMinutes() / 60 + (d.getSeconds() / 60) / 60) / 24 * 100;

    t2.material.color.setHex(GetRB(s));

    mesh2.material.color.setHex(GetRB(m));

    mesh3.material.color.setHex(GetRB(h));

    mesh4.material.color.setHex(GetRB(d.getMilliseconds() / 1000 * 100));

    t2.rotation.x = (360 / 100 * s) * Math.PI / 180;

    mesh2.rotation.y = (360 / 100 * (m)) * Math.PI / 180;

    mesh3.rotation.x = (360 - 360 / 100 * (h)) * Math.PI / 180;



    mesh4.rotation.y = (360 - 360 / 100 * (d.getMilliseconds() / 1000 * 100)) * Math.PI / 180;

    var x, y, z;

    x = 150;

    y = 1.1;

    z = 1.3;

    prot.position.x = Math.sin(time) * x;

    prot.position.y = Math.sin(time * y) * x + 15;

    prot.position.z = Math.sin(time * z) * x;

    prot.color.setHex(GetRB(s));

    prot.children[0].material.color.setHex(GetRB(s));

    x = 200;

    y = -1.3;

    z = -1.7;

    txtmesh.position.x = centerOffset + Math.sin(time) * x;

    txtmesh.position.y = Math.sin(time * y) * x + 15;

    txtmesh.position.z = Math.sin(time * z) * x;

    txtmesh.material.color.setHex(GetRB(s));

    groundMirror.renderWithMirror(verticalMirror);

    verticalMirror.renderWithMirror(groundMirror);

    renderer.render(scene, camera);

    //stats.update();

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



function TextLoad(txt, size, height, color, spec) {

    loader.load('fonts/optimer_regular.typeface.json', function (font) {

        textGeometry = new THREE.TextGeometry(txt, {

            font: font,

            size: size,

            height: height,

            curveSegments: 12,

            bevelThickness: 1,

            bevelSize: 1,

            bevelEnabled: true

        });

        textMaterial = new THREE.MeshPhongMaterial(

            { color: color, specular: spec }

        );

        txtmesh = new THREE.Mesh(textGeometry, textMaterial);

        textGeometry.computeBoundingBox();

        var centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) + 10;

        txtmesh.position.x = centerOffset;

        txtmesh.position.y = 0;

        txtmesh.position.z = 15;

        txtmesh.rotation.x = 0;

        txtmesh.rotation.y = Math.PI * 2;

        txtmesh.castShadow = true;

        txtmesh.receiveShadow = true;

        scene.add(txtmesh);

    });

}



function toHex(value) {

    var s = (value).toString(16);

    if (s.length == 1)

        s = "0" + s;

    return s;

}



function GetRB(pcnt) {

    //75,0,130 - indigo

    var str;

    //roygbv//0-20-40-60-80-100

    var i = 16.6666666667

    var inc = i;

    if (pcnt <= inc) {//r-o

        var mod = pcnt;

        var pctchg = mod / i * 100;

        g = Math.round(102 / 100 * pctchg);

        return Number("0x" + "FF" + toHex(g) + "00");

    }

    inc += i;

    if (pcnt <= inc) {//o-y

        var mod = pcnt - (inc - i);

        var pctchg = mod / i * 100;

        g = 102 + Math.round(153 / 100 * pctchg);

        return Number("0x" + "FF" + toHex(g) + "00");

    }

    inc += i;

    if (pcnt <= inc) {//y-g

        var mod = pcnt - (inc - i);

        var pctchg = mod / i * 100;

        r = 255 - Math.round((255 / 100 * pctchg));

        return Number("0x" + toHex(r) + "FF00");

    }

    inc += i;

    if (pcnt <= inc) {//g-b

        var mod = pcnt - (inc - i);

        var pctchg = mod / i * 100;

        g = 255 - Math.round((255 / 100 * pctchg));

        b = Math.round((255 / 100 * pctchg));

        return Number("0x00" + toHex(g) + toHex(b));

    }

    inc += i;

    //0,0,255

    //75,0,130 - indigo

    //255,0,255

    if (pcnt <= inc) {//b-i

        var mod = pcnt - (inc - i);

        var pctchg = mod / i * 100;

        r = Math.round((75 / 100 * pctchg));

        b = 255 - Math.round(((255 - 130) / 100 * pctchg));

        return Number("0x" + toHex(r) + "00" + toHex(b));

    }

    inc += i;

    if (pcnt <= inc) {//i-v

        var mod = pcnt - (inc - i);

        var pctchg = mod / i * 100;

        r = 75 + Math.round(((255 - 75) / 100 * pctchg));

        b = 130 + Math.round(((255 - 130) / 100 * pctchg));

        return Number("0x" + toHex(r) + "00" + toHex(b));

    }

}
