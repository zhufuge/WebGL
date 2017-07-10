const canvas = document.getElementById('canvas-frame')
const width = canvas.clientWidth
const height = canvas.clientHeight

let renderer
let camera
let scene
let light

function initThree() {
  renderer = new THREE.WebGLRenderer({
    antialias: true             // ?
  })

  renderer.setSize(width, height)
  canvas.appendChild(renderer.domElement)
  renderer.setClearColor(0xffffff, 1.0) // ?
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000) // ?
  camera.position.x = 0
  camera.position.y = 1000
  camera.position.z = 0
  camera.up.x = 0
  camera.up.y = 0
  camera.up.z = 1
  camera.lookAt({
    x : 0,
    y : 0,
    z : 0
  })
}

function initScene() {
  scene = new THREE.Scene()
}

function initLight() {
  light = new THREE.DirectionalLight(0xff0000, 1.0, 0)
  light.position.set(100, 100, 200)
  scene.add(light)
}

// function initObject() {
//   const geometry = new THREE.Geometry()
//   const material = new THREE.LineBasicMaterial({ vertexColors: true })

//   geometry.vertices.push(
//     new THREE.Vector3(-100, 0, 100),
//     new THREE.Vector3(100, 0, -100))
//   geometry.colors.push(
//     new THREE.Color(0x00FF00),
//     new THREE.Color(0xFF0000))

//   const line = new THREE.Line(geometry, material, THREE.LineSegments)
//   scene.add(line)
// }

function initObject() {
  const geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3( - 500, 0, 0 ),
    new THREE.Vector3( 500, 0, 0 ))

  const material = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 })

  for (let i = 0; i <= 20; i++) {
    const line1 = new THREE.Line(geometry, material)
    line1.position.z = (i * 50) - 500
    scene.add(line1)

    const line2 = new THREE.Line(geometry, material)
    line2.position.x = (i * 50) - 500;
    line2.rotation.y = 90 * Math.PI / 180;
    scene.add(line2);
  }
}


function threeStart() {
  initThree()
  initCamera()
  initScene()
  initLight()
  initObject()
  renderer.clear()
  renderer.render(scene, camera)
}

document.onload = threeStart()



