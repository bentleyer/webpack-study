import '../../asset/css/style.css'
import * as THREE from 'three'
// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 导入动画库
import gsap from 'gsap'

import particles from '@/asset/textures/particles/diamond2.png'
import particles2 from '@/asset/textures/particles/snow.png'

import * as dat from 'dat.gui'
console.log('Three', THREE)
const PI = Math.PI

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 40)

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

function createPoints(url, size = 0.5, count = 500 ) {
    // 设置顶点
    const particlesGeometry = new THREE.BufferGeometry()

    // 设置缓冲区数组

    const position = new Float32Array(count * 3)

    // 设置顶点颜色
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
        position[i] = Math.random() * 30 -15
        colors[i] = Math.random()
    }
    // 设置position属性
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const pointsTexture = textureLoader.load(url)

    const pointsMaterial = new THREE.PointsMaterial({
        size: size,
        // color: '#fff000',
        sizeAttenuation: true,
        map: pointsTexture,
        // 光照透明度
        alphaMap: pointsTexture,
        transparent: true,
        // 不影响后面物体渲染
        depthWrite: false,
        // 叠加方式
        blending: THREE.AdditiveBlending,
        // 启用顶点颜色
        vertexColors: true
    })

    const points = new THREE.Points(
        particlesGeometry,
        pointsMaterial
    )
    return points
}

const points1 = createPoints(particles)

const points2 = createPoints(particles2)

scene.add(points1)
scene.add(points2)

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
const clock = new THREE.Clock()


function render() {
    const time = clock.getElapsedTime()
    controls.update()
    // points1.rotation.x = time * 0.3
    points2.rotation.x = time * 0.15
    points2.rotation.y = time * 0.1
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

