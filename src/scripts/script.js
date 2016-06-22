var THREE = require('three');
require('./_MTLLoader.js')(THREE);
require('./_OBJLoader.js')(THREE);

var camera, scene, renderer, container = document.getElementById('three');
