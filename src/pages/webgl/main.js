
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// 获取webgl绘制上下文
var gl = canvas.getContext('webgl')
//设置窗口大小
gl.viewport(0, 0, canvas.width, canvas.height)

// 创建顶点着色器
var vertexShader = gl.createShader(gl.VERTEX_SHADER)

gl.shaderSource(vertexShader, `
attribute vec4 a_Position;
void main() {
    gl_Position = a_Position;
} 
`)

gl.compileShader(vertexShader)

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(fragmentShader, `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`
    )

gl.compileShader(fragmentShader)

var program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

gl.linkProgram(program)

var vertexBuffer =  gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

var vertices = new Float32Array([
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5
])

gl.bufferData(gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW )

var a_Position = gl.getAttribLocation(program, 'a_Position')

gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

gl.enableVertexAttribArray(a_Position)


gl.drawArrays(gl.TRIANGLES, 0, 3)

console.log('gl', gl, program)

