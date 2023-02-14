import '../../asset/css/style.css'
import * as THREE from 'three'
// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 导入动画库
import gsap from 'gsap'

import particles from '@/asset/textures/particles/2.png'

import * as dat from 'dat.gui'
console.log('Three', THREE)
const PI = Math.PI

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

camera.position.set(0, 0, 30)

// 添加物体
// 纹理加载
const textureLoader = new THREE.TextureLoader()

const sphereGeometry = new THREE.SphereGeometry(3, 30, 30)

const sphereMaterial = new THREE.MeshBasicMaterial({
    color: '#feffef',
    wireframe: true,
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

const pointsTexture = textureLoader.load(particles)

const pointsMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: '#0046ff',
    sizeAttenuation: true,
    map: pointsTexture,
    // 光照透明度
    alphaMap: pointsTexture,
    transparent: true,
    // 不影响后面物体渲染
    depthWrite: false,
    // 叠加方式
    blending: THREE.AdditiveBlending
})




const points = new THREE.Points(
    sphereGeometry,
    pointsMaterial
)


scene.add(points)

// scene.add(sphere)


// 初始化渲染器

const renderer = new THREE.WebGLRenderer()

// 设置渲染尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

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
// const clock = new THREE.Clock()


function render() {
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

// 引入gui
const gui = new dat.GUI()

