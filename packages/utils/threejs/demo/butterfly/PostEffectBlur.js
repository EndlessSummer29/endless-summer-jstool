const THREE = require('three');

export default class PostEffectBlur {
  constructor(texture, x, y, radius) {
    this.uniforms = {
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(),
      },
      direction: {
        type: 'v2',
        value: new THREE.Vector2(x, y)
      },
      radius: {
        type: 'f',
        value: radius
      },
      texture: {
        type: 't',
        value: texture
      }
    };
    this.obj = this.createObj();
    this.obj.visible = false;
  }
  createObj() {
    return new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        // vertexShader: require('./glsl/postEffect.vs').default,
        // fragmentShader: require('./glsl/postEffectBlur.fs').default,
        vertexShader: `attribute vec3 position;
        attribute vec2 uv;
        
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
        `,
        fragmentShader: `precision highp float;

        uniform vec2 resolution;
        uniform vec2 direction;
        uniform float radius;
        uniform sampler2D texture;
        
        varying vec2 vUv;
        
        vec4 gaussianBlur(sampler2D texture, vec2 uv, float radius, vec2 resolution, vec2 direction) {
          vec4 color = vec4(0.0);
          vec2 step = radius / resolution * direction;
          color += texture2D(texture, uv - 4.0 * step) * 0.02699548325659403;
          color += texture2D(texture, uv - 3.0 * step) * 0.06475879783294587;
          color += texture2D(texture, uv - 2.0 * step) * 0.12098536225957168;
          color += texture2D(texture, uv - 1.0 * step) * 0.17603266338214976;
          color += texture2D(texture, uv) * 0.19947114020071635;
          color += texture2D(texture, uv + 1.0 * step) * 0.17603266338214976;
          color += texture2D(texture, uv + 2.0 * step) * 0.12098536225957168;
          color += texture2D(texture, uv + 3.0 * step) * 0.06475879783294587;
          color += texture2D(texture, uv + 4.0 * step) * 0.02699548325659403;
          return color;
        }
        
        void main() {
          vec4 color = gaussianBlur(texture, vUv, radius, resolution, direction);
          gl_FragColor = color;
        }
        `,
      })
    );
  }
  resize(resolution) {
    this.uniforms.resolution.value.set(resolution.x, resolution.y);
  }
  render(renderer, scene, camera, renderTarget = null) {
    this.obj.visible = true;
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    this.obj.visible = false;
  }
}
