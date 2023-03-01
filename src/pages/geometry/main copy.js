import * as THREE from 'three'
// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as dat from 'dat.gui'

// 导入图片
import door from './textures/door/color.jpg'
import alphaDoor from './textures/door/alpha.jpg'
import doorAOTexture from './textures/door/ambientOcclusion.jpg'
// 置换贴图
import heightDoor from './textures/door/height.jpg'
// 粗糙度贴图
import roughness from './textures/door/roughness.jpg'
// 金属贴图
import metalness from './textures/door/metalness.jpg'
// 法线贴图
import normal from './textures/door/normal.jpg'

import px from './textures/environmentMaps/0/px.jpg'
import nx from './textures/environmentMaps/0/nx.jpg'
import py from './textures/environmentMaps/0/py.jpg'
import ny from './textures/environmentMaps/0/ny.jpg'
import pz from './textures/environmentMaps/0/pz.jpg'
import nz from './textures/environmentMaps/0/nz.jpg'


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
const ambientLight = new THREE.AmbientLight('#fff', 0.5)
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


// 设置阴影范围
// directionalLight.shadow.camera.top = 5
// directionalLight.shadow.camera.bottom = -5
// directionalLight.shadow.camera.left = -5
// directionalLight.shadow.camera.right = 5
// directionalLight.shadow.camera.far = 500
// directionalLight.shadow.camera.near = 0.5



scene.add(ambientLight)

// scene.add(mesh)

// 纹理加载器

const loadingManagerDiv = document.querySelector('#loadingManager')
const event = {}
event.onLoad = () => {
    console.log('加载完成') 
}
console.log('loadingManagerDiv', loadingManagerDiv)
event.onProgress = (e, num, total) => {
    loadingManagerDiv && (loadingManagerDiv.innerHTML = '加载进度：' + ((num / total) * 100).toFixed(2) + '%')
}

event.onError = (err) => {
    console.log('加载失败', err) 
}

const LoadingManager = new THREE.LoadingManager(
    event.onLoad, event.onProgress, event.onError
)
// 将图片加载器封装成类
const getLoaderManager = () => {
    const loadingManagerDiv = document.querySelector('#loadingManager')
    const event = {}
    event.onLoad = () => {
        console.log('加载完成') 
    }
    console.log('loadingManagerDiv', loadingManagerDiv)
    event.onProgress = (e, num, total) => {
        // loadingManagerDiv && (loadingManagerDiv.innerHTML = '加载进度：' + ((num / total) * 100).toFixed(2) + '%')
    }

    event.onError = (err) => {
        console.log('加载失败', err) 
    }

    const LoadingManager = new THREE.LoadingManager(
        event.onLoad, event.onProgress, event.onError
    )
    return LoadingManager
}

// 导入纹理
const textureLoader = new THREE.TextureLoader(LoadingManager)

const doorTexture = textureLoader.load(door)

const doorAlpha = textureLoader.load(alphaDoor)

const doorAO = textureLoader.load(doorAOTexture)

const doorHeight = textureLoader.load(heightDoor)

const roughnessTexture = textureLoader.load(roughness)

const metalnessTexture = textureLoader.load(metalness)

const normalTexture = textureLoader.load(normal)

//环境贴图

const cubeTextureLoaderManager = getLoaderManager()

const cubeTextureLoader = new THREE.CubeTextureLoader(cubeTextureLoaderManager)

const streetEnvMap = cubeTextureLoader.load(
    [
        px,
        nx,
        py,
        ny,
        pz,
        nz
    ]
)

// 创建球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)

const sphereMaterial = new THREE.MeshStandardMaterial({
    // metalness: 0.7,
    // roughness: 0.1,
    // envMap: streetEnvMap
})

const sphere = new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
)

sphere.castShadow = true

scene.add(sphere)

// 场景添加背景
// scene.background = streetEnvMap
// // 场景物体添加默认环境贴图
// scene.environment = streetEnvMap

// 设置纹理偏移
// doorTexture.offset.x = 0.5
// 设置旋转中心
// doorTexture.center.set(0.5, 0.5)
// // 设置纹理旋转
// doorTexture.rotation = PI / 4

// 设置是否重复
// doorTexture.repeat.set(2, 2)

// // 设置纹理重复模式
// doorTexture.wrapT = THREE.RepeatWrapping
// // 设置镜像重复
// doorTexture.wrapS = THREE.MirroredRepeatWrapping
// console.log('doorTexture', doorTexture)

// 纹理显示设置
// doorTexture.minFilter = THREE.NearestMipMapNearestFilter
// doorTexture.magFilter = THREE.NearestFilter

const cubeGeometry = new THREE.BoxGeometry(3, 3, 3, 200, 200, 200)

const cubeMaterial = new THREE.MeshStandardMaterial({
    color: '#ff0',
    map: doorTexture,
    alphaMap: doorAlpha,
    transparent: true,
    side: THREE.DoubleSide,
    aoMap: doorAO,
    displacementMap: doorHeight,
    displacementScale: 0.2,
    roughness: 1,
    roughnessMap: roughnessTexture,
    metalness: 1,
    metalnessMap: metalnessTexture,
    normalMap: normalTexture
})

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

console.log('cube', cube, cubeGeometry)
// scene.add(cube)

// 设置平面

const planeGeometry = new THREE.PlaneGeometry(40, 40, 200, 200)
const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide
})

const plane = new THREE.Mesh(
    planeGeometry,
    material
)

plane.receiveShadow = true

// 增加环境光遮蔽，ao贴图，需要设置uv2

cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))

planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))

plane.position.set(0, -1 ,0)
plane.rotation.x = PI / 2

scene.add(plane)
// 聚光灯的目标
directionalLight.angle = PI / 6
directionalLight.target = sphere
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
gui.add(sphere.position, 'x').min(0).max(20).step(0.1).name('移动x')
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
    pointLightBall.position.x = Math.sin(time) * 3
    pointLightBall.position.z = Math.cos(time) * 3
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
// const gui = new dat.GUI()
// 设置位置

// 设置颜色
/* const params = {
    color: '#0046ff',
    fn: () => {
        gsap.to(
            cube.position,
            {
                x: 8,
                duration: 5,
                yoyo: true,
                ease: 'back.out(8)',
                repeat: -1
            }
        )
    }
}
gui.addColor(params, 'color').onChange(
    (value) => {
        console.log('值修改')
        cube.material.color.set(value)
    }
)


gui.add(cube, 'visible')
 */

//  添加文件夹

/* const folder = gui.addFolder('文件夹')

folder.add(cube.material, 'wireframe')

//点击触发事件
folder.add(params, 'fn').name('点击运动') */