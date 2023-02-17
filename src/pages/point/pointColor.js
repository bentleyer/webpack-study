import '../../asset/css/style.css'
import * as THREE from 'three'
// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 导入动画库
import gsap from 'gsap'

// import particles from '@/asset/textures/particles/diamond2.png'
// import particles2 from '@/asset/textures/particles/snow.png'
import particles from  '@/asset/textures/particles/1.png'

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
const particlesTexture = textureLoader.load(particles)

const params = {
    count: 5000,
    size: 0.2,
    radius: 10,
    branch: 3,
    color: '#ff6030',
    endColor: '#1b3984',
    // 控制弯曲程度
    rotateScale: 0.1
}

const generatorGalaxy = (params) => {
    const {
        count = 100,
        size = 1,
        radius = 5,
        branch = 3,
        color = '#ff6030',
        rotateScale = 1,
        endColor = '#1b3984',
    } = params
    // 生成顶点
    let geometry = null
    let material = null
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    // 设置颜色
    const colors = new Float32Array(count * 3)
    const centerColor = new THREE.Color(color)
    const edgeColor = new THREE.Color(endColor)
    for (let i = 0; i < count; i++) {
        const branchAngle = 2 * PI /  branch  * ( i % branch)
        const r = Math.pow(Math.random(), 3) * radius
        // 距离越远越矮
        // 生成随机数
        const randomX = Math.pow(Math.random() * 2 -1, 3) * ( 1 - r / radius)
        const randomY = Math.pow(Math.random() * 2 -1, 3) * ( 1 - r / radius)
        const randomZ = Math.pow(Math.random() * 2 -1, 3) * ( 1 - r / radius)
        positions[3 * i] = r * Math.sin(branchAngle + r * rotateScale) + randomX
        positions[3 * i + 1] = r * Math.cos(branchAngle + r * rotateScale) + randomY
        positions[3 * i + 2] =  randomZ
        // 混合颜色
        const mixColor = centerColor.clone()
        mixColor.lerp(edgeColor, r / radius)
        colors[3 * i] = mixColor.r
        colors[3 * i + 1] = mixColor.g
        colors[3 * i + 2] = mixColor.b
        // colors[3 * i] = (edgeColor.r - centerColor.r) * r / radius + centerColor.r       
        // colors[3 * i + 1] = (edgeColor.g - centerColor.g) * r / radius + centerColor.g
        // colors[3 * i + 2] = (edgeColor.b - centerColor.b) * r / radius + centerColor.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    material = new THREE.PointsMaterial({
        size,
        // color: new THREE.Color(endColor),
        depthWrite: false,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        map: particlesTexture,
        alphaMap: particlesTexture,
        transparent: true,
        vertexColors: true
    })

    const mesh = new THREE.Points(geometry, material)
    console.log('mesh', mesh)
    scene.add(mesh)
}

generatorGalaxy(params)

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

