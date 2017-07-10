const canvas = document.getElementById('canvas-frame')
const width = canvas.clientWidth
const height = canvas.clientHeight

let renderer
let stats
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

  stats = new Stats()
  document.body.appendChild(stats.domElement)
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


function initObject() {
  const geometry = new THREE.Geometry()
  const material = new THREE.LineBasicMaterial({ vertexColors: true })

  geometry.vertices.push(
    new THREE.Vector3(-100, 0, 100),
    new THREE.Vector3(100, 0, -100))
  geometry.colors.push(
    new THREE.Color(0x00FF00),
    new THREE.Color(0xFF0000))

  line = new THREE.Line(geometry, material, THREE.LineSegments)
  scene.add(line)

  new TWEEN.Tween(line.rotation).to({y: Math.PI}, 1000).repeat(Infinity).start()
}

function animation() {
  renderer.render(scene, camera)
  requestAnimationFrame(animation)

  stats.update()
  TWEEN.update()
}

function threeStart() {
  initThree()
  initCamera()
  initScene()
  initLight()
  initObject()
  animation()
}

document.onload = threeStart()
