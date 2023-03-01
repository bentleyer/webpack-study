import * as THREE from "three";

import '@/asset/css/style.css'

// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as dat from 'dat.gui'

// 顶点着色器
import basicVertexShader from './shader/rawBasic/vertex.glsl'
import basicFragmentShader from './shader/rawBasic/fragment.glsl'

import ca from '@/asset/textures/ca.jpeg'

const PI = Math.PI

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 40)

camera.position.set(0, 0, 30)

// 增加光源
//环境光
const ambientLight = new THREE.AmbientLight('#fff', 0.5)
scene.add(ambientLight)


// 添加物体

const textureLoader = new THREE.TextureLoader()

const caTexture = textureLoader.load(ca)

const planeGeometry = new THREE.PlaneGeometry(10, 10, 100, 100)

// 创建着色器材质
const shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: basicVertexShader,
    fragmentShader: basicFragmentShader,
    side: THREE.DoubleSide,
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

scene.add(plane)


// 纹理加载

// 创建物体

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
