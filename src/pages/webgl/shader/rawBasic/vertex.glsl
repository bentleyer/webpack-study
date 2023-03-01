precision mediump float;

attribute vec3 position;

attribute vec2 uv;

uniform mat4 modelMatrix;

uniform mat4 viewMatrix;

uniform mat4 projectionMatrix;

varying vec2 vUv;

varying float vHeight;

uniform float uTime;

uniform sampler2D uTexture;

// 精度范围
// height -2 ^ 14 ~ 2 ^ 14
// mediump -2 ^ 10 ~ 2 ^ 10
// lowp -2 ^ 8 ~ 2 ^ 8

void main() {
    // 打印顶点坐标
    vUv = uv;
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z = modelPosition.z + sin(modelPosition.x + modelPosition.y + uTime);
    vHeight = modelPosition.z;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}