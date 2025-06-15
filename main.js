import * as THREE from 'three';
import { createMerkaba } from './merkaba.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('merkabaCanvas'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });
const starVertices = [];
for (let i = 0; i < 1000; i++) {
  starVertices.push((Math.random() - 0.5) * 10);
  starVertices.push((Math.random() - 0.5) * 10);
  starVertices.push((Math.random() - 0.5) * 10);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Merkaba
const merkaba = createMerkaba();
scene.add(merkaba);

// Animation
let pulse = 0;
function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  merkaba.rotation.y += 0.01;
  merkaba.rotation.x += 0.005;
  pulse += 0.05;
  merkaba.children.forEach(line => {
    line.material.color.setHSL(0.6, 1, 0.5 + 0.5 * Math.sin(pulse));
  });
  renderer.render(scene, camera);
}
animate();
