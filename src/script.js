import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//debug
const gui = new dat.GUI()


//texture

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture=textureLoader.load('/textures/matcaps/1.png')
const gradientTexture=textureLoader.load('/textures/gradients/3.jpg')
const doorAlphaTexture=textureLoader.load('/textures/door/alpha.jpg')
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()




//Object 

// const material = new THREE.MeshBasicMaterial()
// material.map=gradientTexture
// material.color=new THREE.Color(0xff00ff)
// material.side=THREE.DoubleSide

// const material = new THREE.MeshMatcapMaterial()
// material.matcap=matcapTexture


// material.map=doorColorTexture
// material.aoMap=doorAmbientOcclusionTexture
// material.aoMapIntensity=1 
// material.displacementMap=doorHeightTexture
// material.displacementScale=0.05
// material.metalnessMap=doorMetalnessTexture
// material.roughnessMap=doorRoughTexture
// material.normalMap=doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent=true
// material.alphaMap=doorAlphaTexture

// material.metalness = 0.45
// material.roughness = 0.65


const material=new THREE.MeshStandardMaterial()
material.metalness=0.7
material.roughness=0.2


gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.0001)
gui.add(material,'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material,'displacementScale').min(0).max(1).step(0.0001)


const sphere=new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x=-1.5
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2))

scene.add(sphere)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 1, 1,100,100 ),
    material
)
plane.position.x=1.5
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))
scene.add(plane)


const torus=new THREE.Mesh(
    new THREE.TorusGeometry( 0.3, 0.2, 64, 128),
    material
)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2))

scene.add(torus)

//lights
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.position.x=2
pointLight.position.y=3
pointLight.position.z=4
scene.add(pointLight)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update Objects
    torus.rotation.x=elapsedTime*2
    // plane.rotation.x=elapsedTime*2
    // plane.rotation.y=elapsedTime*2
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()