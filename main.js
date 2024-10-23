import { Scene, PerspectiveCamera, WebGLRenderer, PointLight } from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

import './src/styles/style.scss'

var neo, scene, camera, renderer, container = document.getElementById('three');

init();

function init() {
	scene = new Scene();
	camera = new PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 100);
	renderer = new WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	container.appendChild(renderer.domElement);
	window.addEventListener('resize', function() {
		camera.aspect = container.offsetWidth / container.offsetHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.offsetWidth, container.offsetHeight);
	});
	camera.position.z = 50;
	const pointLight = new PointLight(0xffffff, 2, 0, 0);
	pointLight.position.z = 100;
	scene.add(pointLight);
	const mtlLoader = new MTLLoader();
	mtlLoader.load('assets/neo.mtl', function(mtl) {
		mtl.preload();
		const objLoader = new OBJLoader();
		objLoader.setMaterials(mtl);
		objLoader.load('assets/neo.obj', function(obj) {
			scene.add(obj);
			neo = obj;
			renderer.setAnimationLoop(animate);
		});
	});
}

function animate() {
	neo.rotation.x += 0.01;
	neo.rotation.y -= 0.02;
	renderer.render(scene, camera);
}
