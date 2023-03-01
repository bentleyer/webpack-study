// 精度放到最前面

precision mediump float;

varying vec2 vUv;

varying float vHeight;

uniform sampler2D uTexture;


void main() {
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    float height = (vHeight / 2.0 + 0.5) * 0.5 + 0.5;
    // gl_FragColor = vec4(vUv, vHeight, 1.0);
    // 根据uv坐标获取纹理颜色
    vec4 color = texture2D(uTexture, vUv);
    color.rgb *= height;
    gl_FragColor = color;
}