import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI({
    width:300,
    title:'Nice debug UI',
    closeFolders:false
})
//gui hide toggle
gui.hide()
window.addEventListener('keydown',(event)=>{
    if(event.key == 'h')
        gui.show(gui._hidden)
})
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = "#3a6ea6"

const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Gui
 */
const CubeTweaks = gui.addFolder('CubeTweaks')                        //Folder
CubeTweaks.close()
CubeTweaks.add(mesh.position,'y').min(-3).max(3).step(0.1).name('elevation') //y Elevation
CubeTweaks.add(mesh,'visible')                                               //Visible
CubeTweaks.add(material,'wireframe')                                         //Wireframe
CubeTweaks.addColor(debugObject,'color').onChange(()=>{
    material.color.set(debugObject.color)
})                                                                    //Color change
debugObject.spin =()=>{
    gsap.to(mesh.rotation,{y:mesh.rotation.y + Math.PI * 2})
}
CubeTweaks.add(debugObject,'spin')                                           //Animation
debugObject.subdivision = 2 //initialize subdivision
CubeTweaks.add(debugObject,'subdivision').min(1).max(10).step(1).onFinishChange(()=>{
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1,debugObject.subdivision,debugObject.subdivision,debugObject.subdivision)
})                                                                    //Subdivision
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Resize
 */
window.addEventListener("resize",()=>{
    //update size
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight
    //update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    //update renderer
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
/**
 * OrbirControls 
 */
const controls = new OrbitControls(camera,canvas)
controls.enableDumping = true; 

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

/**
 * Animation
 */
const tick =()=>{
    controls.update();
    //Render
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick);
}
tick()