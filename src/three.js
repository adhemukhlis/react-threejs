import * as THREE from 'three';

window.THREE = THREE;
require('three/examples/js/loaders/GLTFLoader');
require('three/examples/js/loaders/RGBELoader');
require('three/examples/js/controls/OrbitControls');
require('three/examples/jsm/utils/RoughnessMipmapper');

export default window.THREE;