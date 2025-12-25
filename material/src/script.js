import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
/**
 * Debug
 */
const gui = new GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Object create 3 object
 */
// // MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture //put texture
// material.color =new THREE.Color(0xff0000) //needs new THREE
// material.wireframe = true // active wireframe
// material.transparent = true // needed while going to use transparency
// material.opacity = 0.5 // need transparenct set
// material.alphaMap = doorAlphaTexture // adopt alpha texture
// material.side = THREE.DoubleSide // double the texture to adopt in both side

// //MeshNormalMaterial //cool Effect simply
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

//MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

//MeshLambertMaterial need Lights
// const material = new THREE.MeshLambertMaterial()

//MeshPhongMaterial need Lights
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

//MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

//MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// gui.add(material,'metalness').min(0).max(1).step(0.0001)
// gui.add(material,'roughness').min(0).max(1).step(0.0001)

//MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.0001)

// //Clearcoat //Glass
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material,'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material,'clearcoatRoughness').min(0).max(1).step(0.0001)

// //Sheen //Fluffy
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)

// gui.add(material,'sheen').min(0).max(1).step(0.0001)
// gui.add(material,'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material,'sheenColor')

// Iridescence //Bubble
// material.iridescence = 1
// material.iridescenceIOR = 0.25
// material.iridescenceThicknessRange = [100,100]

// gui.add(material,'iridescence').min(0).max(1).step(0.0001)
// gui.add(material,'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange,'0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange,'1').min(1).max(1000).step(1)

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material,'transmission').min(0).max(1).step(0.0001)
gui.add(material,'ior').min(1).max(10).step(0.0001)
gui.add(material,'thickness').min(0).max(1).step(0.0001)


const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5,64,64),material)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1,100,100),material)
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,64,128),material)
sphere.position.x = -1.5
torus.position.x = 1.5
scene.add(sphere,plane,torus)



/**
 * Lights 
 */
// const ambientLight = new THREE.AmbientLight(0xffffff,1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff,30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Environments Map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr',(environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

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