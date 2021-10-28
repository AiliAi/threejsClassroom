import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loader = new GLTFLoader;
loader.load('assets/CLASSROOM.glb', function (glb) {
    console.log(glb);
    const root = glb.scene;
    root.scale.set(0.1, 0.1, 0.1);
    scene.add(root);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.log('An error occured');
});

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-10, 2, 5);
scene.add(light);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-10, -2, -5);
scene.add(light2);

/*const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: 'red'
});
const boxMesh = new THREE.Mesh(geometry,material);
scene.add(boxMesh);*/

//Boiler Plate Code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(5, sizes.width / sizes.height, 0.1, 100);
camera.position.set(-10, 2, 2);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); // use if there is no animation loop
controls.minDistance = 1;
controls.maxDistance = 30;
controls.target.set(0, 0.5, - 0.2);
controls.update();

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function render() {
    renderer.render(scene, camera);
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
};

animate();