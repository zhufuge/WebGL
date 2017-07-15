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

  scene.add(new THREE.Mesh(
    new THREE.CubeGeometry(5, 5, 5),
    new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    })
  ))

  var loader = new THREE.FontLoader()
  loader.load('./lib/Bavro_Regular.json', function(font) {
    var mesh = new THREE.Mesh(new THREE.TextGeometry('Hello', {
      font: font,
      size: 1,
      height: 0.1
    }), new THREE.MeshBasicMaterial({
      color: 0x00ff00
    }))
    scene.add(mesh)
  })
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
