import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// GUI
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Objects
// Mesh Basic Material
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('red')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// Mesh Normal Material
// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide
// material.flatShading = true

// Mesh Matcap Material
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// material.side = THREE.DoubleSide

// Mesh Depth Material
// const material = new THREE.MeshDepthMaterial()

// Mesh Lambert Material
// const material = new THREE.MeshLambertMaterial()

// Mesh Phong Material
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 10
// material.specular = new THREE.Color(0x1188ff)

// Mesh Toon Material
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// Mesh Standard Material
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// Lights
const ambientLight = new THREE.AmbientLight('white', 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight('white', 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material)
sphere.position.x = -1.5
torus.position.x = 1.5
scene.add(sphere, plane, torus)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2.5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = -0.15 * elapsedTime
  plane.rotation.x = -0.15 * elapsedTime
  torus.rotation.y = -0.15 * elapsedTime

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
