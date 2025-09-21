import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);


const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z = 2;
const scene = new THREE.Scene()

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
// controls.minDistance = 1;
// controls.maxDistance = 5;

const geometry = new THREE.IcosahedronGeometry(1.0,2);

const mat = new THREE.MeshStandardMaterial({ color: 0xffffff,flatShading:true});
const mesh = new THREE.Mesh(geometry, mat);
scene.add(mesh);

const wiremat = new THREE.MeshBasicMaterial({ color: 0x0000, wireframe: true });
const wire = new THREE.Mesh(geometry, wiremat);
wire.scale.setScalar(1.001);
mesh.add(wire); 

const hemilight = new THREE.HemisphereLight(0x0099ff, 0xf00000);
scene.add(hemilight);


function animate(t) {
  
    requestAnimationFrame(animate);
    mesh.rotation.x = t * 0.0001;
    mesh.rotation.y = t * 0.001;
    // wire.rotation.x = t * 0.0005;
    // wire.rotation.y = t * 0.001;
    // mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);
    renderer.render(scene, camera);
    controls.update();
}
animate();