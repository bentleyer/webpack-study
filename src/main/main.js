import * as THREE from 'three'

console.log('Three', THREE)

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

camera.position.set(0, 0, 100)

// 添加物体
//创建几何体
const cubeGeometry = new THREE.BoxGeometry(6, 6, 6)

const cubeMaterial = new THREE.MeshBasicMaterial({
    color: '#05d'
})

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

//几何体添加入场景
scene.add(cube)

// 初始化渲染器

const renderer = new THREE.WebGLRenderer()

// 设置渲染尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

console.log('renderer', renderer)
// 将webgl渲染的内容添加到body中
document.body.append(renderer.domElement)

// 使用渲染器渲染
renderer.render(scene, camera)