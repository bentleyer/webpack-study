// 精度放到最前面

precision mediump float;

varying vec2 vUv;

varying float vHeight;

uniform sampler2D uTexture;

varying vec4 vPosition;
varying vec4 vGPosition;

void main() {
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    float height = (vHeight / 2.0 + 0.5) * 0.5 + 0.5;
    // gl_FragColor = vec4(vUv, vHeight, 1.0);
    // 根据uv坐标获取纹理颜色
    // vec4 color = texture2D(uTexture, vUv);
    // color.rgb *= height;
    vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 yellowColor = vec4(1.0, 1.0, 0.0, 1.0);
    vec4 color = mix(yellowColor, redColor, vGPosition.y / 3.0);
    gl_FragColor = vec4(color.xyz, 1.0);
    if (gl_FrontFacing) {
        // gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        gl_FragColor = vec4(color.xyz - vPosition.y / 100.0 - 0.1, 1.0);
    } else {
        gl_FragColor = vec4(color.xyz, 1.0);
    }
}