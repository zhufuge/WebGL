const width = window.innerWidth
const height = window.innerHeight

let renderer
let stats
let camera
let scene
let light

function initThree() {
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  document.body.appendChild(renderer.domElement)
  renderer.setClearColor(0xffffff, 1.0)

  stats = new Stats()
  document.body.appendChild(stats.domElement)
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
  camera.position.set(5, 5, 3)
  camera.up.set(0, 1, 0)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
}

function initScene() {
  scene = new THREE.Scene()
}

function initLight() {
  light = new THREE.AmbientLight(0xffffff)
  scene.add(light)
}

function initGrid() {
  const gridHelper = new THREE.GridHelper(5, 10)
  scene.add(gridHelper)
}

let mesh
function initObject() {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("./assets/redstone_ore.png")
  })
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const Cyc = Math.PI * 2
  new TWEEN.Tween(mesh.rotation)
    .to({x: Cyc, y: Cyc}, 10000).repeat(Infinity).start()

  const lineGeometry = new THREE.Geometry()
  lineGeometry.vertices.push(
    new THREE.Vector3(5, 0, 0),
    new THREE.Vector3(-5, 0, 0)
  )
  const line = new THREE.Line(
    lineGeometry,
    new THREE.LineBasicMaterial({ color: 0x0000ff })
  )

  scene.add(line)
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
