import * as THREE from 'three'
// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as dat from 'dat.gui'
import earthPng from './asset/worldmap.png'
import heightEarth from './asset/height-earth.png'
const gui = new dat.GUI()

// 导入动画库
// import gsap from 'gsap'

// import * as dat from 'dat.gui'
console.log('Three', THREE)
const PI = Math.PI

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

camera.position.set(0, 0, 15)

// 增加光源
//环境光
const ambientLight = new THREE.AmbientLight('#fff', 2)
// 直线光
// const directionalLight = new THREE.DirectionalLight('#fff', 0.5)
// 点光源
const directionalLight = new THREE.PointLight('#f00', 0.5)
directionalLight.castShadow = true
// 设置模糊度
directionalLight.shadow.radius = 20
directionalLight.shadow.mapSize.set(2048, 2048)
// 设置位置


const pointLightBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 10, 10),
    new THREE.MeshBasicMaterial({
        color: '#f00'
    })
) 
pointLightBall.position.set(3, 3, 3)

pointLightBall.add(directionalLight)
scene.add(pointLightBall)



scene.add(ambientLight)

// scene.add(mesh)

// 导入纹理
const textureLoader = new THREE.TextureLoader()

const earthTexture = textureLoader.load(earthPng)
const heightTexture = textureLoader.load(heightEarth)

const sphereGeometry = new THREE.SphereGeometry(5, 200, 200)

const sphereMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    alphaMap: earthTexture,
    displacementMap: heightTexture,
    displacementScale: 0.05,
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(sphere)


// 聚光灯的目标
directionalLight.angle = PI / 6
directionalLight.distance = 0
directionalLight.decay = 0
gui.add(directionalLight, 'distance').min(0).max(20)
gui.add(directionalLight, 'decay').min(0).max(5).step(0.1)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.1)

gui.add(directionalLight.shadow.camera, 'near').min(0).max(20).onChange(
    () => {
        // 更新投影矩阵
        directionalLight.shadow.camera.updateProjectionMatrix()
    }
)
//几何体添加入场景
// scene.add(cube)

// 初始化渲染器

const renderer = new THREE.WebGLRenderer()

// 设置渲染尺寸
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true
// 将webgl渲染的内容添加到body中
document.body.appendChild(renderer.domElement)

// 使用渲染器渲染
renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

// 添加坐标辅助器, 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

// 设置时间
const clock = new THREE.Clock()


function render() {
    const time = clock.getElapsedTime()
    // pointLightBall.position.x = Math.sin(time) * 3
    // pointLightBall.position.z = Math.cos(time) * 3
    controls.update()
    // cube.rotation.x += 0.01
    renderer.render(scene, camera)
    // 下一帧渲染调用
    requestAnimationFrame(render)
}

render()




// 监听画面变化，更新视图
window.addEventListener('resize', () => {
    // 重新计算画面
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新摄像机投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(window.innerWidth , window.innerHeight )
    // 设置像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})
