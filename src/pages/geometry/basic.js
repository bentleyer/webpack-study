import * as THREE from 'three'
// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 导入图片
import door from './textures/door/color.jpg'
import alphaDoor from './textures/door/alpha.jpg'
import doorAOTexture from './textures/door/ambientOcclusion.jpg'
// 导入动画库
// import gsap from 'gsap'

// import * as dat from 'dat.gui'
console.log('Three', THREE)
// const PI = Math.PI

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

camera.position.set(0, 0, 15)

// 创建d多个几何体
/* for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(9)
    // 一个三角形三个顶点
    for (let j = 0; j < 9; j++) {
        positionArray[j] = Math.random() * 10 - 5.0
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    let color = new THREE.Color(Math.random(), Math.random(), Math.random())
    const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
} */

// 添加物体
//创建几何体
const geometry = new THREE.BufferGeometry()

const vectors = new Float32Array([
    -1.0, -1.0, 1.0, 
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
])

console.log('geometry', geometry)

geometry.setAttribute('position', new THREE.BufferAttribute(vectors, 3))



const material = new THREE.MeshBasicMaterial({
    color: '#05d'
})

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// 导入纹理
const textureLoader = new THREE.TextureLoader()

const doorTexture = textureLoader.load(door)

const doorAlpha = textureLoader.load(alphaDoor)

const doorAO = textureLoader.load(doorAOTexture)

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

const cubeGeometry = new THREE.BoxGeometry(3, 3, 3)

const cubeMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0',
    map: doorTexture,
    alphaMap: doorAlpha,
    transparent: true,
    side: THREE.DoubleSide,
    aoMap: doorAO
})

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

console.log('cube', cube, cubeGeometry)
scene.add(cube)

const planeGeometry = new THREE.PlaneGeometry(3, 3)

const plane = new THREE.Mesh(
    planeGeometry,
    cubeMaterial
)

// 增加环境光遮蔽，ao贴图，需要设置uv2

cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))

planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))

plane.position.set(5, 0 ,0)

scene.add(plane)

// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)


// 打印

//几何体添加入场景
// scene.add(cube)

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

// 设置动画

/* const animate = gsap.to(cube.position, 
    { 
        x: 5,
        duration: 5,
        ease: 'back.out(8)',
        onComplete(params) {
            console.log('onComplete', params)
        },
        onStart(params) {
            console.log('onStart', params)
        },
        // 设置重复次数
        repeat:3,
        // 倒放，往返运动
        yoyo: true,
        // 延时
        delay: 2,
    }
) */
// gsap.to(cube.rotation, { x: 2 * PI, duration: 5, repeat: -1})


window.addEventListener('dblclick', () => {
    // 双击控制动画
    // if (animate.isActive()) {
    //     animate.pause()
    // } else {
    //     animate.resume()
    // }
    //双击进入全屏
    const fullscreenElement = document.fullscreenElement
     if (!fullscreenElement) {
        renderer.domElement.requestFullscreen()
     } else {
        // 退出全屏
        document.exitFullscreen()
     }
})

function render() {
    // time是d当前运行的时间，毫秒为单位
    // cube.position.x += 0.01
    // if (cube.position.x > 5) {
    //     cube.position.x = 0
    // }
    // let t = time / 1000 % 5
    // cube.position.x = t * 1
    // if (t  > 5) {
    //     cube.position.x = 0
    // }
    // 时钟运行总时长
    // let time = clock.getElapsedTime()
    // 两次调用时间间隔，包括getDelta， getElapsedTime调用
    // let deltaTime = clock.getDelta()
    // console.log('getElapsedTime', deltaTime)
    // cube.position.x = time * 1 % 5


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
/* gui.add(cube.position, 'x').min(0).max(20).step(0.1).name('移动x').onChange(() => {
    console.log('gui')
}).onFinishChange((value) => {
    console.log('onFinishChange', value)
}) */
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