import * as THREE from "three";

import '@/asset/css/style.css'

// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import gsap from "gsap";

// 顶点着色器
import advanceVertexShader from './shader/lantern/vertex.glsl'
import advanceFragmentShader from './shader/lantern/fragment.glsl'

import ca from '@/asset/textures/ca.jpeg'
import hdr from './assets/2k.hdr'
import gltf from './assets/model/flyLight.glb'
import { Mapping } from "three";

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


// 添加物体

const textureLoader = new THREE.TextureLoader()

const caTexture = textureLoader.load(ca)
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync(hdr).then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
})





const planeGeometry = new THREE.PlaneGeometry(10, 10, 300, 300)

// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: advanceVertexShader,
    fragmentShader: advanceFragmentShader,
    side: THREE.DoubleSide,
    // transparent: true,
    uniforms: {
        uTime: { 
            value: 0 
        },
        uTexture: {
            value: caTexture
        }
    }
})

const planeMaterial = new THREE.MeshBasicMaterial({
    color: '#0f0'
})

const plane = new THREE.Mesh(planeGeometry, shaderMaterial)

// scene.add(plane)

const gltfLoader = new GLTFLoader()
let lightBody = null

gltfLoader.load(gltf, (gltf) => {
    console.log('gltfTexture', gltf)
    scene.add(gltf.scene)
    lightBody = gltf.scene.children[0]
    lightBody.material = shaderMaterial

    // 复制物体
    for (let i = 0; i < 100; i++) {
        const clone = gltf.scene.clone()
        clone.position.x = (Math.random() - 0.5) * 300
        clone.position.y = Math.random() * 40 + 10
        clone.position.z = (Math.random() - 0.5) * 300
        gsap.to(clone.rotation, {
            y: Math.PI * 2,
            duration: Math.random() * 10 + 5,
            repeat: true
        })
        gsap.to(clone.position, {
            x: '+=' + Math.random() * 10 ,
            y: '+=' + Math.random() * 20 ,
            duration: Math.random() * 10 + 5,
            yoyo: true,
            repeat: -1
        })
        scene.add(clone)
    }
})


// 纹理加载

// 创建物体

// 初始化渲染器

const renderer = new THREE.WebGLRenderer({
    alpha: true
})

renderer.outpurEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMapping = THREE.LinearToneMapping;
// renderer.toneMapping = THREE.ReinhardToneMapping;
// renderer.toneMapping = THREE.CineonToneMapping;

renderer.toneMappingExposure = 1
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

controls.autoRotate = true
controls.autoRotateSpeed = 1

controls.maxPolarAngle = PI / 2
controls.minPolarAngle = 0

// 添加坐标辅助器, 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)


function render() {
    const time = clock.getElapsedTime()
    shaderMaterial.uniforms.uTime.value = time
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
