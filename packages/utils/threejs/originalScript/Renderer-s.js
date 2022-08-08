import { WebGLRenderer , sRGBEncoding,PCFSoftShadowMap,PMREMGenerator} from "three";
export function Renderer(params) {
    var renderer = new WebGLRenderer({
        antialias: true,
        canvas: params.Canvas,
        // alpha: true,
        // logarithmicDepthBuffer: true,
    });
    // renderer.autoClear = false;
    // renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.physicallyCorrectLights = true
    // renderer.setClearColor(0xcccccc);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.toneMapping = THREE.ReinhardToneMapping;
    var pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer
}