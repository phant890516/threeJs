import * as THREE from "three"

//set Canvas
const canvas = document.querySelector('canvas.webgl');

//build Scene
const scene = new THREE.Scene();

//build Mesh
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0xff0000});
const mesh = new THREE.Mesh(geometry,material);
// mesh.position.x = 1;
// mesh.position.y = -1;
// mesh.position.z = 1;
mesh.position.set(1,-1,1);
scene.add(mesh);
//set Scale
mesh.scale.set(1,2,1);
// set Rotation
mesh.rotation.reorder('ZYX'); //change the priority of XYZ
mesh.rotation.y = Math.PI * 0.25;
mesh.rotation.z = Math.PI * 0.5;

//build Group
const group = new THREE.Group();
scene.add(group);
//cube1
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xff0000})
)
group.add(cube1);
//cube2
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x00ff00})
)
cube2.position.x = -2;
group.add(cube2);
//cube3
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x0000ff})
)
cube3.position.x=2;
group.add(cube3);
// Set group
group.scale.y = 2;

//add Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
//set Size
const sizes = {
    width:800,
    height:600 //makes it variable
}

//set Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 5;
scene.add(camera);

// camera Focus
// camera.lookAt(mesh.position);

//set Renderer
const renderer = new THREE.WebGLRenderer({
    canvas:canvas //where to render
})
renderer.setSize(sizes.width, sizes.height); //size setting
renderer.render(scene,camera);



