<template>
  <div id="butterflyinit">
  </div>
</template>

<script>
import * as THREE from 'three'
import {debounce} from '../../../../packages/utils/butterfly/debounce'
import normalizeVector2 from '../../../../packages/utils/butterfly/normalizeVector2';
import resize from '../../dashboard/admin/components/mixins/resize';
const Butterfly = require('../../../../packages/utils/threejs/demo/butterfly/Butterfly').default;
const Points = require('../../../../packages/utils/threejs/demo/butterfly/Points').default;
const Floor = require('../../../../packages/utils/threejs/demo/butterfly/Floor.js').default;
const PostEffectBright = require('../../../../packages/utils/threejs/demo/butterfly/PostEffectBright.js').default;
const PostEffectBlur = require('../../../../packages/utils/threejs/demo/butterfly/PostEffectBlur.js').default;
const PostEffectBloom = require('../../../../packages/utils/threejs/demo/butterfly/PostEffectBloom.js').default;
// import butterflyinit from '../../../../packages/utils/threejs/demo/butterfly/init'
const resolution = {x: 0, y: 0};
var canvas,initdom,renderer,scene,sceneBack,camera,cameraBack,clock,loader;
var renderBack1,renderBack2,renderBack3;
var vectorTouchStart,vectorTouchMove,vectorTouchEnd;
var isDrag = false;
const BUTTERFLY_NUM = 12;
const PARTICLE_NUM = 60;
const butterflies = [];
var points,floor;
var postEffectBright,postEffectBlurX,postEffectBlurY,postEffectBloom;
export default {
    data(){
        return{

        }
    },
    methods:{
        bfinit(){
            canvas = document.createElement("canvas")
            initdom = document.getElementById('butterflyinit')
            initdom.appendChild(canvas)
            renderer = new THREE.WebGL1Renderer({antialias: false,canvas: canvas,alpha: true});
            renderBack1 = new THREE.WebGLRenderTarget(0, 0);
            renderBack2 = new THREE.WebGLRenderTarget(0, 0);
            renderBack3 = new THREE.WebGLRenderTarget(0, 0);
            scene = new THREE.Scene();
            sceneBack = new THREE.Scene();
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            cameraBack = new THREE.PerspectiveCamera(30, 1, 1, 15000);
            clock = new THREE.Clock();
            loader = new THREE.TextureLoader();
            vectorTouchStart = new THREE.Vector2();
            vectorTouchMove = new THREE.Vector2();
            vectorTouchEnd = new THREE.Vector2();
            points = new Points(BUTTERFLY_NUM * PARTICLE_NUM);
            floor = new Floor(resolution);
            initdom.appendChild(renderer.domElement);
            postEffectBright = new PostEffectBright(renderBack1.texture);
            postEffectBlurX = new PostEffectBlur(renderBack2.texture, 1, 0, 1);
            postEffectBlurY = new PostEffectBlur(renderBack3.texture, 0, 1, 1);
            postEffectBloom = new PostEffectBloom(renderBack1.texture, renderBack2.texture);
        },
        resizeCamera(){
            cameraBack.aspect = resolution.x / resolution.y;
            cameraBack.updateProjectionMatrix();
            floor.resize(resolution);
        },
        resizeWindow(){
            resolution.x = document.body.clientWidth;
            resolution.y = window.innerHeight;
            canvas.width = resolution.x;
            canvas.height = resolution.y;
            this.resizeCamera();
            postEffectBlurX.resize(resolution);
            postEffectBlurY.resize(resolution);
            renderBack1.setSize(resolution.x, resolution.y);
            renderBack2.setSize(resolution.x, resolution.y);
            renderBack3.setSize(resolution.x, resolution.y);
            renderer.setSize(resolution.x, resolution.y);
        },
        render(){
        },
        renderLoop(){
            const time = clock.getDelta();

            // render 3d objects
            for (var i = 0; i < butterflies.length; i++) {
                butterflies[i].render(renderer, time);
            }
            points.render(time);
            floor.render(renderer, scene, sceneBack, camera, time);
            renderer.setRenderTarget(renderBack1);
            renderer.render(sceneBack, cameraBack);

            // render post effects
            postEffectBright.render(renderer, scene, camera, renderBack2);
            postEffectBlurX.render(renderer, scene, camera, renderBack3);
            postEffectBlurY.render(renderer, scene, camera, renderBack2);
            postEffectBloom.render(renderer, scene, camera);
            requestAnimationFrame(this.renderLoop);
        },
        touchStart(){
            isDrag = true;
        },
        touchMove(){
            if (isDrag) {}
        },
        touchEnd(){
            isDrag = false
        },
        mouseOut(){
            console.log('mouseOut')
            isDrag = false
        },
        on(){
            const __THIS = this
            window.addEventListener('resize', __THIS.resizeWindow);
            // canvas.addEventListener('mousedown', function (event) {
            //     event.preventDefault();
            //     vectorTouchStart.set(event.clientX, event.clientY);
            //     normalizeVector2(vectorTouchStart);
            //     __THIS.touchStart(false);
            // });
            // canvas.addEventListener('mousemove', function (event) {
            //     event.preventDefault();
            //     vectorTouchMove.set(event.clientX, event.clientY);
            //     normalizeVector2(vectorTouchMove);
            //     __THIS.touchMove(false);
            // });
            // canvas.addEventListener('mouseup', function (event) {
            //     event.preventDefault();
            //     vectorTouchEnd.set(event.clientX, event.clientY);
            //     normalizeVector2(vectorTouchEnd);
            //     __THIS.touchEnd(false);
            // });
            // canvas.addEventListener('touchstart', function (event) {
            //     event.preventDefault();
            //     vectorTouchStart.set(event.touches[0].clientX, event.touches[0].clientY);
            //     normalizeVector2(vectorTouchStart);
            //     __THIS.touchStart(event.touches[0].clientX, event.touches[0].clientY, true);
            // });
            // canvas.addEventListener('touchmove', function (event) {
            //     event.preventDefault();
            //     vectorTouchMove.set(event.touches[0].clientX, event.touches[0].clientY);
            //     normalizeVector2(vectorTouchMove);
            //     __THIS.touchMove(true);
            // });
            // canvas.addEventListener('touchend', function (event) {
            //     event.preventDefault();
            //     vectorTouchEnd.set(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            //     normalizeVector2(vectorTouchEnd);
            //     __THIS.touchEnd(true);
            // });
            // window.addEventListener('mouseout', function (event) {
            //     event.preventDefault();
            //     vectorTouchEnd.set(0, 0);
            //     __THIS.mouseOut();
            // });  
        },
        init(){
            const lookAtY = 100;
            const __THISS = this
            this.resizeWindow();
            this.on();
            renderer.setClearColor(0x282C34, 1.0);//修改主体色调 
            cameraBack.position.set(400, 500, 800);
            floor.mirrorCamera.position.set(cameraBack.position.x,cameraBack.position.y * -1,cameraBack.position.z);
            cameraBack.lookAt(new THREE.Vector3(0, lookAtY, 0));
            floor.mirrorCamera.lookAt(new THREE.Vector3(0, -lookAtY, 0));
            try {
                loader.load(require('../../../../public/texture/butterfly/tex.png'), (texture) => {
                    texture.magFilter = THREE.NearestFilter;
                    texture.minFilter = THREE.NearestFilter;

                    // add 3d objects
                    for (var i = 0; i < BUTTERFLY_NUM; i++) {
                        butterflies[i] = new Butterfly(i, texture);
                        butterflies[i].obj.position.x = (Math.random() * 2 - 1) * 280;
                        butterflies[i].obj.position.z = 1800 / BUTTERFLY_NUM * i;
                        sceneBack.add(butterflies[i].obj);
                    }
                    points.addButterflies(butterflies);
                    sceneBack.add(points.obj);
                    floor.add(scene, sceneBack);

                    // add post effects
                    scene.add(postEffectBright.obj);
                    scene.add(postEffectBlurX.obj);
                    scene.add(postEffectBlurY.obj);
                    scene.add(postEffectBloom.obj);

                    __THISS.renderLoop();
                },
                (onProgress)=>{

                },
                (error)=>{
                    console.log(error)
                });
            } catch (error) {
                console.log('失败')
            }
        }
    },
    mounted(){
        this.bfinit()
        this.init()
        // const canvas = document.createElement("canvas")
        // const initdom = document.getElementById('butterflyinit')
        // initdom.appendChild(canvas)
        // butterflyinit(canvas)
    }
}
</script>

<style>

</style>