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
  renderer.setClearColor(0xffffff, 1.0)

  stats = new Stats()
  document.body.appendChild(stats.domElement)
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
  camera.position.x = 5
  camera.position.y = 5
  camera.position.z = 5
  camera.up.x = 0
  camera.up.y = 1
  camera.up.z = 0
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
  //light = new THREE.DirectionalLight(0xffffff, 1.0)
  light = new THREE.AmbientLight(0xffffff)
  //light = new THREE.PointLight(0xffffff, 1, 10000)
  light.position.set(0, 1000, 0)
  scene.add(light)
}

function initGrid() {
  const gridHelper = new THREE.GridHelper(5, 10)
  scene.add(gridHelper)
}

let mesh
function initObject() {
  //const geometry = new THREE.CubeGeometry(1, 1, 1, 8, 8)
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("./assets/redstone_ore.png")
  })
  mesh = new THREE.Mesh(geometry, material)
  mesh.position = new THREE.Vector3(0, 0, 0)
  scene.add(mesh)
  new TWEEN.Tween(mesh.rotation)
    .to({x: Math.PI * 2, z: Math.PI * 2}, 5000).repeat(Infinity).start()
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
  initGrid()
  initObject()
  animation()
}

document.onload = threeStart()

