import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = ()=>{
//     console.log('onStart')
// }
// loadingManager.onLoad = ()=>{
//     console.log('onLoad')
// }
// loadingManager.onProgress = ()=>{
//     console.log('onProgress')
// }
// loadingManager.onError = ()=>{
//     console.log('onError')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace
const ambientTexture = textureLoader.load('/textures/Door_Wood_001_ambientOcclusion.jpg')
const heightTexture = textureLoader.load('/textures/Door_Wood_001_height.jpg')
const metallicTexture = textureLoader.load('/textures/Door_Wood_001_metallic.jpg')
const normalTexture = textureLoader.load('/textures/Door_Wood_001_normal.jpg')
const opacityTexture = textureLoader.load('/textures/Door_Wood_001_opacity.jpg')
const roughnessTexture = textureLoader.load('/textures/Door_Wood_001_roughness.jpg')

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map:colorTexture })
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