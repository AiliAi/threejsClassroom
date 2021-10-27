import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loader = new GLTFLoader;
loader.load('assets/CLASSROOM.glb', function(glb) {
    console.log(glb);
    const root = glb.scene;
    root.scale.set(0.1, 0.1, 0.1);
    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + '% loaded');
},function(error){
    console.log('An error occured');
});

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light);

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

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0,1,2);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
renderer.render(scene, camera);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera)
};

animate();