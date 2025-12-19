import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object create 3 object
 */
const material = new THREE.MeshBasicMaterial()
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5,16,16),material)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1),material)
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,16,32),material)
sphere.position.x = -1.5
torus.position.x = 1.5
scene.add(sphere,plane,torus)

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
    cursor.x = event.clientX/sizes.width -0.5
    cursor.y = -(event.clientY/sizes.height -0.5)
})
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,1000)
camera.position.z = 3
scene.add(camera)

/**
 * Resizes
 */
window.addEventListener('resize',()=>{
    //Update size
    sizes.width =window.innerWidth
    sizes.height = window.innerHeight
    //Update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    //Update renderer
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
/**
 * Animatin
 */
const clock = new THREE.Clock()
const tick =()=>{
    const elapsedTime = clock.getElapsedTime()
    //Update Objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.1 * elapsedTime
    plane.rotation.x = 0.1 * elapsedTime
    torus.rotation.x = 0.1 * elapsedTime

    controls.update();
    //Render
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}
tick();