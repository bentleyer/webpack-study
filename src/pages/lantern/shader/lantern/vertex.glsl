precision mediump float;

varying vec2 vUv;

varying float vHeight;

uniform float uTime;

uniform sampler2D uTexture;

//  相机坐标
varying vec4 vPosition;
// 原始坐标
varying vec4 vGPosition;

// 精度范围
// height -2 ^ 14 ~ 2 ^ 14
// mediump -2 ^ 10 ~ 2 ^ 10
// lowp -2 ^ 8 ~ 2 ^ 8

void main() {
    // 打印顶点坐标
    vUv = uv;
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // modelPosition.y = modelPosition.y + uTime * 10.0;
    vHeight = modelPosition.z;
    vPosition = modelPosition;
    vGPosition = vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}