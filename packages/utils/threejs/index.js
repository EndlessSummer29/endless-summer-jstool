import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import Stats from 'three/examples/jsm/libs/stats.module.js';


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// 封装过
import C_PerspectiveCamera from "./originalScript/Camera";

// 封装需修改
import { Renderer } from "./originalScript/Renderer-s";
import C_GUI from './originalScript/lilGUI'
export default class Threeinit {
    _Canvas = document.createElement("canvas");
    _Scene = new THREE.Scene();
    _Camera =  new C_PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
    _GLTFLoader = new GLTFLoader();
    _Renderer = null;
    _Controls = null;
    _AnimateID = '';
    _Lights = [];
    // helper
    _Stats = null;
    // data
    nameindex = 0;
    _States = {
        directIntensity:0.8 * Math.PI,
        directColor: 0xFFFFFF,
        ambientIntensity: 0.3,
        ambientColor: 0xFFFFFF,
    };
    /**
     * 
     * @param {Element} dom 注入的元素
     */
    constructor(dom){
        if(!dom){
            throw new ReferenceError('请传入承载canvas的dom')
        }else{
            this._DOM = dom;
            this.init()
        }
    }
    init(){
        this._Canvas.style.width = '100%';
        this._Canvas.style.height = '100%';
        this._Canvas.id = "rendercanvas";
        this._DOM.appendChild(this._Canvas);
        this.PerspectiveCamera_Default()
        this._Scene.add(this._Camera);
        this._Renderer = Renderer({Canvas: this._Canvas,})
        this._Renderer.render(this._Scene,this._Camera);
        this._Renderer.setSize(this._DOM.offsetWidth,this._DOM.offsetHeight);
        this.AmbientLight_Add();
        this.DirectionalLight_Add();
        this._DOM.appendChild(this._Renderer.domElement);
        this._Controls = new OrbitControls(this._Camera, this._Renderer.domElement);
        this._Controls.maxPolarAngle = 1.75; //最大仰角
        this.Animate = this.Animate.bind(this);
        requestAnimationFrame( this.Animate );
        this.Event();
    }
    PerspectiveCamera_Default(){
        this._Camera.name = 'Camera';
        this._Camera.position.set( 0, 5, 10 );
        this._Camera.lookAt( new THREE.Vector3() );
    }
    AmbientLight_Add(){
        let ambientlight = new THREE.AmbientLight(this._States.ambientColor, this._States.ambientIntensity);
        ambientlight.name = 'AmbientLight' + this.nameindex;
        this._Scene.add(ambientlight);
        this._Lights.push(ambientlight);
        this.nameindex++
    }
    DirectionalLight_Add(){
        let directionallight  = new THREE.DirectionalLight(this._States.directColor, this._States.directIntensity);
        directionallight.position.set(0.5, 0, 0.866); // ~60º
        directionallight.name = 'DirectionalLight' + this.nameindex;
        this._Scene.add(directionallight);
        this._Lights.push(directionallight);
        this.nameindex++
    }
    Event(){
        let _This = this
        window.addEventListener("resize", function () {
            let resolution = new THREE.Vector2(document.body.clientWidth, window.innerHeight);
            _This._Camera.resize(resolution);
            _This._Renderer.setSize(_This._DOM.offsetWidth, _This._DOM.offsetHeight);
        });
    }
    Stats_Add(dom){
        this._Stats = new Stats();
        this._Stats.domElement.style.position = 'absolute'; //绝对坐标
        this._Stats.domElement.style.left = '0px';// (0,0)px,左上角
        this._Stats.domElement.style.top = '0px';
        this._Stats.domElement.style.height = '40px';
        dom.appendChild(this._Stats.dom);
    }
    GLTF_Add(model){
        this._GLTFLoader.load(model,(gltf)=>{
            console.log('GLTF',gltf);
            this._ModelObject = gltf.scene || gltf.scenes[0];


            this._Scene.add(gltf.scene || gltf.scenes[0]);
        })
    }
    Animate(time){
        this._AnimateID = requestAnimationFrame(this.Animate);
        this._Controls.update();
        TWEEN.update(time);
        this._Renderer.render(this._Scene, this._Camera);
        if(this._Stats)this._Stats.update();
    }
    Destroy(){
        try {
            clearTimeout();
            window.cancelAnimationFrame(this._AnimateID);
            if(this._ModelObject){
                this._Scene.remove( this._ModelObject );
                this._ModelObject.traverse((node) => {
                    if ( !node.isMesh ) return;
                    node.geometry.dispose();
                });
            }
            this._Scene.clear()
            this._Renderer.dispose()
            this._Renderer.forceContextLoss()
            this._Renderer.content = null
        } catch (e) {
            console.log('销毁错误:',e)
        }
    }
    GUIinit(dom){
        const lil_gui = new C_GUI({ container: dom })
        lil_gui.renderer(this._Renderer)
        lil_gui.control_light(this._States,this._Lights[0])
    }
}