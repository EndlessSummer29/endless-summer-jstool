const THREE = require('three');

export default class PostEffectBloom {
  constructor(texture1, texture2) {
    this.uniforms = {
      texture1: {
        type: 't',
        value: texture1
      },
      texture2: {
        type: 't',
        value: texture2
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
        // fragmentShader: require('./glsl/postEffectBloom.fs').default,
        vertexShader: `attribute vec3 position;
        attribute vec2 uv;
        
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
        `,
        fragmentShader: `precision highp float;

        uniform sampler2D texture1;
        uniform sampler2D texture2;
        
        varying vec2 vUv;
        
        void main() {
          vec4 color1 = texture2D(texture1, vUv);
          vec4 color2 = texture2D(texture2, vUv);
          gl_FragColor = color1 * 0.5 + color2;
        }
        `,
      })
    );
  }
  render(renderer, scene, camera, renderTarget = null) {
    this.obj.visible = true;
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    this.obj.visible = false;
  }
}
