const THREE = require('three');
const SIZE = 280;

export default class Butterfly {
  constructor(i, texture) {
    this.uniforms = {
      index: {
        type: 'f',
        value: i
      },
      time: {
        type: 'f',
        value: 0
      },
      size: {
        type: 'f',
        value: SIZE
      },
      texture: {
        type: 't',
        value: texture
      },
      colorH: {
        type: 'f',
        value: Math.random()
      },
    }
    this.obj = this.createObj();
    this.obj.renderOrder = 10;
  }
  createObj() {
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE / 2, 24, 12);
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        // vertexShader: require('./glsl/butterfly.vs').default,
        // fragmentShader: require('./glsl/butterfly.fs').default,
        vertexShader: `attribute vec3 position;
        attribute vec2 uv;
        
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        uniform float index;
        uniform float time;
        uniform float size;
        
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vOpacity;
        
        void main() {
          float flapTime = radians(sin(time * 4.0 - length(position.xy) / size * 2.0 + index * 2.0) * 45.0 + 30.0);
          float hovering = cos(time * 2.0 + index * 3.0) * size / 16.0;
          vec3 updatePosition = vec3(
            cos(flapTime) * position.x,
            position.y + hovering,
            sin(flapTime) * abs(position.x) + hovering
          );
        
          vPosition = position;
          vUv = uv;
          vOpacity = (1.0 - smoothstep(0.75, 1.0, abs((modelMatrix * vec4(updatePosition, 1.0)).z) / 900.0)) * 0.85;
        
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(updatePosition, 1.0);
        }
        `,
        fragmentShader: `precision highp float;

        uniform float time;
        uniform float size;
        uniform sampler2D texture;
        uniform float colorH;
        
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vOpacity;
        
        
        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 mod289(vec4 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 permute(vec4 x) {
            return mod289(((x*34.0)+1.0)*x);
        }

        vec4 taylorInvSqrt(vec4 r)
        {
          return 1.79284291400159 - 0.85373472095314 * r;
        }

        float snoise3(vec3 v){
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

          // First corner
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 =   v - i + dot(i, C.xxx) ;

          // Other corners
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );

          //   x0 = x0 - 0.0 + 0.0 * C.xxx;
          //   x1 = x0 - i1  + 1.0 * C.xxx;
          //   x2 = x0 - i2  + 2.0 * C.xxx;
          //   x3 = x0 - 1.0 + 3.0 * C.xxx;
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
          vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

          // Permutations
          i = mod289(i);
          vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

          // Gradients: 7x7 points over a square, mapped onto an octahedron.
          // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
          float n_ = 0.142857142857; // 1.0/7.0
          vec3  ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );

          //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
          //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);

          //Normalise gradients
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          // Mix final noise value
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                        dot(p2,x2), dot(p3,x3) ) );
        }
        vec3 convertHsvToRgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        
        void main() {



          
          vec4 texColor = texture2D(texture, vUv);
        
          float noise = snoise3(vPosition / vec3(size * 0.25) + vec3(0.0, 0.0, time));
          vec3 hsv = vec3(colorH + noise * 0.2, 0.4, 1.0);
          vec3 rgb = convertHsvToRgb(hsv);
        
          if (texColor.a < 0.5) discard;
        
          gl_FragColor = vec4(rgb, vOpacity) * texColor;
        }`,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    mesh.position.y = SIZE * 0.5 + (Math.random() * 2 - 1) * SIZE * 0.1;
    mesh.rotation.set(-45 * Math.PI / 180, 0, 0);
    return mesh;
  }
  render(renderer, time) {
    this.uniforms.time.value += time;
    this.obj.position.z -= 4;
    if (this.obj.position.z < -900) {
      this.obj.position.x = (Math.random() * 2 - 1) * 280;
      this.obj.position.z = 900;
      this.uniforms.colorH.value = Math.random();
    }
  }
}
