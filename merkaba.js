import * as THREE from 'three';

export function createMerkaba() {
  const group = new THREE.Group();
  const material = new THREE.LineBasicMaterial({ color: 0x00ffff });

  const tetrahedron = new THREE.TetrahedronGeometry(1);
  const invertedTetrahedron = new THREE.TetrahedronGeometry(1);
  invertedTetrahedron.rotateX(Math.PI);
  invertedTetrahedron.rotateY(Math.PI / 3);

  [tetrahedron, invertedTetrahedron].forEach(geo => {
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(edges, material.clone());
    group.add(line);
  });

  return group;
}
