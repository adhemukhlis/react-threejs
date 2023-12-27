import React, { Component } from "react";
import THREE from "./three";

class Mask extends Component {
  componentDidMount() {
    let scene, camera, renderer;

    const init = () => {
      // camera = new THREE.PerspectiveCamera(90, window.innerWidth /
      // window.innerHeight, .3, 500);
      camera = new THREE.PerspectiveCamera(
        // 45,
        45,
        window.innerWidth / window.innerHeight,
        0.25,
        20
      );
      camera.position.set(-1.8, 0.6, 2.7);
      // camera.position.set(200, 0.5, 100, 100);

      // camera.rotation.y = 45 / 180 * Math.PI; camera.position.x = 0;
      // camera.position.y = 1; camera.position.z = 2;
      scene = new THREE.Scene();

      new THREE.RGBELoader().load(
        `https://raw.githubusercontent.com/adhemukhlis/react-threejs/main/assets/textures/equirectangular/royal_esplanade_1k.hdr`,
        function (texture) {
          const envMap = pmremGenerator.fromEquirectangular(texture).texture;

          scene.background = envMap;
          scene.environment = envMap;

          texture.dispose();
          pmremGenerator.dispose();

          animate();

          const loader = new THREE.GLTFLoader();
          const url = `https://raw.githubusercontent.com/adhemukhlis/react-threejs/main/assets/models/gltf/Jesko/scene.gltf`;

          loader.load(url, function (gltf) {

						// sizing scale
            let desiredScale = 4; //the length of the palette
            let box = new THREE.Box3();
            box.setFromObject(gltf.scene);
            let size = new THREE.Vector3();
            box.getSize(size);
            let maxSize = 0;
            if (size.x >= size.z && size.x >= size.y) {
              maxSize = size.x;
            } else if (size.y >= size.x && size.y >= size.z) {
              maxSize = size.y;
            } else if (size.z >= size.x && size.z >= size.y) {
              maxSize = size.z;
            }
						gltf.scene.scale.setScalar(1 / (maxSize / desiredScale ))
						// sizing scale
            gltf.scene.traverse(function (child) {
              if (child.isMesh) {
              }
            });

            scene.add(gltf.scene);

            animate();
          });
        }
      );
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight - 4);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.outputEncoding = THREE.sRGBEncoding;
      document
        .getElementById("container_model")
        .appendChild(renderer.domElement);
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      let controls = new THREE.OrbitControls(camera, renderer.domElement);
      // controls.addEventListener('change', renderer);
      controls.addEventListener("change", animate);
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.target.set(0, 0, -0.2);
      controls.update();
      window.addEventListener(
        "resize",
        () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);

          animate();
        },
        false
      );
    };
    let animate = () => {
      renderer.render(scene, camera);
      //   requestAnimationFrame(animate);
    };
    init();
  }

  render() {
    return <div id="container_model" />;
  }
}
export default Mask;
