// 精度放到最前面

precision mediump float;

#define PI 3.1415926

varying vec2 vUv;

uniform float uTime;


// 生成随机数
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
        43758.5453123);
}

// 噪声函数
// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

// 旋转函数

/**
* uv: 顶点坐标
* rotation: 旋转角度
* mid: 旋转中心
*/
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    vec2 st = uv - mid;
    float c = cos(rotation);
    float s = sin(rotation);
    mat2 m = mat2(c, -s, s, c);
    return m * st + mid;
}

void main() {
    // gl_FragColor = vec4(vUv, 0.0, 1.0);
    // 利用uv实现渐变

    // 取模实现条纹渐变
    // float intense = mod(vUv.x * 10.0, 1.0);
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 实现斑马条纹
    // float intense = mod(vUv.x * 10.0, 1.0);
    // // step返回0和1
    // intense = step(0.5, intense);
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 实现x,y斑马条纹
    // float intense;
    // float intenseX = mod(vUv.x * 10.0, 1.0);
    // // step返回0和1
    // intenseX = step(0.5, intenseX);
    // float intenseY = mod(vUv.y * 10.0, 1.0);
    // intenseY = step(0.5, intenseY);
    // intense = intenseX + intenseY;
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // T型图
    // float intense;
    // float barY = step(0.8, mod((vUv.x + uTime / 20.0) * 10.0 , 1.0)) * step(0.4, mod(vUv.y * 10.0 , 1.0));
    // float barX = step(0.8, mod(vUv.y * 10.0 , 1.0)) * step(0.4, mod(vUv.x * 10.0 , 1.0));
    // intense = barX + barY;
    // gl_FragColor = vec4(vUv, 1.0, intense);

    // 最大最小值
    // float intense;
    // intense = 1.0 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // step
    // float intense;
    // intense = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // intense = step(0.2, intense);
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // floor
    // float intense;
    // intense = floor(vUv.x * 10.0)/10.0;
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 条纹相乘，得到格子
    // float intense;
    // float intenseX = floor(vUv.x * 10.0) / 10.0;
    // float intenseY = floor(vUv.y * 10.0) / 10.0;
    // intense = intenseX * intenseY;
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 随机效果呢
    // float intense;
    // intense = random(vUv);
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 随机效果呢
    // float intense;
    // float intenseX = floor(vUv.x * 10.0) / 10.0;
    // float intenseY = floor(vUv.y * 10.0) / 10.0;
    // intense = intenseX * intenseY;
    // intense = random(vec2(intense, intense));
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // length,返回向量长度
    // float intense;
    // intense = 1.0 - length(vUv - vec2(0.5, 0.5));
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // distance 计算距离
    // float intense;
    // intense = 1.0 - distance(vUv, vec2(0.5, 0.5));
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 中间光亮。迅速衰减，拉伸，压缩，平移
    // float intense;
    // intense = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0), vec2(0.5, 0.5)) - 1.0;
    // gl_FragColor = vec4(intense, intense, intense, intense);

    // 十字交叉
    // float intense;
    // float intenseX = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5)) - 1.0;
    // float intenseY = 0.15 / distance(vec2((vUv.x - 0.5) * 5.0  + 0.5, vUv.y ), vec2(0.5, 0.5)) - 1.0;
    // intense = intenseX + intenseY;
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 旋转飞镖
    
    // vec2 st = rotate(vUv, -uTime, vec2(0.5, 0.5));
    // float intense;
    // float intenseX = 0.15 / distance(vec2(st.x, (st.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5)) - 1.0;
    // float intenseY = 0.15 / distance(vec2((st.x - 0.5) * 5.0 + 0.5, st.y), vec2(0.5, 0.5)) - 1.0;
    // intense = intenseX + intenseY;
    // gl_FragColor = vec4(intense, intense, intense, 1.0);
    
    // 绘制圆形
    // float intense;
    // intense = distance(vec2(vUv.x, vUv.y), vec2(0.5, 0.5)) + 0.25;
    // intense = step(0.5, intense);
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 绘制圆环
    // float intense;
    // float intense1 = distance(vec2(vUv.x, vUv.y), vec2(0.5, 0.5)) + 0.25;
    // intense1 = step(0.5, intense1);
    // float intense2 = distance(vec2(vUv.x, vUv.y), vec2(0.5, 0.5))  + 0.1;
    // intense2 = 1.0 - step(0.5, intense2);
    // intense = intense1 * intense2;
    // gl_FragColor = vec4(intense, intense, intense, 1.0);

    // 绘制圆环
    // float instense;
    // instense = abs(distance(vec2(vUv.x, vUv.y), vec2(0.5, 0.5)) - 0.25);
    // instense = step(0.1, instense);
    // gl_FragColor = vec4(instense, instense, instense, 1.0);

    // 三角函数
    // 螺旋渐变
    // float opacity = 1.0 - step(0.1, abs(distance(vec2(vUv.x, vUv.y), vec2(0.5, 0.5))));
    // float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    // // float instense = 1.0 - abs(angle - uTime) / 3.1415926;
    // float instense = (angle + PI) / PI;
    // gl_FragColor = vec4(instense, instense, instense, opacity);

    // 雷达扫射
    // vec2 st = rotate(vUv, -uTime * 3.0, vec2(0.5, 0.5));
    // float opacity = 1.0 - step(0.1, abs(distance(vec2(vUv.x, vUv.y), vec2(0.5, 0.5))));
    // float angle = atan(st.y - 0.5, st.x - 0.5);
    // // float instense = 1.0 - abs(angle - uTime) / 3.1415926;
    // float instense = (angle + PI) / PI;
    // gl_FragColor = vec4(instense, instense, instense, opacity);

    // 万花筒
    // float angle = (atan(vUv.y - 0.5, vUv.x - 0.5) + PI)  / (2.0 * PI);
    // // float instense = mod(angle * 10.0, 1.0);
    // float instense = sin(angle * 100.0);
    // gl_FragColor = vec4(instense, instense, instense, 1.0);

    // 噪声
    // float instense = step(0.5, noise(vUv * 50.0));
    // gl_FragColor = vec4(instense, instense, instense, 1.0);

    vec3 blakColor = vec3(1.0, 0.0, 1.0);
    vec3 yellowColor = vec3(1.0, 1.0, 0.0);
    float instense = step(0.5, sin(cnoise(vUv * 10.0) * 20.0));
    vec3 mixColor = mix(blakColor, yellowColor, instense);
    gl_FragColor = vec4(mixColor, 1.0);
    
}