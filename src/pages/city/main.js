import * as THREE from "three";

import '@/asset/css/style.css'

// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import gsap from "gsap";

// 顶点着色器
import advanceVertexShader from './shader/smoke/vertex.glsl'
import advanceFragmentShader from './shader/smoke/fragment.glsl'

//导入模型
import hdr from './assets/050.hdr'
import gltf from './assets/model/yugang.glb'

import ca from '@/asset/textures/ca.jpeg'

// 导入water
import { Water } from 'three/examples/jsm/objects/Water2'

const gui = new dat.GUI()
const PI = Math.PI

// 创建场景
const scene = new THREE.Scene()
// 设置时间
const clock = new THREE.Clock()


// 创建相机
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000)

camera.position.set(0, 0, 30)

// 增加光源
//环境光
// const ambientLight = new THREE.AmbientLight('#fff', 1)
// scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight('#fff', 0,5)
scene.add(directionalLight)

// 导入hdr
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync(hdr).then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
})


// 导入模型
const gltfLoader = new GLTFLoader()
gltfLoader.loadAsync(gltf).then((gltf) => {
    // gltf.scene.scale.set(0.1, 0.1, 0.1)
    console.log('gltf', gltf)
    const yugang = gltf.scene.children[0]
    yugang.material.side = THREE.DoubleSide
    const planeGeometry = gltf.scene.children[1].geometry
    scene.add(yugang)
    
    const water = new Water(planeGeometry, {
        color: '#fff',
        scale: 1,
        flowDirection: new THREE.Vector2(1, 1),
        textureHeight: 1024,
        textureWidth: 1024,
    })
    scene.add(water)
})

// 添加物体

const textureLoader = new THREE.TextureLoader()

const caTexture = textureLoader.load(ca)





const planeGeometry = new THREE.PlaneGeometry(10, 10, 300, 300)

// const water = new Water(planeGeometry, {
//     color: '#fff',
//     scale: 1,
//     flowDirection: new THREE.Vector2(1, 1),
//     textureHeight: 1024,
//     textureWidth: 1024,
// })


// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
    
})



const planeMaterial = new THREE.MeshBasicMaterial({
    color: '#0f0',
    side: THREE.DoubleSide,
})

const plane = new THREE.Mesh(planeGeometry, planeMaterial)

// water.rotation.x = - PI / 2

// scene.add(water)

// 纹理加载

// 创建物体

// 初始化渲染器

const renderer = new THREE.WebGLRenderer({
    // alpha: true
})

renderer.outpurEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMapping = THREE.LinearToneMapping;
// renderer.toneMapping = THREE.ReinhardToneMapping;
// renderer.toneMapping = THREE.CineonToneMapping;

renderer.toneMappingExposure = 0.7
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

// controls.autoRotate = true
// controls.autoRotateSpeed = 1

// controls.maxPolarAngle = PI / 2
// controls.minPolarAngle = 0

// 添加坐标辅助器, 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)


function render() {
    const time = clock.getElapsedTime()
    // shaderMaterial.uniforms.uTime.value = time
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
