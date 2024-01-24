// 精度放到最前面

precision mediump float;

varying vec2 vUv;

varying float vElevation;

uniform sampler2D uTexture;

uniform vec3 uHeightColor;

uniform vec3 uLowColor;

varying vec4 vPosition;
varying vec4 vGPosition;

void main() {
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    float opacity = (vElevation + 0.2);
    // gl_FragColor = vec4(vUv, vHeight, 1.0);
    // 根据uv坐标获取纹理颜色
    // vec4 color = texture2D(uTexture, vUv);
    // color.rgb *= height;
    vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 yellowColor = vec4(1.0, 1.0, 0.0, 1.0);
    vec3 color = mix(uLowColor, uHeightColor, vPosition.y);
    gl_FragColor = vec4(color.xyz, 1.0);
}