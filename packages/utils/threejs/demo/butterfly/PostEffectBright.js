const THREE = require('three');

export default class PostEffectBright {
  constructor(texture) {
    this.uniforms = {
      minBright: {
        type: 'f',
        value: 0.3,
      },
      texture: {
        type: 't',
        value: texture,
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
        // fragmentShader: require('./glsl/postEffectBright.fs').default,
        vertexShader: `attribute vec3 position;
        attribute vec2 uv;
        
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
        `,
        fragmentShader: `precision highp float;

        uniform float minBright;
        uniform sampler2D texture;
        
        varying vec2 vUv;
        
        void main() {
          vec4 bright = max(vec4(0.0), (texture2D(texture, vUv) - minBright));
          gl_FragColor = bright;
        }
        `,
      })
    );
  }
  render(renderer, scene, camera, renderTarget) {
    this.obj.visible = true;
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    this.obj.visible = false;
  }
}
