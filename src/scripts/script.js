var THREE = require('three');
require('./_MTLLoader.js')(THREE);
require('./_OBJLoader.js')(THREE);

var neo, scene, camera, renderer, container = document.getElementById('three');

init();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 100);
	renderer = new THREE.WebGLRenderer({
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
	var pointLight = new THREE.PointLight(0xffffff, 1, 0);
	pointLight.position.z = 100;
	scene.add(pointLight);
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load('assets/neo.mtl', function(mtl) {
		mtl.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(mtl);
		objLoader.load('assets/neo.obj', function(obj) {
			scene.add(obj);
			neo = obj;
			animate();
		});
	});
}

function animate() {
	requestAnimationFrame(animate);
	neo.rotation.x += 0.01;
	neo.rotation.y -= 0.02;
	renderer.render(scene, camera);
}
