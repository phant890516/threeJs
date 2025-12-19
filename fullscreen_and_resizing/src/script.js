import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Cursor
 */
const cursor = {
    x:0,
    y:0
}
window.addEventListener("mouseover",(event)=>{
    cursor.x = event.clientX / sizes.width -0.5;
    cursor.y = -( event.clientY / sizes.height -0.5 );
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,1000)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

/**
 * Resize
 */
window.addEventListener('resize',()=>{
    //Update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //Update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    //Update renderer
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)) //limit the pixel wheras the device

});

/**
 * Fullscreen mode
 */
window.addEventListener('dblclick',()=>{
    //if not fullscreen
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    }
    else{
        document.exitFullscreen();
    }
});

/**
 * OrbitControls
 */
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)) //limit the pixel wheras the device
/**
 * Animation
 */
const clock = new THREE.Clock()
const tick=()=>{
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    //Render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}

tick();